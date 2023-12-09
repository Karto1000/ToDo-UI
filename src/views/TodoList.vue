<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

type Todo = {
  taskId: number
  title: string
  description: string
  completed: boolean
}

const todos = ref<Array<Todo>>([])
const editingTodo = ref<Todo | null>(null)
const modalObject = ref<Modal | null>(null)
const modalRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  const result = await fetch('http://localhost:8080/get/pending')
  todos.value = await result.json()
})

const onChecked = async (todo: Todo) => {
  const response = await fetch(`http://localhost:8080/check/${todo.taskId}`, {
    method: 'PUT'
  })

  todos.value = await response.json()
}

const onEdit = (todo: Todo) => {
  if (!modalRef.value) return

  const modal: Modal = new Modal(modalRef.value)
  modalObject.value = modal

  editingTodo.value = todo
  modal.show()
}

const onModalClose = (e: Event) => {
  e.preventDefault()

  if (!modalObject.value) return

  modalObject.value.hide()
  modalObject.value = null
}

const onModalSave = async (e: Event) => {
  e.preventDefault()

  if (!modalObject.value) return

  const data = new FormData(e.target as HTMLFormElement)

  const body: { [index: string]: String | number | boolean } = {}
  data.forEach((v, k) => body[k] = <String>v)

  if (editingTodo.value != null) {
    body.taskId = editingTodo.value.taskId
    body.completed = editingTodo.value.completed
  }

  const response = await fetch('http://localhost:8080/update', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  todos.value = await response.json()

  modalObject.value.hide()
  modalObject.value = null
}

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const data = new FormData(e.target as HTMLFormElement)

  const body: { [index: string]: String } = {}
  data.forEach((v, k) => body[k] = <String>v)

  const response = await fetch('http://localhost:8080/add', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  todos.value = await response.json()
}

</script>

<template>
  <div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="edit-modal-label"
       aria-hidden="true" ref="modalRef">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit-modal-label">Edit Todo "{{ editingTodo?.title }}"</h5>
        </div>
        <div class="modal-body">
          <form id="editing-form" @submit="onModalSave">
            <div class="mb-3">
              <label for="input-title" class="form-label">Title</label>
              <input type="text" name="title" class="form-control" id="input-title" aria-describedby="emailHelp"
                     :value="editingTodo?.title" />
            </div>
            <div class="mb-3">
              <label for="input-description" class="form-label">Description</label>
              <textarea class="form-control" name="description" id="input-description" rows="3"
                        :value="editingTodo?.description"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onModalClose">Close</button>
          <button type="submit" form="editing-form" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <h1>ToDo's</h1>
  <hr />
  <form @submit="onSubmit">
    <div class="mb-3">
      <label for="input-title" class="form-label">Title</label>
      <input type="text" name="title" class="form-control" id="input-title" aria-describedby="emailHelp" />
    </div>
    <div class="mb-3">
      <label for="input-description" class="form-label">Description</label>
      <textarea class="form-control" name="description" id="input-description" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <hr />
  <div class="d-flex flex-column gap-3">
    <div v-for="todo in todos" :key="todo.taskId">
      <TodoItem :todo="todo" :on-checked="onChecked" :on-edit="onEdit" />
    </div>
  </div>
</template>

<style scoped></style>

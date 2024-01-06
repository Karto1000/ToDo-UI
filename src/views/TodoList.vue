<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import Navigation from '@/components/Navigation.vue'
import { addTodo, checkTodoById, getPendingTodos, type Todo, updateTodo } from '@/lib/todo'
import { useToast } from 'vue-toast-notification'

const todos = ref<Array<Todo>>([])
const editingTodo = ref<Todo | null>(null)
const modalObject = ref<Modal | null>(null)
const modalRef = ref<HTMLElement | null>(null)
const $toast = useToast()

onMounted(async () => {
  try {
    todos.value = await getPendingTodos()
  } catch (e) {
    $toast.info('Failed to load Todos')
    return
  }
})

const onChecked = async (todo: Todo) => {
  if (!todo.taskId) return

  try {
    todos.value = await checkTodoById(todo.taskId.toString())
  } catch (e) {
    $toast.error((<Error>e).message)
  }
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

  const entries: string[] = []
  data.forEach((v) => entries.push(v.toString()))

  // Any Entry is not truthy
  if (entries.some(e => !e)) {
    $toast.info('Invalid Todo')
    return
  }
  const todo: Todo = {
    title: <string>data.get('title'),
    description: <string>data.get('description'),
    completed: false
  }

  if (editingTodo.value != null) {
    todo.taskId = editingTodo.value.taskId
    todo.completed = editingTodo.value.completed
  }

  try {
    todos.value = await updateTodo(todo)
  } catch (e) {
    $toast.error((<Error>e).message)
    return
  }

  modalObject.value.hide()
  modalObject.value = null
}

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const data = new FormData(e.target as HTMLFormElement)

  const entries: string[] = []
  data.forEach((v) => entries.push(<string>v))

  // Any Entry is not truthy
  if (entries.some(e => !e)) {
    $toast.info('Invalid Todo')
    return
  }

  const todo = {
    title: <string>data.get('title'),
    description: <string>data.get('description'),
    completed: false
  }

  try {
    todos.value = await addTodo(todo)
  } catch (e) {
    $toast.error((<Error>e).message)
    return
  }
}

</script>

<template>
  <Navigation />
  <div class="page">
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
  </div>
</template>

<style scoped></style>

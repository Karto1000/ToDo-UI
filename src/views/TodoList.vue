<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { onMounted, ref } from 'vue'

const todos = ref([])

onMounted(async () => {
  const result = await fetch('http://localhost:8080/get/all')
  todos.value = await result.json()
})
</script>

<template>
  <h1>ToDo's</h1>
  <hr />
  <form>
    <div class="mb-3">
      <label for="input-title" class="form-label">Title</label>
      <input type="text" class="form-control" id="input-title" aria-describedby="emailHelp" />
    </div>
    <div class="mb-3">
      <label for="input-description" class="form-label">Description</label>
      <textarea class="form-control" id="input-description" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <hr />
  <div v-for="todo in todos" :key="todo.todo_id">
    <TodoItem :title="todo.title" :description="todo.description" />
  </div>
</template>

<style scoped></style>

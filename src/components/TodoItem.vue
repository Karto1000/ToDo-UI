<script setup lang="ts">

type Todo = {
  taskId: number
  title: string
  description: string
  completed: boolean
}

type Props = {
  todo: Todo,
  onChecked: Function,
  onEdit: Function
}

const props = defineProps<Props>()

</script>

<template>
  <div class="w-100 bg-body-tertiary rounded p-2 todo-item">
    <div class="action-container column-gap-1">
      <button class="hiding action-button" @click="() => props.onChecked(props.todo)">
        <img src="src/assets/check-solid.svg" class="action-image" width="15" height="15" />
      </button>
      <button class="hiding action-button" @click="() => props.onEdit(props.todo)">
        <img src="src/assets/pen-solid.svg" class="action-image" width="15" height="15" />
      </button>
    </div>
    <div class="vertical-line" />
    <div>
      <h3>{{ props.todo.title }}</h3>
      <p class="text-break" v-if="props.todo.description != null && props.todo.description != ''">{{ props.todo.description }}</p>
      <p class="text-break" v-else>No Description</p>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  min-height: 100px;
  display: flex;
  gap: 12px;
  box-shadow: lightgray 1px 5px 5px 2px;
}

.action-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-button {
  padding: 0;
  background-color: transparent;
  border: lightgray 1px solid;
  width: 20px;
  height: 20px;
  border-radius: 6px;
}

.vertical-line {
  border-left: 1px solid lightgray;
}

.action-image {
  vertical-align: baseline;
}
</style>

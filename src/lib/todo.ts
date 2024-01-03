import axios, { AxiosError } from 'axios'
// @ts-ignore
import { API_URL } from '@/lib/index'

export type Todo = {
  taskId?: number
  title: string
  description: string
  completed: boolean
}

const getPendingTodos = async (): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.get(`${API_URL}/get/pending`)
    return response.data as Todo[]
  } catch (e) {
    throw new Error((<AxiosError>e).response.data as string)
  }
}

const checkTodoById = async (id: string): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.put(`${API_URL}/check/${id}`)
    return response.data as Todo[]
  } catch (e) {
    throw new Error((<AxiosError>e).response.data as string)
  }
}

const updateTodo = async (data: Todo): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.put(
      `${API_URL}/update`,
      JSON.stringify(data),
      { headers: { 'content-type': 'application/json' } }
    )
    return response.data as Todo[]

  } catch (e) {
    throw new Error((<AxiosError>e).response.data as string)
  }
}

const addTodo = async (data: Todo): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.post(
      `${API_URL}/add`,
      JSON.stringify(data),
      { headers: { 'content-type': 'application/json' } }
    )

    return response.data as Todo[]
  } catch (e) {
    throw new Error((<AxiosError>e).response.data as string)
  }
}

export { getPendingTodos, checkTodoById, updateTodo, addTodo }
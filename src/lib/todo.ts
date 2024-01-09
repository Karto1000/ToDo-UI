import axios, { AxiosError } from 'axios'
// @ts-ignore
import { API_URL, ResponseError } from '@/lib/index'
import type { ErrorResponse } from '@/lib/index'

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
    if (e instanceof AxiosError) {
      if (!e.response) throw new Error('Request Failed')
      throw new ResponseError(e.response.data as ErrorResponse)
    }

    throw new Error((e as Error).message)
  }
}

const checkTodoById = async (id: string): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.put(`${API_URL}/check/${id}`)
    return response.data as Todo[]
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) throw new Error('Request Failed')
      throw new ResponseError(e.response.data as ErrorResponse)
    }

    throw new Error((e as Error).message)
  }
}

const updateTodo = async (data: Todo): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.put(`${API_URL}/update`, JSON.stringify(data), {
      headers: { 'content-type': 'application/json' }
    })
    return response.data as Todo[]
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) throw new Error('Request Failed')
      throw new ResponseError(e.response.data as ErrorResponse)
    }

    throw new Error((e as Error).message)
  }
}

const addTodo = async (data: Todo): Promise<Todo[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

  try {
    const response = await axios.post(`${API_URL}/add`, JSON.stringify(data), {
      headers: { 'content-type': 'application/json' }
    })

    return response.data as Todo[]
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) throw new Error('Request Failed')
      console.log(e.response.data)
      throw new ResponseError(e.response.data as ErrorResponse)
    }

    throw new Error((e as Error).message)
  }
}

export { getPendingTodos, checkTodoById, updateTodo, addTodo }

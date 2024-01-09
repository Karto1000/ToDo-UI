import axios, { AxiosError } from 'axios'
// @ts-ignore
import { API_URL, ResponseError } from '@/lib/index'
import type { ErrorResponse } from '@/lib/index'

type LoginResponse = {
  token: string
}

type LoginRequest = {
  email: string
  password: string
}

type RegisterRequest = {
  email: string
  password: string
  firstname: string
  lastname: string
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    })

    return response.data as LoginResponse
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) throw new Error('Request Failed')
      throw new ResponseError(e.response.data as ErrorResponse)
    }

    throw new Error((e as Error).message)
  }
}

const register = async (data: RegisterRequest): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/auth/register`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    })
    return true
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) throw new Error('Request Failed')
      throw new ResponseError(e.response.data as ErrorResponse)
    }

    throw new Error((e as Error).message)
  }
}

export { login, register }

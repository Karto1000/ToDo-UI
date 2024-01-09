<script setup lang="ts">
import { useToast } from 'vue-toast-notification'
import router from '@/router'
import { login } from '@/lib/auth'
import { ResponseError } from '@/lib'

const $toast = useToast()

type LoginRequest = {
  email: string
  password: string
}

const onLogin = async (e: SubmitEvent) => {
  e.preventDefault()

  const data = new FormData(e.target as HTMLFormElement)
  const loginRequest: LoginRequest = {}

  const entries: string[] = []
  data.forEach((value) => entries.push(value))

  // Any Entry is not truthy
  if (entries.some((e) => !e)) {
    $toast.info('Invalid Form')
    return
  }

  loginRequest.email = data.get('email')
  loginRequest.password = data.get('password')

  try {
    const loginResponse = await login(loginRequest)

    localStorage.setItem('jwt', loginResponse.token)
    await router.push('/')
  } catch (e) {
    if (e instanceof ResponseError) {
      $toast.error(e.errorResponse.message)
      return
    }

    if (e instanceof Error) {
      $toast.error(e.message)
    }
  }
}
</script>

<template>
  <div class="login-card">
    <div class="mb-4">
      <h1>Login</h1>
      <span>
        Don't Have an Account?
        <a href="/register">Create one Here</a>
      </span>
    </div>
    <form id="register-form" @submit="onLogin">
      <div class="mb-4">
        <label for="input-email" class="form-label">Email</label>
        <input type="email" name="email" class="form-control" id="input-email" required />
      </div>
      <div class="mb-4">
        <label for="input-password" class="form-label">Password</label>
        <input type="password" name="password" class="form-control" id="input-password" required />
      </div>
      <button type="submit" form="register-form" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-card {
  box-shadow: 2px 2px 10px 0 #dddddd;
  padding: 16px;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

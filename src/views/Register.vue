<script setup lang="ts">

import { useToast } from 'vue-toast-notification'
import router from '@/router'
import { login, register } from '@/lib/auth'

const $toast = useToast()

type RegisterRequest = {
  email: string,
  password: string,
  firstname: string,
  lastname: string
}

const onRegister = async (e: SubmitEvent) => {
  e.preventDefault()

  const data = new FormData(e.target as HTMLFormElement)
  const registerRequest: RegisterRequest = {}

  const entries: string[] = []
  data.forEach((value) => entries.push(value))

  // Any Entry is not truthy
  if (entries.some(e => !e)) {
    $toast.info('Invalid Form')
    return
  }

  registerRequest.email = data.get('email')
  registerRequest.password = data.get('password')
  registerRequest.firstname = data.get('firstname')
  registerRequest.lastname = data.get('lastname')

  try {
    await register(registerRequest)
    await router.push('/login')
  } catch (e) {
    $toast.error((<Error> e).message)
  }
}

</script>

<template>
  <div class="register-card">
    <h1>Register</h1>
    <form id="register-form" @submit="onRegister">
      <div class="mb-4">
        <label for="input-email" class="form-label">Email</label>
        <input type="email" name="email" class="form-control" id="input-email">
      </div>
      <div class="mb-4">
        <label for="input-password" class="form-label">Password</label>
        <input type="password" name="password" class="form-control" id="input-password">
      </div>
      <div class="mb-4">
        <label for="input-firstname" class="form-label">Firstname</label>
        <input type="text" name="firstname" class="form-control" id="input-firstname">
      </div>
      <div class="mb-4">

        <label for="input-lastname" class="form-label">Lastname</label>
        <input type="text" name="lastname" class="form-control" id="input-lastname">
      </div>

      <button type="submit" form="register-form" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<style scoped>

.register-card {
  box-shadow: 2px 2px 10px 0 #DDDDDD;
  padding: 16px;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
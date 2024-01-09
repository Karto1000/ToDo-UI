<script setup lang="ts">
import { useToast } from 'vue-toast-notification'
import router from '@/router'
import { login, register } from '@/lib/auth'
import { ResponseError } from '@/lib'

const $toast = useToast()

type RegisterRequest = {
  email: string
  password: string
  confirmationPassword: string
  firstname: string
  lastname: string
}

const onRegister = async (e: SubmitEvent) => {
  e.preventDefault()

  const data = new FormData(e.target as HTMLFormElement)
  const registerRequest: RegisterRequest = {} as RegisterRequest

  const entries: string[] = []
  data.forEach((value) => typeof value === 'string' && entries.push(value))

  // Any Entry is not truthy
  if (entries.some((e) => !e)) {
    $toast.info('Invalid Form')
    return
  }

  registerRequest.email = <string>data.get('email')
  registerRequest.password = <string>data.get('password')
  registerRequest.firstname = <string>data.get('firstname')
  registerRequest.lastname = <string>data.get('lastname')
  registerRequest.confirmationPassword = <string>data.get('confirm-password')

  try {
    await register(registerRequest)
    await router.push('/login')
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
  <div class="register-card">
    <h1>Register</h1>
    <form id="register-form" @submit="onRegister">
      <div class="mb-4">
        <label for="input-email" class="form-label">Email</label>
        <input type="email" name="email" class="form-control" id="input-email" required />
      </div>
      <div class="mb-4">
        <label for="input-password" class="form-label">Password</label>
        <input type="password" name="password" class="form-control" id="input-password" required />
      </div>
      <div class="mb-4">
        <label for="confirm-input-password" class="form-label">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          class="form-control"
          id="confirm-input-password"
          required
        />
      </div>
      <div class="mb-4">
        <label for="input-firstname" class="form-label">Firstname</label>
        <input type="text" name="firstname" class="form-control" id="input-firstname" required />
      </div>
      <div class="mb-4">
        <label for="input-lastname" class="form-label">Lastname</label>
        <input type="text" name="lastname" class="form-control" id="input-lastname" required />
      </div>

      <div class="d-flex gap-1">
        <button type="submit" form="register-form" class="btn btn-primary">Register</button>
        <button class="btn btn-secondary">
          <a href="/login" class="back-button-link">Go back to login page</a>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register-card {
  box-shadow: 2px 2px 10px 0 #dddddd;
  padding: 16px;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.back-button-link {
  text-decoration: none;
  color: white;
}
</style>

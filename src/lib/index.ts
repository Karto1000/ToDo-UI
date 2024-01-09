const API_PROTOCOL = 'http'
const API_HOST = 'localhost'
const API_PORT = '8080'
const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`

export type ErrorResponse = {
  message: string
  code: number
}

export class ResponseError extends Error {
  errorResponse: ErrorResponse

  constructor(errorResponse: ErrorResponse) {
    super(errorResponse.message)
    this.errorResponse = errorResponse
  }
}

export { API_URL }

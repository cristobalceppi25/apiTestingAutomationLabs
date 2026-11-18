import { test, expect } from '@playwright/test'
import { userLoginData, userRegisterData, authTokens } from '../../test_data/auth.data'
import { apiUrls } from '../../config/api.urls'
import type { ValidationErrorResponse } from '../../types/common/validationError.types'


test('AUTH-001 - Login con credenciales válidas', async ({ request }) => {

  const response = await request.post(apiUrls.auth.login, {
    data: {
      email: userLoginData.email,
      password: userLoginData.password
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.user.email).toBe('qa@demo.io')

  expect(jsonData.data.accessToken).toBeTruthy()
  expect(typeof jsonData.data.accessToken).toBe('string')

  expect(jsonData.data.refreshToken).toBeTruthy()
  expect(typeof jsonData.data.refreshToken).toBe('string')

  authTokens.accessToken = jsonData.data.accessToken
  authTokens.refreshToken = jsonData.data.refreshToken
})

test('AUTH-002 - Login con email inexistente', async ({ request }) => {
  const response = await request.post(apiUrls.auth.login, {
    data: {
      email: 'no.existe@example.com',
      password: userLoginData.password
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(401)

  expect(jsonData).toHaveProperty('error')
})

test('AUTH-003 - Login sin email', async ({ request }) => {
  const response = await request.post(apiUrls.auth.login, {
    data: {
      password: userLoginData.password
    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const emailError = jsonData.error.details.find(
    detail => detail.field === 'email'
  )

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(emailError).toBeDefined()
  expect(emailError?.message).toEqual('email is required')
})

test('AUTH-004 - Login sin contraseña', async ({ request }) => {
  const response = await request.post(apiUrls.auth.login, {
    data: {
      email: userLoginData.email
    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const passwordError = jsonData.error.details.find(
    detail => detail.field === 'password'
  )
  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(passwordError).toBeDefined()
  expect(passwordError?.message).toEqual('password is required')

})


test('AUTH-005 - Login con body vacío', async ({ request }) => {
  const response = await request.post(apiUrls.auth.login, {
    data: {

    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const passwordError = jsonData.error.details.find(
    detail => detail.field === 'password'
  )

  const emailError = jsonData.error.details.find(
    detail => detail.field === 'email'
  )

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(emailError).toBeDefined()
  expect(emailError?.message).toEqual('email is required')

  expect(passwordError).toBeDefined()
  expect(passwordError?.message).toEqual('password is required')
})

test('AUTH-006 - Registro con credenciales válidos', async ({ request }) => {
  const response = await request.post(apiUrls.auth.register, {
    data: {
      name: userRegisterData.name,
      email: userRegisterData.email,
      password: userRegisterData.password
    }
  })

  const jsonData = await response.json()
  expect(response.status()).toBe(201)


  expect(jsonData.data.name).toBe(userRegisterData.name)
  expect(jsonData.data.email).toBe(userRegisterData.email)

  expect(jsonData.data.name).toBeTruthy()
  expect(typeof jsonData.data.name).toBe('string')

  expect(jsonData.data.email).toBeTruthy()
  expect(typeof jsonData.data.email).toBe('string')

  expect(jsonData.data.accessToken).toBeTruthy()
  expect(typeof jsonData.data.accessToken).toBe('string')

  expect(typeof jsonData.data.id).toBe('number')

  expect(jsonData.data).toHaveProperty('accessToken')
})

test('AUTH-007 - Registro con formato de email incorrecto', async ({ request }) => {
  const response = await request.post(apiUrls.auth.register, {
    data: {
      name: userRegisterData.name,
      email: 'new.user@',
      password: userRegisterData.password
    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const emailError = jsonData.error.details.find(
    detail => detail.field === 'email'
  )
  expect(response.status()).toBe(422)


  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(emailError).toBeDefined()
  expect(emailError?.message).toEqual('email must be a valid email')
})

test('AUTH-008 - Registro de usuario sin ingresar nombre', async ({ request }) => {
  const response = await request.post(apiUrls.auth.register, {
    data: {
      email: userRegisterData.email,
      password: userRegisterData.password
    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const nameError = jsonData.error.details.find(
    detail => detail.field === 'name'
  )
  expect(response.status()).toBe(422)


  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(nameError).toBeDefined()
  expect(nameError?.message).toEqual('name is required')
})

test('AUTH-009 - Registro de usuario sin el email', async ({ request }) => {
  const response = await request.post(apiUrls.auth.register, {
    data: {
      name: userRegisterData.name,
      password: userRegisterData.password
    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const emailError = jsonData.error.details.find(
    detail => detail.field === 'email'
  )
  expect(response.status()).toBe(422)


  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(emailError).toBeDefined()
  expect(emailError?.message).toEqual('email is required')
})


test('AUTH-010 - Registro de usuario sin la contraseña', async ({ request }) => {
  const response = await request.post(apiUrls.auth.register, {
    data: {
      name: userRegisterData.name,
      email: userRegisterData.email
    }
  })

  const jsonData: ValidationErrorResponse = await response.json()

  const passwordError = jsonData.error.details.find(
    detail => detail.field === 'password'
  )
  expect(response.status()).toBe(422)


  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(passwordError).toBeDefined()
  expect(passwordError?.message).toEqual('password is required')
})

test('AUTH-011 - Renovar el token con un refreshToken válido', async ({ request }) => {
  const response = await request.post(apiUrls.auth.refresh, {
    data: {
      refreshToken: authTokens.refreshToken
    }
  })

  const jsonData = await response.json()
  expect(response.status()).toBe(200)


  expect(jsonData.data).toHaveProperty('accessToken')

  expect(jsonData.data.accessToken).not.toEqual(authTokens.accessToken)

  expect(jsonData.data.accessToken).toBeTruthy()
  expect(typeof jsonData.data.accessToken).toBe('string')

})

test('AUTH-012 - Renovar el token con un refreshToken inválido', async ({ request }) => {
  const response = await request.post(apiUrls.auth.refresh, {
    data: {
      refreshToken: "test"
    }
  })

  const jsonData = await response.json()
  expect(response.status()).toBe(401)


  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('INVALID_REFRESH_TOKEN')

})

test('AUTH-013 - Renovar token sin proporcionar refreshToken', async ({ request }) => {
  const response = await request.post(apiUrls.auth.refresh, {
    data: {

    }
  })

  const jsonData = await response.json()
  expect(response.status()).toBe(401)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('INVALID_REFRESH_TOKEN')

})

test('AUTH-014 - Ver tu usuario de manera exitosa', async ({ request }) => {
  const response = await request.get(apiUrls.auth.me, {
    headers: {
      Authorization: `Bearer ${authTokens.accessToken}`
    }
  })

  const jsonData = await response.json()
  expect(response.status()).toBe(200)

  expect(jsonData.data.email).toEqual(userLoginData.email)
})

test('AUTH-015 - No ingresar el bearer token', async ({ request }) => {
  const response = await request.get(apiUrls.auth.me, {

  })

  const jsonData = await response.json()
  expect(response.status()).toBe(401)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('UNAUTHORIZED')
})


test('AUTH-016 - Poder desconectar de forma correcta la cuenta', async ({ request }) => {
  const response = await request.post(apiUrls.auth.logout, {
    data: {

    }
  })

  const jsonData = await response.json()
  expect(response.status()).toBe(200)

  expect(jsonData.data).toHaveProperty('message')
})





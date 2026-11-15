import { test, expect, request } from '@playwright/test'
import { firstUserData, secondUserData, apiFinalUrl, userRegisterData } from '../../test_data/auth.data'
import type { UsersResponse, ValidationErrorResponse } from '../../test_data/auth.types'

test('USERS-001 - Mostrar los usuarios de la primera página', async ({ request }) => {

  const response = await request.get(apiFinalUrl.user, {
    params: {
      page: 1
    }
  });

  const jsonData: UsersResponse = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData).toHaveProperty('data')

  jsonData.data.forEach(users => {
    expect(users.id).toEqual(expect.any(Number))
    expect(users.firstName).toEqual(expect.any(String))
    expect(users.lastName).toEqual(expect.any(String))
    expect(users.email).toEqual(expect.any(String))
    expect(users.role).toEqual(expect.any(String))
  });

  expect(jsonData.pagination.hasPrev).toBe(false)
  expect(jsonData.pagination.page).toBe(1)
  expect(jsonData.pagination.pageSize).toBe(10)
  expect(jsonData.data).toHaveLength(10)

})

test('USERS-002 - Mostrar los usuarios de la segunda página', async ({ request }) => {

  const response = await request.get(apiFinalUrl.user, {
    params: {
      page: 2
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.pagination.hasPrev).toBe(true)
  expect(jsonData.pagination.page).toBe(2)
  expect(jsonData.data[0].id).toBe(11)
})

test('USERS-003 - Colocar una letra en la query y ver que entrega', async ({ request }) => {

  const response = await request.get(apiFinalUrl.user, {
    params: {
      page: "a"
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.pagination.hasPrev).toBe(false)
  expect(jsonData.pagination.page).toBe(1)
  expect(jsonData.pagination.pageSize).toBe(10)
  expect(jsonData.data).toHaveLength(10)
})

test('USERS-004 - Mostrar solo los primeros 6 usuarios', async ({ request }) => {

  const response = await request.get(apiFinalUrl.user, {
    params: {
      limit: 6
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.pagination.pageSize).toBe(6)
  expect(jsonData.data).toHaveLength(6)
})

test('USERS-005 - Mostrar a los usuarios de la tercera página con 5 usuarios por página', async ({ request }) => {

  const response = await request.get(apiFinalUrl.user, {
    params: {
      page: 3,
      limit: 5
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.pagination.pageSize).toBe(5)
  expect(jsonData.data).toHaveLength(5)
  expect(jsonData.pagination.page).toBe(3)
  expect(jsonData.pagination.hasPrev).toBe(true)
  expect(jsonData.pagination.hasNext).toBe(true)
})

test('USERS-006 - Ordenar los usuarios por orden alfabético del nombre', async ({ request }) => {

  const response = await request.get(apiFinalUrl.user, {
    params: {
      sort: "firstName",
      order: "asc"
    }
  })

  const jsonData: UsersResponse = await response.json()

  expect(response.status()).toBe(200)

  const names = jsonData.data.map(users => users.firstName)
  const sortedNames = [...names].sort((a, b) => a.localeCompare(b))

  expect(names).toEqual(sortedNames)
})

test('USERS-007 - Mostrar los datos del usuario con id 1', async ({ request }) => {

  const response = await request.get(`${apiFinalUrl.user}/1`);

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.id).toBe(1)
  expect(jsonData.data.id).toEqual(expect.any(Number))
  expect(jsonData.data.firstName).toEqual(expect.any(String))
  expect(jsonData.data.lastName).toEqual(expect.any(String))
  expect(jsonData.data.email).toEqual(expect.any(String))
  expect(jsonData.data.role).toEqual(expect.any(String))
})

test('USERS-008  - Mostrar los datos del usuario con id 100', async ({ request }) => {

  const response = await request.get(`${apiFinalUrl.user}/100`);

  const jsonData = await response.json()

  expect(response.status()).toBe(404)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('NOT_FOUND')

})

test('USERS-009 -  Crear de manera exitosa un nuevo usuario', async ({ request }) => {

  const response = await request.post(apiFinalUrl.user, {
    data: {
      firstName: firstUserData.firstName,
      lastName: firstUserData.lastName,
      email: firstUserData.email,
      role: firstUserData.role
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(201)

  expect(jsonData.data.id).toEqual(expect.any(Number))
  expect(jsonData.data.id).toBeGreaterThan(0)
  expect(jsonData.data.firstName).toEqual(expect.any(String))
  expect(jsonData.data.lastName).toEqual(expect.any(String))
  expect(jsonData.data.email).toEqual(expect.any(String))
  expect(jsonData.data.role).toEqual(expect.any(String))
})

test('USERS-010 - Creación de usuario sin nombre', async ({ request }) => {

  const response = await request.post(apiFinalUrl.user, {
    data: {
      lastName: firstUserData.lastName,
      email: firstUserData.email,
      role: firstUserData.role
    }
  });

  const jsonData: ValidationErrorResponse = await response.json()

  const firstNameError = jsonData.error.details.find(
    detail => detail.field === 'firstName'
  )

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(firstNameError).toBeDefined()
  expect(firstNameError?.message).toEqual('firstName is required')
})

test('USERS-011 - Creación de usuario sin apellido', async ({ request }) => {

  const response = await request.post(apiFinalUrl.user, {
    data: {
      firstName: firstUserData.firstName,
      email: firstUserData.email,
      role: firstUserData.role
    }
  });

  const jsonData: ValidationErrorResponse = await response.json()

  const lastNameError = jsonData.error.details.find(
    detail => detail.field === 'lastName'
  )

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(lastNameError).toBeDefined()
  expect(lastNameError?.message).toEqual('lastName is required')
})

test('USERS-012  - Creación de usuario sin email', async ({ request }) => {

  const response = await request.post(apiFinalUrl.user, {
    data: {
      firstName: firstUserData.firstName,
      lastName: firstUserData.lastName,
      role: firstUserData.role
    }
  });

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


test('USERS-013 - Creación de usuario con el body vacío', async ({ request }) => {

  const response = await request.post(apiFinalUrl.user, {
    data: {

    }
  });

  const jsonData: ValidationErrorResponse = await response.json()

  const firstNameError = jsonData.error.details.find(
    detail => detail.field === 'firstName'
  )

  const lastNameError = jsonData.error.details.find(
    detail => detail.field === 'lastName'
  )

  const emailError = jsonData.error.details.find(
    detail => detail.field === 'email'
  )

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(firstNameError).toBeDefined()
  expect(firstNameError?.message).toEqual('firstName is required')

  expect(lastNameError).toBeDefined()
  expect(lastNameError?.message).toEqual('lastName is required')

  expect(emailError).toBeDefined()
  expect(emailError?.message).toEqual('email is required')
})

test('USERS-014 - Actualizar todos los campos del usuario', async ({ request }) => {

  const response = await request.put(`${apiFinalUrl.user}/1`, {
    data: {
      firstName: secondUserData.firstName,
      lastName: secondUserData.lastName,
      email: secondUserData.email,
      role: secondUserData.role
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.firstName).toEqual(secondUserData.firstName)
  expect(jsonData.data.lastName).toEqual(secondUserData.lastName)
  expect(jsonData.data.email).toEqual(secondUserData.email)
  expect(jsonData.data.role).toEqual(secondUserData.role)
})

test('USERS-015 - Actualizar solo el campo del nombre del usuario', async ({ request }) => {

  const response = await request.patch(`${apiFinalUrl.user}/1`, {
    data: {
      firstName: secondUserData.firstName
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.firstName).toEqual(secondUserData.firstName)

})


test('USERS-016 - Actualizar solo el campo del apellido del usuario', async ({ request }) => {

  const response = await request.patch(`${apiFinalUrl.user}/1`, {
    data: {
      lastName: secondUserData.lastName
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.lastName).toEqual(secondUserData.lastName)

})

test('USERS-017 - Actualizar solo el campo del email del usuario', async ({ request }) => {

  const response = await request.patch(`${apiFinalUrl.user}/1`, {
    data: {
      email: secondUserData.email
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.email).toEqual(secondUserData.email)

})

test('USERS-018 - Actualizar solo el campo del rol del usuario', async ({ request }) => {

  const response = await request.patch(`${apiFinalUrl.user}/1`, {
    data: {
      role: secondUserData.role
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.role).toEqual(secondUserData.role)

})

test('USERS-019 - Borrar al usuario con id 1', async ({ request }) => {

  const response = await request.delete(`${apiFinalUrl.user}/1`)

  expect(response.status()).toBe(204)

})


test('USERS-020 - Agregar 2  usuarios al mismo tiempo', async ({ request }) => {

  const response = await request.post(`${apiFinalUrl.user}/bulk`, {
    data: [{
      firstName: firstUserData.firstName,
      lastName: firstUserData.lastName,
      email: firstUserData.email,
      role: firstUserData.role
    },
    {
      firstName: secondUserData.firstName,
      lastName: secondUserData.lastName,
      email: secondUserData.email,
      role: secondUserData.role
    }]

  });

  const jsonData = await response.json()

  expect(response.status()).toBe(201)

  expect(jsonData.data[0].id).toEqual(expect.any(Number))
  expect(jsonData.data[0].firstName).toEqual(firstUserData.firstName)
  expect(jsonData.data[0].lastName).toEqual(firstUserData.lastName)
  expect(jsonData.data[0].email).toEqual(firstUserData.email)
  expect(jsonData.data[0].role).toEqual(firstUserData.role)

  expect(jsonData.data[1].id).toEqual(expect.any(Number))
  expect(jsonData.data[1].firstName).toEqual(secondUserData.firstName)
  expect(jsonData.data[1].lastName).toEqual(secondUserData.lastName)
  expect(jsonData.data[1].email).toEqual(secondUserData.email)
  expect(jsonData.data[1].role).toEqual(secondUserData.role)

  expect(jsonData.data[0].id).not.toBe(jsonData.data[1].id)
})

import { test, expect } from '@playwright/test'
import { apiUrls } from '../../config/api.urls'
import { firstProductData, secondProductData } from '../../test_data/product.data'
import type { ProductsResponse } from '../../types/products.types'
import type { ValidationErrorResponse } from '../../types/common/validationError.types'

test('PROD-001 - Mostrar los productos de la primera página', async ({ request }) => {

  const response = await request.get(apiUrls.products.base, {
    params: {
      page: 1
    }
  });

  const jsonData: ProductsResponse = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData).toHaveProperty('data')

  jsonData.data.forEach(prod => {
    expect(prod.id).toEqual(expect.any(Number))
    expect(prod.name).toEqual(expect.any(String))
    expect(prod.price).toEqual(expect.any(Number))
    expect(prod.category).toEqual(expect.any(String))
    expect(prod.stock).toEqual(expect.any(Number))
  });

  expect(jsonData.pagination.hasPrev).toBe(false)
  expect(jsonData.pagination.page).toBe(1)
  expect(jsonData.pagination.pageSize).toBe(10)
  expect(jsonData.data).toHaveLength(10)

})

test('PROD-002 - Mostrar los productos de la tercera página', async ({ request }) => {

  const response = await request.get(apiUrls.products.base, {
    params: {
      page: 3
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.pagination.hasPrev).toBe(true)
  expect(jsonData.pagination.page).toBe(3)
  expect(jsonData.data[0].id).toBe(21)
})

test('PROD-003 - Mostrar solo 4 productos', async ({ request }) => {

  const response = await request.get(apiUrls.products.base, {
    params: {
      limit: 4
    }
  })

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.pagination.pageSize).toBe(4)
  expect(jsonData.data).toHaveLength(4)
})

test('PROD-004 - Mostrar los productos en base al stock que tienen de forma descendente', async ({ request }) => {

  const response = await request.get(apiUrls.products.base, {
    params: {
      sort: "stock",
      order: "des"
    }
  })

  const jsonData: ProductsResponse = await response.json()

  expect(response.status()).toBe(200)

  const products = jsonData.data.map(prod => prod.stock)

  const sortedStockProducts = [...products].sort((a, b) => a - b)
  expect(products).toEqual(sortedStockProducts)
})

test('PROD-005 - Mostrar los datos del producto buscado', async ({ request }) => {

  const response = await request.get(apiUrls.products.base, {
    params: {
      q: 'Comet Power Bank C'
    }
  })

  const jsonData: ProductsResponse = await response.json()

  expect(response.status()).toBe(200)

  const productExists = jsonData.data.some(
    product => product.name === "Comet Power Bank C"
  );

  expect(productExists).toBe(true)
})

test('PROD-006 - Ver los datos del producto con id 5', async ({ request }) => {

  const response = await request.get(`${apiUrls.products.base}/5`);

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.id).toBe(5)
  expect(jsonData.data.id).toEqual(expect.any(Number))
  expect(jsonData.data.name).toEqual(expect.any(String))
  expect(jsonData.data.price).toEqual(expect.any(Number))
  expect(jsonData.data.category).toEqual(expect.any(String))
  expect(jsonData.data.stock).toEqual(expect.any(Number))
})

test('PROD-007 - Crear  un nuevo producto', async ({ request }) => {

  const response = await request.post(apiUrls.products.base, {
    data: {
      name: firstProductData.name,
      price: firstProductData.price,
      category: firstProductData.category,
      stock: firstProductData.stock
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(201)

  expect(jsonData.data.id).toEqual(expect.any(Number))
  expect(jsonData.data.id).toBeGreaterThan(0)
  expect(jsonData.data.name).toEqual(expect.any(String))
  expect(jsonData.data.price).toEqual(expect.any(Number))
  expect(jsonData.data.category).toEqual(expect.any(String))
  expect(jsonData.data.stock).toEqual(expect.any(Number))
})

test('PROD-008 - Crear un producto sin nombre', async ({ request }) => {

  const response = await request.post(apiUrls.products.base, {
    data: {
      price: firstProductData.price,
      category: firstProductData.category,
      stock: firstProductData.stock
    }
  });

  const jsonData: ValidationErrorResponse = await response.json()

  const productNameError = jsonData.error.details.find(
    detail => detail.field === "name"
  );

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(productNameError).toBeDefined()
  expect(productNameError?.message).toEqual('name is required')
})

test('PROD-009 - Crear un producto sin  precio', async ({ request }) => {

  const response = await request.post(apiUrls.products.base, {
    data: {
      name: firstProductData.name,
      category: firstProductData.category,
      stock: firstProductData.stock
    }
  });

  const jsonData: ValidationErrorResponse = await response.json()

  const productPriceError = jsonData.error.details.find(
    detail => detail.field === "price"
  );

  expect(response.status()).toBe(422)

  expect(jsonData).toHaveProperty('error')

  expect(jsonData.error.code).toEqual('VALIDATION_ERROR')

  expect(productPriceError).toBeDefined()
  expect(productPriceError?.message).toEqual('price is required')
})

test('PROD-010 - Crear un producto con un precio en negativo', async ({ request }) => {

  const response = await request.post(apiUrls.products.base, {
    data: {
      name: firstProductData.name,
      price: -10,
      category: firstProductData.category,
      stock: firstProductData.stock
    }
  });

  const jsonData = await response.json()

  expect(jsonData.data.price).toBeLessThan(0)
  expect(response.status()).not.toBe(201)
})

test('PROD-011 - Actualizar todos los datos que son obligatorios', async ({ request }) => {

  const response = await request.put(`${apiUrls.products.base}/5`, {
    data: {
      name: secondProductData.name,
      price: secondProductData.price,
      category: secondProductData.category,
      stock: secondProductData.stock
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.name).toEqual(secondProductData.name)
  expect(jsonData.data.price).toEqual(secondProductData.price)
  expect(jsonData.data.category).toEqual(secondProductData.category)
  expect(jsonData.data.stock).toEqual(secondProductData.stock)
})

test('PROD-012 - Actualizar solo el nombre del producto', async ({ request }) => {

  const response = await request.patch(`${apiUrls.products.base}/5`, {
    data: {
      name: secondProductData.name
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.name).toEqual(secondProductData.name)
})

test('PROD-013 - Actualizar solo el precio del producto', async ({ request }) => {

  const response = await request.patch(`${apiUrls.products.base}/5`, {
    data: {
      price: secondProductData.price
    }
  });

  const jsonData = await response.json()

  expect(response.status()).toBe(200)

  expect(jsonData.data.price).toEqual(secondProductData.price)
})

test('PROD-014 - Borrar el producto con id 5', async ({ request }) => {

  const response = await request.delete(`${apiUrls.products.base}/5`)

  expect(response.status()).toBe(204)

})

test('PROD-015 - Crear 2 productos al mismo tiempo', async ({ request }) => {

  const response = await request.post(`${apiUrls.products.base}/bulk`, {
    data: [{
      name: firstProductData.name,
      price: firstProductData.price,
      category: firstProductData.category,
      stock: firstProductData.stock
    },
    {
      name: secondProductData.name,
      price: secondProductData.price,
      category: secondProductData.category,
      stock: secondProductData.stock
    }]

  });

  const jsonData = await response.json()

  expect(response.status()).toBe(201)

  expect(jsonData.data[0].id).toEqual(expect.any(Number))
  expect(jsonData.data[0].name).toEqual(firstProductData.name)
  expect(jsonData.data[0].price).toEqual(firstProductData.price)
  expect(jsonData.data[0].category).toEqual(firstProductData.category)
  expect(jsonData.data[0].stock).toEqual(firstProductData.stock)

  expect(jsonData.data[1].id).toEqual(expect.any(Number))
  expect(jsonData.data[1].name).toEqual(secondProductData.name)
  expect(jsonData.data[1].price).toEqual(secondProductData.price)
  expect(jsonData.data[1].category).toEqual(secondProductData.category)
  expect(jsonData.data[1].stock).toEqual(secondProductData.stock)

  expect(jsonData.data[0].id).not.toBe(jsonData.data[1].id)
})
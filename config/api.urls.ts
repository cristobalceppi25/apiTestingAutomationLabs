const apiBaseUrl = '/v1'

export const apiUrls = {
  auth: {
    login: `${apiBaseUrl}/auth/login`,
    register: `${apiBaseUrl}/auth/register`,
    refresh: `${apiBaseUrl}/auth/refresh`,
    me: `${apiBaseUrl}/auth/me`,
    logout: `${apiBaseUrl}/auth/logout`,
  },

  users: {
    base: `${apiBaseUrl}/users`,
  },

  products: {
    base: `${apiBaseUrl}/products`,
  }
}


export const apiFinalUrl = {
  login: '/v1/auth/login',
  register: '/v1/auth/register',
  refresh: '/v1/auth/refresh',
  me: '/v1/auth/me',
  logout: '/v1/auth/logout',
  user: 'v1/users',
  products: 'v1/products'
}
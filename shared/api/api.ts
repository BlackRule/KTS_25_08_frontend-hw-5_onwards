import qs from 'qs'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://front-school-strapi.ktsdev.ru/api'

let authToken: string | null = null

export function setAuthToken(jwt: string | null) {
  authToken = jwt
}

export type APIResponse<T> = {
  data: T
}

export type CategoryFromAPI = {
  id: number
  title: string
}

export type ImageFromAPI = {
  url: string
}

export type ProductFromAPI = {
  description: string
  documentId: string
  images: ImageFromAPI[]
  price: number
  productCategory: CategoryFromAPI
  title: string
}

export type Category = {
  id: number
  name: string
}

export type Product = {
  category: Category
  description: string
  id: string
  images: string[]
  price: number
  title: string
}

export type FetchOptions = {
  cache?: RequestCache
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
  headers?: HeadersInit
}

type RequestOptions = FetchOptions & Omit<RequestInit, 'headers'>

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { headers, next, ...rest } = options
  const finalHeaders = new Headers(headers)
  if (!finalHeaders.has('Content-Type') && rest.body instanceof Blob === false && typeof rest.body === 'string') {
    finalHeaders.set('Content-Type', 'application/json')
  }
  if (authToken && !finalHeaders.has('Authorization')) {
    finalHeaders.set('Authorization', `Bearer ${authToken}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    next,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const errorBody = await response.json()
      message = errorBody?.error?.message ?? message
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message)
  }
  return response.json() as Promise<T>
}

function convertAPIProductToProduct(product: ProductFromAPI): Product {
  return {
    category: {
      id: product.productCategory.id,
      name: product.productCategory.title,
    },
    description: product.description,
    id: product.documentId,
    images: product.images.map((img) => img.url),
    price: product.price,
    title: product.title,
  }
}

function convertAPICategoryToCategory(category: CategoryFromAPI): Category {
  return {
    id: category.id,
    name: category.title,
  }
}

export type FetchProductsParams = {
  categoryIds?: number[]
  limit?: number
  search?: string
  pagination?: {
    page: number
    pageSize: number
  }
} & FetchOptions

export async function fetchProducts(params: FetchProductsParams = {}): Promise<Product[]> {
  const { categoryIds, limit = -1, search, pagination, ...fetchOptions } = params
  const query: Record<string, unknown> = {
    populate: ['images', 'productCategory'],
  }

  if (categoryIds && categoryIds.length > 0) {
    query.filters = {
      productCategory: {
        id: { $in: categoryIds },
      },
    }
  }

  if (search) {
    const or = [
      { title: { $containsi: search } },
      { description: { $containsi: search } },
      { productCategory: { title: { $containsi: search } } },
    ]
    if (query.filters) {
      query.filters = { $and: [query.filters, { $or: or }] }
    } else {
      query.filters = { $or: or }
    }
  }

  if (limit !== -1) {
    query.pagination = {
      limit,
    }
  } else if (pagination) {
    query.pagination = {
      page: pagination.page,
      pageSize: pagination.pageSize,
    }
  } else {
    query.pagination = {
      limit: 100,
    }
  }

  const queryString = qs.stringify(query, { encodeValuesOnly: true })
  const response = await request<APIResponse<ProductFromAPI[]>>(`/products?${queryString}`, fetchOptions)
  return response.data.map(convertAPIProductToProduct)
}

export async function fetchProduct(id: string, options: FetchOptions = {}): Promise<Product> {
  const queryString = qs.stringify({ populate: ['images', 'productCategory'] }, { encodeValuesOnly: true })
  const response = await request<APIResponse<ProductFromAPI>>(`/products/${id}?${queryString}`, options)
  return convertAPIProductToProduct(response.data)
}

export async function fetchCategories(options: FetchOptions = {}): Promise<Category[]> {
  const response = await request<APIResponse<CategoryFromAPI[]>>('/product-categories', options)
  return response.data.map(convertAPICategoryToCategory)
}

export type SignInResponse = {
  jwt: string
  user: {
    email: string
    username: string
  }
}

export async function postSignIn(email: string, password: string) {
  return request<SignInResponse>('/auth/local', {
    method: 'POST',
    body: JSON.stringify({
      identifier: email,
      password,
    }),
    cache: 'no-store',
  })
}

export async function postSignUp(email: string, password: string) {
  return request('/auth/local/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      username: email.split('@')[0],
    }),
    cache: 'no-store',
  })
}

export async function postForgotPassword(email: string) {
  return request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
    cache: 'no-store',
  })
}

export type CartAPIItem = {
  id: number
  quantity: number
  product: ProductFromAPI
  originalProductId?: number
}

export async function getCart(): Promise<{ product: Product; qty: number; originalProductId?: number }[]> {
  const items = await request<CartAPIItem[]>(`/cart`, { cache: 'no-store' })
  return items.map((it) => ({
    product: convertAPIProductToProduct(it.product),
    qty: it.quantity,
    originalProductId: it.originalProductId,
  }))
}

export async function postCartAdd(params: { product: number; quantity?: number }) {
  const { product, quantity = 1 } = params
  return request(`/cart/add`, {
    method: 'POST',
    body: JSON.stringify({ product, quantity }),
    cache: 'no-store',
  })
}

export async function postCartRemove(params: { product: number; quantity?: number }) {
  const { product, quantity = 1 } = params
  return request(`/cart/remove`, {
    method: 'POST',
    body: JSON.stringify({ product, quantity }),
    cache: 'no-store',
  })
}

export async function findProductNumericIdByDocumentId(documentId: string): Promise<number | null> {
  const query = qs.stringify({
    filters: { documentId: { $eq: documentId } },
    pagination: { limit: 1 },
  }, { encodeValuesOnly: true })
  const resp = await request<any>(`/products?${query}`, { cache: 'no-store' })
  const data = resp?.data
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0]
    if (first && typeof first.id === 'number') return first.id
  }
  return null
}

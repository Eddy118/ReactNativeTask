import { IProduct } from "../interface"
import { api } from './axios-config';

export const ProductAPI = {
  get: async function (id: string) {
    const response = await api.request({
      url: `/products/${id}`,
      method: "GET",
    })
    return response.data.product
  },
  getAll: async function (limit: number = 20,skip: number = 0) {
    const response = await api.request({
      url: `/products?limit=${limit}&skip=${skip}`,
      method: "GET",
    })

    return response.data.products
  },
  search: async function (name : string, cancel = false) {
    const response = await api.request({
      url: "/products/search",
      method: "GET",
      params: {
        name: name,
      },
    })

    return response.data.products
  },
  create: async function (product: IProduct) {
    await api.request({
      url: `/products`,
      method: "POST",
      data: product,
    })
  },
}
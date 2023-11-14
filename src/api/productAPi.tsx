import {IProduct} from '../interface';
import {api} from './axios-config';
import offlineProductsData from '../mockdata/products/products.json';

export const ProductAPI = {
  get: async function (id: string) {
    try {
      const response = await api.request({
        url: `/products/${id}`,
        method: 'GET',
      });
      return response.data.product;
    } catch (error) {
      console.log({error})
    }
  },
  getAll: async function (limit: number = 20, skip: number = 0) {
    try {
      const response = await api.request({
        url: `/products?limit=${limit}&skip=${skip}`,
        method: 'GET',
      });
      return response.data.products;
    } catch (error) {
      console.log({error})
    }
  },
  getOfflinProducts: async function () {
    try {
      const response = offlineProductsData?.products;
      return response;
    } catch (error) {
      console.log({error})
    }
  },
  search: async function (name: string, cancel = false) {
    try {
      const response = await api.request({
        url: '/products/search',
        method: 'GET',
        params: {
          name: name,
        },
      });

      return response.data.products;
    } catch (error) {
      console.log({error})
    }
  },
  create: async function (product: IProduct) {
    try {
      await api.request({
        url: `/products`,
        method: 'POST',
        data: product,
      });
    } catch (error) {
      console.log({error})
    }
  },
};

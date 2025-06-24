import { apiClient } from "@/lib/axiosClient"


//service to create product
export const createProduct = async(payload)=>{
    return apiClient.post('/products',payload);
}

//service to edit product
export const editProduct = async(id,payload)=>{
    return apiClient.put(`/products/${id}`,payload)
}

//service to delete product
export const deleteProduct = async(id)=>{
    return apiClient.delete(`/products/${id}`);
}

// service to get  a single product
export const getSingleProduct = async(id) =>{
    return apiClient.get(`/products/${id}`);
}

// service to get all products 
export const getAllProducts = async()=>{
    return apiClient.get('/products');
}
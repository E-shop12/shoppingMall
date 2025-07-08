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
    const res = await apiClient.get('/products');
    return res.data.data;
}

// service to get product category
export const getCategory = async () => {
  const res = await apiClient.get("/product-category");
  return res.data.data; // ✅ returns ONLY the array now
};

// service to get a single product category by id 
export  const getSingleCategoryID = async(_id) =>{
    const res = await apiClient.get(`/product-category/${_id}`);
    return res.data.data;
}
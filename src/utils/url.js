export const getProdustcList = (path, page, pageSize) => `/mock/products/${path}.json?page=${page}&pageSize=${pageSize}`
export const getDiscountList = (page, pageSize) => `/mock/products/discounts.json?page=${page}&pageSize=${pageSize}`
export const getProduct = id => `/mock/product_detail/${id}.json`
export const getShop = id => `/mock/shops/${id}.json`

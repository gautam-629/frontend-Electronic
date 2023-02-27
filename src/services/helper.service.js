export const BASE_URL = `http://localhost:9090`;
export const PRODUCT_PAGE_SIZE = 10;

export const getProductImageUrl = (productId) => {
  return `${BASE_URL}/products/image/${productId}`;
};

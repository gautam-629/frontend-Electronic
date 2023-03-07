export const BASE_URL = `http://localhost:9090`;
export const PRODUCT_PAGE_SIZE = 10;
export const ADMIN_ORDER_PAGE_SIZE = 10;
export const USER_PAGE_SIZE = 10;
export const SOTRE_PAGE_PRODUCT_SIZE = 9;
export const PAYMENT_STATUS = "NOTPAID";
export const ORDER_STATUS = "PENDING";

export const getUserImageUrl = (userId) => {
  return `${BASE_URL}/users/image/${userId}`;
};

export const getProductImageUrl = (productId) => {
  return `${BASE_URL}/products/image/${productId}`;
};

export const formatDate = (timeInLongs) => {
  if (!timeInLongs) {
    return null;
  }
  //   var options = {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };
  const date = new Date(timeInLongs);
  // return date.toLocaleDateString("hi-IN", options);
  // return date.toLocaleString("en-US", options);
  return date.toLocaleString();
};

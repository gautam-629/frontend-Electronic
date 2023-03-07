import { privateAxios } from "./axios.service";
//all the functions calling api related to order

//get orders: async wait
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  let result = await privateAxios.get(
    `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return result.data;
};

//update orders
export const updateOroder = async (order, orderId) => {
  const result = await privateAxios.put(`/orders/${orderId}`, order);
  return result.data;
};

//create create order
export const createOrder = async (orderDetail) => {
  const result = await privateAxios.post(`/orders`, orderDetail);
  return result.data;
};

//get orders of users
export const getOrdersOfUser = async (userId) => {
  const result = await privateAxios.get(`/orders/users/${userId}`);
  return result.data;
};

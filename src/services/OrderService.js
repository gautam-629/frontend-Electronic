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

//get orders of users

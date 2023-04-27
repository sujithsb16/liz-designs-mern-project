import axios from "axios";

export const axiosAdminInstance = axios.create({ baseURL: 'http://localhost:4000/admin' });
export const axiosVendorInstance = axios.create({ baseURL: 'http://localhost:4000/vendor' });
export const axiosUserInstance = axios.create({ baseURL: 'http://localhost:4000/users' });



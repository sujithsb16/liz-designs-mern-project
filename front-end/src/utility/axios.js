import axios from "axios";

export const axiosAdminInstance = axios.create({ baseURL: 'http://localhost:4000/admin' });



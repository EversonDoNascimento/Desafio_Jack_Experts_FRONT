import axios from "axios";
// Definindo a função do axios para criar a conexão com a API
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

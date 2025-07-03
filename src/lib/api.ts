// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backendtape.onrender.com/api' 
  : 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/categories`,
  orders: `${API_BASE_URL}/orders`,
};

// Xano endpoints (commented out)
// const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38';
// export const XANO_ENDPOINTS = {
//   products: `${XANO_BASE_URL}/product`,
//   categories: `${XANO_BASE_URL}/category`,
//   orders: `${XANO_BASE_URL}/order`,
// };
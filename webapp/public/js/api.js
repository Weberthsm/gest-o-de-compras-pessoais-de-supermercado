const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || 'http://localhost:3000';

async function handleResponse(response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && payload.error ? payload.error : 'Erro inesperado ao comunicar com a API.';
    throw new Error(message);
  }
  return payload;
}

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`, {
    mode: 'cors',
  });
  return handleResponse(response);
}

export async function addProduct(product) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
    mode: 'cors',
  });
  return handleResponse(response);
}

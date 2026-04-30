const API_URL = 'http://localhost:3001/docentes';

export const docenteService = {
  getAll: async () => {
    const response = await fetch(API_URL);
    return await response.json();
  },
  create: async (payload) => {
    return await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },
  update: async (id, payload) => {
    return await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },
  delete: async (id) => {
    return await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  }
};  
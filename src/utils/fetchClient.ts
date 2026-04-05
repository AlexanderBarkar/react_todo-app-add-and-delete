const BASE_URL = 'https://mate.academy/students-api';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: Method = 'GET',
  data?: unknown,
): Promise<T> {
  return fetch(BASE_URL + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: unknown) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

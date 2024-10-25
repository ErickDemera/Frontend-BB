import { TipoContenido } from './../../utils/common/constants/ContentType';




const headers = {
"Content-Type": TipoContenido.APPLICATION_JSON
};

const get = async <T>(url: string, customHeaders = {}) => {
  const response = await fetch(url, {
    method: "GET",
    headers: customHeaders || headers,
  });
  return (await response.json()) as T;
};

const post = async <T>(url: string, body: any, customHeaders: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: customHeaders || headers,
    body: body,
  });
  return (await response.json()) as T;
};

const put = async <T>(url: string, body: any) => {
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body,
  });
  return (await response.json()) as T;
};

const _delete = async <T>(url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });
  return (await response.json()) as T;
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
  headerBase: headers,
};

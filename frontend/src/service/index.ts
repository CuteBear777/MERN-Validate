import axios, { isAxiosError } from "axios";

export type ApiResponse = {
  success: true,
  data: any
} | {
  success: false,
  message: string;
}

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("token");
        config.headers['authorization'] = token;

        return config;
    }
)

const handleError = (err): {
  success: false,
  message: string
} => {
  if (isAxiosError(err)) {
    if (err.response) {
      return {
        success: false,
        message: err.response.data.message
      }
    }
    if (err.request) {
      return {
        success: false,
        message: err.request.data.message
      }
    }
  }

  return {
    success: false,
    message: err
  }
}

export const apiGet = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(url);
    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return handleError(err);
  }
}

export const apiPost = async (url: string, data: any): Promise<ApiResponse> => {
  try {
    const response = await api.post(url, data);
    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return handleError(err)
  }
}

export const apiPut = async (url: string, data: unknown): Promise<ApiResponse> => {
  try {
    const response = await api.put(url, data);
    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return handleError(err)
  }
}
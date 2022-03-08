import globals from "./globals"
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"

export default class AxiosDecorator {
  private readonly baseUrl: string

  public axios: AxiosInstance

  constructor() {
    this.baseUrl = API_URL

    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      withCredentials: true
    })
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<any> {
    const url = config.url
    return this.axios.request(config)
      .catch((error) => { AxiosDecorator.formatError(error, url) })
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.get(url, config)
      .catch((error) => { AxiosDecorator.formatError(error, url) })
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig, errorHandler?): Promise<any> {
    return this.axios.post(url, data, config)
      .catch((error) => {
        if(!errorHandler) {
          AxiosDecorator.formatError(error, url)
        }
        else {
          return errorHandler(error)
        }
      })
  }

  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.patch(url, data, config)
      .catch((error) => { AxiosDecorator.formatError(error, url) })
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.delete(url, config)
      .catch((error) => { AxiosDecorator.formatError(error, url) })
  }

  private static formatError(error, url) {
    error.message = `Network error ${url}`
    console.log(error.message)
    throw error
  }

}

import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import RequestServer from "./request.server";

export interface IRequestOption {
  /** 是否重试请求 */
  retry?: boolean;
  /** 最大重试次数 */
  retryMaxCount?: number;
  /** 请求头设置 */
  headers?: AxiosRequestHeaders;
}

interface IServerList {
  /** fetch请求 */
  Put: TServerFunction;
  /** fetch请求 */
  Get: TServerFunction;
  /** post请求 */
  Post: TServerFunction;
  /** delete请求 */
  Delete: TServerFunction;
  /** update请求 */
  Update: TServerFunction;
  /** 设置请求拦截器 */
  setBaseResquestInterceptors: (baseConfig: (config: AxiosRequestConfig) => AxiosRequestConfig) => void;
  /** 设置响应拦截器 */
  setBaseResponseInterceptors: <T = any>(interceptor: (response: T) => Promise<any>) => void;
}

type TRequestFunction = (url: string, data?: any, method?: string, config?: IRequestOption) => Promise<any>
type TServerFunction<ReqDto = any, ResDto = any> = (url: string, data?: ReqDto, config?: IRequestOption) => Promise<ResDto>

export default (): IServerList => {
  const server: TRequestFunction = async (url, data = {}, method, config) => {
    return new Promise((resolve, reject) => {
      const headers = {'Content-type': 'application/json;charset=UTF-8', ...config?.headers}

      RequestServer({url, method, data, headers}).then(resolve).catch(err => {
        if (err?.message?.includes('request:fail')) {
          // useToast().error('网络链接中断！')
        }

        reject(err)
      })
    });
  }

  const serverList: IServerList = {
    Get:  (url, data, config) => server(url, data, 'get', config),
    Put:  (url, data, config) => server(url, data, 'put', config),
    Post:   (url, data, config) => server(url, data, 'post', config),
    Delete: (url, data, config) => server(url, data, 'delete', config),
    Update: (url, data, config) => server(url, data, 'update', config),
    setBaseResquestInterceptors: (createBaseConfig) => {
      RequestServer.interceptors.request.use(async config => {
        const baseConfig = createBaseConfig(config)
        config = {...config, ...baseConfig}

        return config
      })
    },
    setBaseResponseInterceptors: (interceptor) => {
      RequestServer.interceptors.response.use(interceptor as any)
    }
  }

  return serverList
}

import requestConfig from "./request.config"
import Axios from "axios"

/** axios实例 */
const RequestServer = Axios.create({
  baseURL: requestConfig.baseURL,
  timeout: requestConfig.timeout
})

RequestServer.interceptors.request.use(config => {
  config.headers = config.headers || {}

  return config
})

export default RequestServer

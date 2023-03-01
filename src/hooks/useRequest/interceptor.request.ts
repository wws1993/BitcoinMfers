import requestClient from "./request.client";

const { setBaseResquestInterceptors } = requestClient()

setBaseResquestInterceptors(config => {
  return config
})

import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(defaults: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(defaults)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios

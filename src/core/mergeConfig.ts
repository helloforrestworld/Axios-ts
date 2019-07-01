import { AxiosRequestConfig } from '../types'

let strategies = Object.create(null)

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strategy(va1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrategy(va1: any, val2: any): any {
  //
}

const strategyFromVal2 = ['url', 'params', 'data']

strategyFromVal2.forEach(key => {
  strategies[key] = fromVal2Strategy
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}

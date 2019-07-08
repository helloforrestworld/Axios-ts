import axios from '../../src/index'
import { AxiosTransformer } from '../../src/types'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})


axios({
  transformRequest: [...(axios.defaults.transformRequest as AxiosTransformer[]), function (data, headers) {
    headers.a = 1
    return data
  }],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})

const instance = axios.create({
  transformRequest: [...(axios.defaults.transformRequest as AxiosTransformer[]), function (data, headers) {
    headers.a = 'create_a'
    return data
  }],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 'create_b'
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
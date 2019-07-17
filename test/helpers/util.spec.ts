import {
  isDate,
  isObject,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge,
  isAbsoluteURL,
  combineURL,
  isURLSameOrigin,
  resolveURL
} from '../../src/helpers/util'

describe('helpers: util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate Object', () => {
      expect(isObject({})).toBeTruthy()
      expect(isObject(new Date())).toBeTruthy()
      expect(isObject(new Map())).toBeTruthy()
      expect(isObject([])).toBeTruthy()
      expect(isObject(null)).toBeFalsy()
      expect(isObject(1)).toBeFalsy()
      expect(isObject(undefined)).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=a&bar=2')).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend properties', () => {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }
      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(a.foo).toBe(undefined)
      expect(a.bar).toBe(undefined)
      expect(b.bar).toBe(undefined)
      expect(c.foo).toBe(undefined)
    })

    test('should deepMerge properties', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      })
    })

    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })

      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })

  describe('isAbsoluteURL', () => {
    test('should validate absoluteURL', () => {
      const url = 'baidu.com'
      expect(isAbsoluteURL(url)).toBeFalsy()

      const url2 = 'www.baidu.com'
      expect(isAbsoluteURL(url2)).toBeFalsy()

      const url3 = '//www.baidu.com'
      expect(isAbsoluteURL(url3)).toBeTruthy()

      const url4 = 'https://www.baidu.com'
      expect(isAbsoluteURL(url4)).toBeTruthy()
    })
  })

  describe('combineURL', () => {
    describe('normal combine', () => {
      test('baseURL, relativeURL all got', () => {
        const baseURL = 'https://www.baidu.com/api'
        const relativeURL = '/abc/a'
        expect(combineURL(baseURL, relativeURL)).toBe(baseURL + relativeURL)
      })
    })

    describe('special combine', () => {
      test('should remove the rest of /', () => {
        const baseURL = 'https://www.baidu.com/api/'
        const relativeURL = '/abc/a'
        expect(combineURL(baseURL, relativeURL)).toBe('https://www.baidu.com/api/abc/a')
      })

      test('should return baseURL while relativeURL is undefined', () => {
        const baseURL = 'https://www.baidu.com/api/'
        const relativeURL = ''
        expect(combineURL(baseURL, relativeURL)).toBe('https://www.baidu.com/api/')
      })
    })
  })

  describe('isURLSameOrigin', () => {
    const requestURL = 'http://localhost/api/b'
    test('should be the same origin', () => {
      expect(isURLSameOrigin(requestURL)).toBeTruthy()
    })

    const requestURL2 = 'http://www.baidu.com/api/b'
    test('should not be the same origin', () => {
      expect(isURLSameOrigin(requestURL2)).toBeFalsy()
    })
  })

  describe('resolveURL', () => {
    test('should correct output the protocol and host', () => {
      const url = 'https://www.baidu.com'
      const urlInfo = resolveURL(url)

      expect(urlInfo.host).toBe('www.baidu.com')
      expect(urlInfo.protocol).toBe('https:')
    })
  })
})

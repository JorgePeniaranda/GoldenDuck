import {
  checkAlphanumeric,
  checkOnlyLetters,
  checkPasswordStrong,
  randomAlphanumeric,
} from '.'

const random = randomAlphanumeric(10)

describe('Random Alphanumeric', () => {
  it('random should be a function', () => {
    expect(typeof randomAlphanumeric).toEqual('function')
  })

  it('random must be return string', () => {
    expect(typeof random).toEqual('string')
  })

  it('random should return a string of 10 characters', () => {
    expect(random.length).toEqual(10)
  })

  it('random should return an alphanumeric string', () => {
    const alphanumeric = /^[0-9a-zA-Z]+$/
    expect(alphanumeric.test(random)).toEqual(true)
  })
})

describe('Check Alphanumeric', () => {
  it('checkAlphanumeric should be a function', () => {
    expect(typeof checkAlphanumeric).toEqual('function')
  })

  it('checkAlphanumeric should return true if the value is alphanumeric', () => {
    expect(checkAlphanumeric('test')).toEqual(true)
  })

  it('checkAlphanumeric should return false if the value is not alphanumeric', () => {
    expect(checkAlphanumeric('test_')).toEqual(false)
  })
})

describe('Check Only Letters', () => {
  it('checkOnlyLetters should be a function', () => {
    expect(typeof checkOnlyLetters).toEqual('function')
  })

  it('checkOnlyLetters should return true if the value is only letters', () => {
    expect(checkOnlyLetters('test')).toEqual(true)
  })

  it('checkOnlyLetters should return false if the value is not only letters', () => {
    expect(checkOnlyLetters('test1')).toEqual(false)
  })
})

describe('Check Password Strong', () => {
  it('checkPasswordStrong should be a function', () => {
    expect(typeof checkPasswordStrong).toEqual('function')
  })

  it('checkPasswordStrong should return true if the value is a strong password', () => {
    expect(checkPasswordStrong('Test@Test123')).toEqual(true)
  })

  it('checkPasswordStrong should return false if the value is not a strong password', () => {
    expect(checkPasswordStrong('test')).toEqual(false)
  })
})

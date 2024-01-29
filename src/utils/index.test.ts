import { randomAlphanumeric } from '.'

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

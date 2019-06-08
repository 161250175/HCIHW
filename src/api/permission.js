import axios from 'axios'
axios.defaults.timeout = 10000
let base = '/canteen'
export const GetConfirmCode = params => {
  return axios.post(`${base}/member/getconfirmcode`,params)
}
export const SignUp = params => {
  return axios.post(`${base}/member/signup`,params)
}
export const LogIn = params => {
  return axios.post(`${base}/member/login/nor`,params)
}

import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'
// const TOKEN = ""
const ls = JSON.parse(localStorage.getItem("persist:root"))
const TOKEN = ls?.user ? JSON.parse(ls.user).currentUser?.accessToken : ""
export const publicRequest = axios.create({
    baseURL: BASE_URL,

})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers : {token : 'Bearer ' +TOKEN}
})
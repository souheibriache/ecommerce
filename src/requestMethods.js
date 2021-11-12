import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'
const ls = JSON.parse(localStorage.getItem("persist:root"))
export const TOKEN = ls?.user ? JSON.parse(ls.user).currentUser?.accessToken : ""
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODc1YmFmYWFhNjM5NWFkODQxOTk2ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjYwOTgwNCwiZXhwIjoxNjM2ODY5MDA0fQ.lXNlFD6c3b9jsJKW6b53jQJ4U6_C2_-wUE4neR5mKo8'
console.log('TOKEN' , TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL,

})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers : {token : `Bearer ${TOKEN}`}
})
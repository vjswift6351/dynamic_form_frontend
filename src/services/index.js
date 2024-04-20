import axios from 'axios';

const baseUrl = 'https://dynamic-form-backend-ruddy.vercel.app/api/v1/dynamicform'

export const getUser = () => {
    return axios.get(`${baseUrl}/getuser`)
}

export const addUser = (obj) => {
    return axios.post(`${baseUrl}/adduser`, obj)
}

export const updateUser = (id,obj) => {
    return axios.put(`${baseUrl}/updateuser/${id}`, obj)
}

export const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/deleteuser/${id}`)
}

export const getForm = () => {
    return axios.get(`${baseUrl}/getforms`)
}

export const addForm = (obj) => {
    return axios.post(`${baseUrl}/addforms`, obj)
}

export const updateForms = (id,obj) => {
    return axios.put(`${baseUrl}/updateforms/${id}`, obj)
}

export const deleteForms = (id) => {
    return axios.delete(`${baseUrl}/deleteforms/${id}`)
}
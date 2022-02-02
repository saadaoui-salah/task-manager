
const BASE_URL = "https://task-manager-api-f.herokuapp.com/api"

const Get = async (path) => {
    const token = localStorage.getItem('token')
    let response
    await fetch(BASE_URL + path, {
        method: 'GET',
        headers: {
            'content-type': 'applivation/json',
            'Authorization': `bareer ${token}`
        }
    })
    .then(response => response.json())
    .then(results => response = results)
    console.log(response)
    return response
}

const Post = async (data, path) => {
    const token = localStorage.getItem('token')
    let response
    await fetch(BASE_URL + path, {
        method: 'POST',
        headers: {
            'content-type': 'applivation/json',
            'Authorization': `bareer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(results => response = results)
    console.log(response)
    return response
}

export const ListEngagment = (engagmentId) => {
    return Get(`/engagment/egagment-listing/${engagmentId}/`) 
}

export const UserSearch = (keyword) => {
    return Get(`/user/search/keyword/${keyword}/`) 
}

export const CreateEngagment = (data) => {
    return Post(data, '/engagment/create-new-engagment/') 
}

export const Login = (data) => {
    return Post(data, '/user/login/') 
}

export const useListEngagmentByTask = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/tasks/`) 
}

export const GetTask = (engagmentID, taskID) => {
    return Get(`/user/engagment/${engagmentID}/tasks/${taskID}/`) 
}

export const ListEvidence = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/evidence/all/`) 
}

export const UploadEvidence = (engagmentID, data) => {
    return Post(data, `/user/engagment/${engagmentID}/evidence/upload/`) 
}

export const CreateEvidence = (engagmentID, data) => {
    return Post(data, `/user/engagment/${engagmentID}/evidence/create/`) 
}
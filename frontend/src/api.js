
//const BASE_URL = "https://task-manager-api-f.herokuapp.com/api"
const BASE_URL = "http://127.0.0.1:8000/api"

const Get = async (path) => {
    const token = localStorage.getItem('token')
    let response
    await fetch(BASE_URL + path, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
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
            'content-type': 'application/json',
            'Authorization': `bareer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(results => response = results)
    console.log(response)
    return response
}

export const ListEngagment = () => {
    return Get('/engagment/engagment-listing/') 
}//done fixed

export const UserSearch = (keyword) => {
    return Get(`/user/search/keyword/${keyword}/`) 
} // done

export const CreateEngagment = (data) => {
    return Post(data, '/engagment/create-new-engagment/') 
} // done

export const Login = (data) => {
    return Post(data, '/user/login/') 
}// done fixed

export const ListTasksGroupByEngagment = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/task-group/`) 
} // done

export const ListTasksByTaskGroup = (taskGroupID) => {
    return Get(`/user/task-group/${taskGroupID}/tasks/`) 
} // done

export const GetTask = (engagmentID, taskID) => {
    return Get(`/user/engagment/${engagmentID}/tasks/${taskID}/`) 
} // done

export const ListEvidence = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/evidence/all/`) 
} // done

export const UploadEvidence = (engagmentID, data) => {
    return Post(data, `/user/engagment/${engagmentID}/evidence/upload/`) 
}

export const CreateEvidence = (engagmentID, data) => {
    return Post(data, `/user/engagment/${engagmentID}/evidence/create/`) 
}
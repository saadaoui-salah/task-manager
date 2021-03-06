
//const BASE_URL = "https://task-manager-api-f.herokuapp.com/api"
const BASE_URL = "http://127.0.0.1:8000/api"

const Get = async (path) => {
    const token = localStorage.getItem('token')
    let response
    await fetch(BASE_URL + path, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(results => response = results)
    return response
}

const Post = async (data, path) => {
    const token = localStorage.getItem('token')
    let response
    await fetch(BASE_URL + path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(results => response = results)
    return response
}

export const ListEngagment = () => {
    return Get('/engagment/engagment-listing/') 
}//done fixed

export const Login = (data) => {
    return Post(data, '/user/login/') 
}// done fixed

export const ListTaskGroups = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/task-group/`) 
} // done fixed

export const ListTasks = (groupID) => {
    return Get(`/user/task-group/${groupID}/tasks/`) 
} // done fixed

export const GetTask = (taskID) => {
    return Get(`/user/tasks/${taskID}/`) 
} // done fixed

export const GetEvidenceByTask = (taskID) => {
    return Get(`/user/tasks/${taskID}/evidence-list/`) 
} // done fixed

export const UserSearch = (keyword) => {
    if (keyword){
        return Get(`/user/search/keyword/${keyword}/`) 
    }
} // done fixed

export const CreateEngagment = (data) => {
    return Post(data, '/engagment/create-new-engagment/') 
} // done fixed

export const ListEvidence = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/evidence/all/`) 
} // done

export const UploadEvidence = (engagmentID, data) => {
    return Post(data, `/user/engagment/${engagmentID}/evidence/upload/`) 
}

export const CreateTaskGroup = (data) => {
    return Post(data, '/user/create-task-group/') 
}

export const CreateTask = (data) => {
    return Post(data, '/user/create-task/') 
}

export const CreateEvidence = (sectionID, data) => {
    return Post(data, `/user/section/${sectionID}/evidence/create/`) 
}

export const ListContrebuters = (engagmentID) => {
    return Get(`/user/engagment/${engagmentID}/contrebuters/`) 
}

export const UpdateContrebuter = (data, id) => {
    return Post(data, `/user/evidence/${id}/contrebuters/update`) 
}
export const CreateSection = (data, id) => {
    return Post(data, `/user/task/${id}/section/`) 
}

export const ListSection = (id) => {
    return Get(`/user/task/${id}/section/`) 
}

export const EvidenceBySection = (id) => {
    return Get(`/user/section/${id}/evidence/`) 
}

const URL = 'http://127.0.0.1:3000/api/v1/'


const methodGET = (type) => fetch(`${URL}${type}`, {
    headers: {
        'content-type':'application/json; charset=utf-8'
    },
})
.then(e => e.json())


const methodPOST  = (type, body={}) => fetch(`${URL}${type}`, {
    method: 'POST',
    headers: {
        'content-type':'application/json; charset=utf-8'
    },
    body: JSON.stringify({
        ...body,
    })
})
.then(e => e.json())


const id = JSON.parse(localStorage.getItem('user'))?.id || '1'


export const getUsers = () => methodGET('get_users')
export const getUser = () => methodGET(`users/get_user/${id}`)
export const getUserFiles = () => methodGET(`users/${id}/files`)

export const authUser = (login, password) => methodPOST(`users/auth_user`, {login, password})
export const checkAuth = (token) => methodPOST('users/check_auth', {token})


// короче я писал Артуру, она сказал что херня все это надо делать на react + redux, а иначе ну мутотень. Я ему там показал что намутил, он такой ну типо правильно, но 
import { useLocation, Navigate } from 'react-router-dom'
// import { useAuth } from '../hook/useAuth'

const RequierAuth = ({ children }) => {

    const loction = useLocation()
    // const { user } = useAuth()
    
    if(localStorage.getItem('user') == '') {
        return <Navigate to={'/auth'} state={{from: loction}} />
    }

    return children
}

export { RequierAuth }
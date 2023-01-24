import { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const signin = (newUser, cb) => {
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        cb()
    }

    const signout = (cb) => {
        setUser(null)
        localStorage.removeItem('user')
        cb()
    }

    const value = {user, signin, signout}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 
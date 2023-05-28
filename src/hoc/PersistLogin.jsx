import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { useRefreshToken } from '../hook/useRefreshToken'
import { useLocalStorage } from '../hook/useLocalStorage'
import { Loader } from '../components/UI/Loader/Loader'


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const [persist] = useLocalStorage('persist', false)

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.error(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    const content = (<>
        {
            !persist
                ? <Outlet />
                : isLoading
                    ? <Loader />
                    : <Outlet />
        }
    </>)

    return content
}

export { PersistLogin }
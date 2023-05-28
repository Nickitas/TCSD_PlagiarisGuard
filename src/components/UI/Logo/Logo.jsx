import { useState, useEffect } from 'react'
import { Logo } from '../../svg.module'
import classes from './logo.module.scss'


const LogoComponent = ({ text, delay }) => {
    const [isTop, setIsTop] = useState(true)
    const [displayText, setDisplayText] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
            if (scrollTop === 0) {
                setIsTop(true)
            } else {
                setIsTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handlerClick = () => {
        if (isTop) {
            window.scrollTo({
                top: document.body.scrollHeight * 1000,
                left: 0,
                behavior: 'smooth',
            })
            setIsTop(false)
        } else {
            window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          setIsTop(true);
        }
    }

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayText(text.slice(0, i))
                i++
            } else {
                clearInterval(interval)
            }
        }, delay)
    
        return () => clearInterval(interval)
    }, [text, delay])


    
    const logo = (
        <div className={classes.logo} onClick={handlerClick}>
            <Logo/>
            <span>{ displayText }</span>
        </div>
    )

    return logo
}

export { LogoComponent }
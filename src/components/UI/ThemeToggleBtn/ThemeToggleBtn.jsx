import { useState } from 'react'
import { SunIcon, MoonIcon } from '../../svg.module'
import classes from './theme_toggle_btn.module.scss'


const ThemeToggleBtn = () => {

    const [currentTheme, setCurrentTheme] = useState(document.querySelector('html').dataset.theme)

    const handlertoggleTheme = () => {
        document.querySelector('html').setAttribute('data-theme', currentTheme)
        localStorage.setItem('theme', currentTheme)
        setCurrentTheme(e => !e)
    }

    return (
        <div className={classes.theme_toggle_btn} onClick={handlertoggleTheme}>
            { 
                currentTheme ? <SunIcon/> : <MoonIcon/>
            }
        </div>
    )
}

export { ThemeToggleBtn }
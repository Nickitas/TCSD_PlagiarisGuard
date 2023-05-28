import { useTheme } from '../../../hook/useTheme'
import { SunIcon, MoonIcon } from '../../svg.module'
import classes from './theme_toggle_btn.module.scss'

const ThemeToggleBtn = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className={classes.theme_toggle_btn} onClick={toggleTheme}>
            { theme === 'dark' ? <SunIcon /> : <MoonIcon /> }
        </div>
    )
}

export { ThemeToggleBtn }
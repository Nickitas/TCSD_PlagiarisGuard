import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { ThemeToggleBtn } from '../UI/ThemeToggleBtn/ThemeToggleBtn'
import { Logo, MenuIcon, CloseIcon, ProfileIcon, ChartIcon, HomeIcon, CheckIcon, Share } from '../svg.module' 
import classes from './nav.module.scss'


const menuList = [
    {
        text: 'Главная',
        link: '/',
        icon: <HomeIcon/>
    },
    {
        text: 'Проверить',
        link: '/cabinet',
        icon: <CheckIcon/>
    },
    {
        text: 'Статистика',
        link: '/statistics',
        icon: <ChartIcon/>
    },
    {
        text: 'Профиль',
        link: '/profile',
        icon: <ProfileIcon/>
    },
    {
        text: 'О системе',
        link: '/about',
        icon: <Share/>
    }
]

const Nav = () => {

    const { user, signout } = useAuth()
    const navigate = useNavigate()
    const handlerLogout = () => {
        signout(() => navigate('/auth', {replace: true}))
        setMenuOpen(false)
    }

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className={classes.nav}>
            <div className='container'>
                <div className={classes.row}>

                    <div className={classes.list}>
                        <Link to={'/'}>
                            <div className={classes.brand}>
                                <Logo />
                                <h2>ДГТУ</h2>
                            </div>
                        </Link>

                        <ThemeToggleBtn  />
                    
                    </div>

                    {user && (
                        <div className={classes.list}>
                            <Link to={'/profile'}>
                                <span>{ user.name }</span>
                                <ProfileIcon/>
                            </Link>

                            <div className={classes.menu_btn} onClick={() => setMenuOpen(e => !e)}>
                                { menuOpen ? <CloseIcon/> : <MenuIcon/> }
                            </div>

                            <div className={`${classes.dropdown} ${menuOpen && classes.open}`}>
                                <div className='container'>
                                    <div className={classes.col}>
                                        {
                                            menuList.map((item, key) => (
                                                <Link key={key} to={item.link} onClick={() => {
                                                    setMenuOpen(false)
                                                }}>
                                                    {item.icon}
                                                    {item.text}
                                                </Link>
                                            ))
                                        }
                                        <div className={classes.exit_btn} onClick={handlerLogout}>
                                            выход
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                </div>  
            </div>
        </nav>
    )
}

export default Nav
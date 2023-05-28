import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, CloseIcon  } from '../../svg.module'
import classes from './menu_button.module.scss'


const MenuButton = ({ items }) => {
    const isAuth = true
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (open && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleOutsideClick)
        
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    
    }, [])

    const handleOpenMenu = () => {
        setOpen(prev => !prev)
    }

    const menu_button = (
        <div className={classes.menu_button_wrapper}>
            <div className={classes.menu_button} onClick={handleOpenMenu}>
                { open ? <CloseIcon /> : <MenuIcon /> }
            </div>
            <div ref={dropdownRef} className={`${classes.dropdown} ${open && classes.open}`}>
                <div className={classes.list}>
                {                       
                    items
                        .filter(item => !item.isPrivate || isAuth)
                            .map((item, index) => (
                                <div key={index} className={classes.item} onClick={() => setOpen(false)}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )

    return menu_button
}

export { MenuButton  }
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import { LogoComponent } from '../UI/Logo/Logo'
import { Button } from '../UI/Button/Button'
import { MenuButton } from '../UI/MenuButton/MenuButton'
import { ThemeToggleBtn } from '../UI/ThemeToggleBtn/ThemeToggleBtn'
import { CaseIcon, ProfileIcon, ChartIcon, CallIcon, BoockIcon, UserOk, UserEdit, LicenseIcon, SecurityUserIcon, HeartTickIcon, ForbiddenIcon } from '../svg.module' 
import classes from './nav.module.scss'


const Nav = () => {
    const navigate = useNavigate()

    const items = [
        {
            title: 'Личный кабинет',
            icon: <CaseIcon/>,
            path: '/',
            isPrivate: true
        },
        {
            title: 'Моя статистика',
            icon: <ChartIcon/>,
            path: '/statistics',
            isPrivate: true
        },
        {
            title: 'Профиль',
            icon: <ProfileIcon />,
            path: '/profile',
            isPrivate: true
        },
        {
            title: 'О системе',
            icon: <BoockIcon/>,
            path: '/about',
            isPrivate: false
        },
        {
            title: 'Контакты',
            icon: <CallIcon/>,
            path: '/contacts',
            isPrivate: true
        },
        {
            title: 'Пользовательское соглашение',
            icon: <UserOk/>,
            path: '/terms_of_use',
            isPrivate: true
        },
        {
            title: 'Соглашение об обработке персональных данных',
            icon: <UserEdit/>,
            path: '/agreement_of_personal_data',
            isPrivate: false
        },
        {
            title: 'Лицензия',
            icon: <LicenseIcon/>,
            path: '/license',
            isPrivate: true
        },
        {
            title: 'Политика безопасности',
            icon: <SecurityUserIcon/>,
            path: 'security_policy',
            isPrivate: false
        },
        {
            title: 'Помочь проекту',
            icon: <HeartTickIcon/>,
            path: '/help_the_project',
            isPrivate: true
        },
        {
            title: 'Выйти из аккаунта',
            icon: <ForbiddenIcon/>,
            path: '',
            isPrivate: true
        }
    ]

    const nav = (
        <nav className={classes.nav}>
            <div className='container'>
                <div className={classes.row}>

                    <LogoComponent 
                        text={'Антиплагиат ДГТУ'}
                        delay={100}
                    />

                    <div className={classes.controls}>
                        <Button accent onClick={() => navigate('/check_document')}>
                            Начать
                        </Button>
                        <ThemeToggleBtn />
                        <MenuButton
                            items={items}
                        />
                    </div>

                </div>
            </div>
        </nav>
    )

    return nav
}

export { Nav }
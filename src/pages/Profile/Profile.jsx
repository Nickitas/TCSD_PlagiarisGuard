import { useState, useEffect } from 'react'
import { Button } from '../../components/UI/Button/Button'
import classes from './profile.module.scss'


const Profile = () => {
    const [user, setUser] = useState([])
    
    useEffect(() => {

    }, [])


    return (
        <section className={classes.profile}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header}>
                        <h1 className='title'>Профиль</h1>
                        <p className='disc'>Здесь Вы можете редактировать данные вашего аккаунта.</p>
                    </div>
                    <div className={classes.controls}>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
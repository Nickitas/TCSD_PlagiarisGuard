import { useState, useEffect } from 'react'
import { Input } from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/Button'
import { BackLink } from '../../components/UI/BackLink/BackLink'
import { ProfileIcon, PaperAirplaneIcon } from '../../components/svg.module'
import { getUser } from '../../components/Fetch'
import classes from './profile.module.scss'


const Profile = () => {
    
    const [user, setUser] = useState([])
    
    useEffect(() => {
        getUser().then(e => {
            setUser(e)
        })
    }, [])


    return (
        <section className={classes.profile}>
            <div className='container'>

                <BackLink  />

                <div className={classes.head}>
                    <h1 className='title'>Профиль</h1>
                    <ProfileIcon/>
                </div>

                <div className={classes.row}>
                    <div className={classes.block}>
                        <h2>Учетные данные</h2>
                        <Input lable='Имя'
                            value={user.name}
                        />
                        <Input lable='Фамилия'
                            value={user.surname}
                        />
                        <Input lable='Отчество'
                            value={user.lastname}
                        />
                        <Input lable='Отдел'
                            value={user.subunit}
                        />
                    </div>
                    <div className={classes.block}>
                        <h2>Почта</h2>
                        <Input lable='E-mail'
                            value={user.email}
                        />
                        <h2>Номер телефона</h2>
                        <Input lable='Номер телефона'
                            value={user.phone}
                        />
                        <Button icon={<PaperAirplaneIcon/>}>
                            Запросить смену пароля
                        </Button>
                        <p>Дата регистрации {user.reg}</p>
                        <p>Вы заблокированы: {`${user.block}`}</p>
                        <p>Всего файлов: {`${user.files?.length || 'файлов нет'}`}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
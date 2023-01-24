import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/UI/Input/Input'
import { InputPassword } from '../../components/UI/InputPassword/InputPassword'
import { Button } from '../../components/UI/Button/Button'
import { OtherWays } from '../../components/UI/OtherWays/OtherWays'
import dstu from '../../../public/dstu.svg'
import { DangerIcon } from '../../components/svg.module'
import { authUser } from '../../components/Fetch'
import classes from './auth.module.scss'


const Auth = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'
    const { signin } = useAuth()

    const authorization = (data) => {
        authUser(data.email, data.pass).then(e => {
            if(e.state) {                
                const user = {
                    id: e.body._id,
                    surname: e.body.surname,
                    name: e.body.name,
                    lastname: e.body.lastname,
                    email: e.body.email,
                    phone: e.body.phone,
                    login: e.body.login,
                    subunit: e.body.subunit,
                    rules: e.body.rules,
                    files: e.body.files,
                    reg: e.body.reg,
                    block: e.body.block,
                    theme: e.body.theme
                }
                signin(user, () => navigate(fromPage, {replace: true}))
                reset()
            }
            else {
                alert(e.error)
            }
        })
    }

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ 'mode': 'onBlur' })

    return (
        <section className={classes.auth}>
            <div className={classes.row}>

                <div className={classes.form_wrapp}>

                    <h1 className={classes.title}>Войти</h1>
                    
                    <form className={classes.form} onSubmit={handleSubmit(authorization)}>
                        <div className={classes.head}>
                            <label>E-mail</label>
                            <Input 
                                lable='E-mail' 
                                {
                                    ...register('email', {
                                        required: 'Поле обязательно к заполнению!',
                                        pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                                    })
                                }
                            />
                            <div className={classes.errors_box}>
                                {
                                    errors?.email && (
                                        <div className={classes.mess}>
                                            <DangerIcon/> 
                                            <span>
                                                {errors?.email?.message || 'Неверный формат логина!'}
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                            <label>Пароль</label>
                            <InputPassword 
                                lable='Пароль'
                                {
                                    ...register('pass', {
                                        required: 'Поле обязательно к заполнению!',
                                        minLength: 6
                                    })
                                }
                            />
                            <div className={classes.errors_box}>
                                {
                                    errors?.pass && (
                                        <div className={classes.mess}>
                                            <DangerIcon/> 
                                            <span>
                                                {errors?.pass?.message || 'Неверный формат пароля!'}
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                            <Link>
                                Забыли пароль?
                            </Link>
                        </div>
                        <div className={classes.footer}>
                            <Button type='submit' disabled={!isValid}>
                                Войти
                            </Button>
                            <Link to={'/reg'}>
                                Зарегистрироваться
                            </Link>
                        </div>
                        <OtherWays />
                    </form>
                </div>

                <div className={classes.banner}>
                    <div className={classes.emblem}>
                        <img src={dstu} />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Auth
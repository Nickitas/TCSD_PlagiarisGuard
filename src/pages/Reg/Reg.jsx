
import { useState, useEffect, createRef, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Input } from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/Button'
import { OtherWays } from '../../components/UI/OtherWays/OtherWays'
import dstu from '../../../public/dstu.svg'
import { DangerIcon } from '../../components/svg.module'
import classes from './reg.module.scss'


const Reg = () => {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ 'mode': 'onBlur' })


    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        reset()
    }


    return (
        <section className={classes.reg}>
            <div className={classes.row}>

                <div className={classes.form_wrapp}>

                    <h1 className={classes.title}>Зарегистрироваться</h1>
                    
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                            <label>ФИО</label>
                            <Input
                                lable='ФИО (через пробел)'
                                {
                                    ...register('fio', {
                                        required: 'Поле обязательно к заполнению!',
                                        pattern: /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)? [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$/,
                                        min: 6
                                    })
                                }
                            />
                            <div className={classes.errors_box}>
                                {
                                    errors?.fio && (
                                        <div className={classes.mess}>
                                            <DangerIcon/> 
                                            <span>
                                                {errors?.pass?.message || 'Неверный формат ФИО!'}
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={classes.footer}>
                            <Button type='submit' disabled={!isValid}>
                                Заригистрироваться
                            </Button>
                            <Link to={'/auth'}>
                                Авторизиваться
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

export default Reg
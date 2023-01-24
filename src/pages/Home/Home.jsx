import bg_dark from '../../assets/home_bg_dark.mp4'
import bg_light from '../../assets/home_bg_light.mp4'
import { BtnLink } from '../../components/UI/BtnLink/BtnLink'
import { CaseIcon } from '../../components/svg.module'
import classes from './home.module.scss'
import { useAuth } from '../../components/hook/useAuth'


const Home = () => {

    const { name, lastname, theme } = JSON.parse(localStorage.getItem('user'))
    const definingTheme = () => `http://localhost:5173/${theme ? bg_dark :bg_light }`

    return (
        <section className={classes.home}>
            <video autoPlay muted loop id='video'>
                <source src={definingTheme()} type='video/mp4'/>
            </video>
            <div className={classes.hero}>
                <div className={classes.baner}>
                    <div className='container'>
                        <div className={classes.col}>
                            <h1 className='title'>Добро пожаловать, {name} {lastname} !</h1>
                            <p className={classes.disc}><b>Антиплагиат ДГТУ<sup>®</sup></b> - инструмент проверки оригинальности научных и учебных работ в ЭБС ДГТУ</p>
                            <BtnLink icon={<CaseIcon/>} path={'/cabinet'}>
                                Перейти в кабинет
                            </BtnLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
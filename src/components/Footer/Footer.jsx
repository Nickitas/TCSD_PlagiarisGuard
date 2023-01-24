
import { Link } from 'react-router-dom'
import dstu from '../../../public/dstu.svg'
import classes from './footer.module.scss'

const Footer = () => {

    const printDate = () => {
        const dateNow = new Date().toJSON().slice(0, 4)

        if(dateNow == 2023) {
            return <time>{dateNow}</time>
        }
        else return <time>2023 - {dateNow}</time>
    }

    return (
        <footer className={classes.footer}>
            <div className='container'>
                <div className={classes.row}>

                <div className={classes.privacy_link}>
                    <Link to={'/privacy'}>
                        Соглашение об обработке персональных данных
                    </Link>
                </div>

                <a href='https://edu.donstu.ru/' className={classes.copywrite}>
                    <img src={dstu} />
                    <p>
                        <b>ДОНСКОЙ ГОСУДАРСТВЕННЫЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ</b><br/>
                        © {printDate()} г. 344000,Ростов-на-Дону, Площадь Гагарина 1
                    </p>
                </a>

                </div>
            </div>
        </footer>
    )
}

export default Footer
import { Link } from 'react-router-dom'
import dstu from '../../../public/dstu.svg'
import classes from './footer.module.scss'

const Footer = () => {

    const printDate = () => {
        const dateNow = new Date().toJSON().slice(0, 4)
        if (dateNow == 2023) {
            return <time>{dateNow}</time>
        }
        else return <time>2023 - {dateNow}</time>
    }

    const footer = (
        <footer className={classes.footer}>
            <div className='container'>
                <div className={classes.row}>

                    Footer
                </div>
            </div>
        </footer>
    )

    return footer
}

export { Footer }
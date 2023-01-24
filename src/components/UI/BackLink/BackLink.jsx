import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../svg.module'
import classes from './back_link.module.scss'


const BackLink = () => {
    
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    
    return (
        <div className={classes.back_link} onClick={goBack}>
            <ArrowLeftIcon/>
            <span>Назад</span>
        </div>
    )
}

export { BackLink }
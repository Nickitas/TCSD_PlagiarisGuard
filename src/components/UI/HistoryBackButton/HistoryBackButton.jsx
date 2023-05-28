import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../svg.module'
import classes from './history_back_button.module.scss'


const HistoryBackButton = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    
    const history_back_button = (
        <div className={classes.history_back_button} onClick={goBack}>
            <ArrowLeftIcon/>
        </div>
    )

    return history_back_button
}

export { HistoryBackButton }
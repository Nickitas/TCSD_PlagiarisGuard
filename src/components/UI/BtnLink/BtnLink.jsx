import { Link } from 'react-router-dom'
import classes from './btn_link.module.scss'


const BtnLink = ({ ...props }) => {

    return (
        <div className={classes.btn_link} >
            <div className={classes.icon}>
                { props.icon }
            </div>
            <Link to={props.path}>
                { props.children }
            </Link>
        </div>
    )
}

export { BtnLink }
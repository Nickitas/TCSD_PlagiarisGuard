import { LogoComponent } from '../Logo/Logo'
import dstu from '../../../../public/dstu.svg'
import classes from './double_logo.module.scss'

const DoubleLogo = () => {

    const double_logo = (
        <div className={classes.double_logo}>
            <LogoComponent 
                text={'DSTU PlagiarisGuard'}
                delay={100}
            />
            <img src={dstu} />
        </div>
    )

    return double_logo
}

export { DoubleLogo }
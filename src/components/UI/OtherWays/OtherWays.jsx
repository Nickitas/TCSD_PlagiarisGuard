

import { CoogleIcon } from '../../svg.module'
import classes from './other_ways.module.scss'


const ways = [
    {
        name: 'google',
        link: '',
        icon: <CoogleIcon/>
    }
]

const handlerWaySelected = () => {
    alert('Авторизация через Google еще не готова')
}

const OtherWays = () => {

    return (
        <div className={classes.other_ways}>
            <h6 className={classes.title}>
                Войти с использованием
            </h6>
            <div className={classes.ways}>
                {
                    ways.map((item, key) => (
                        <div key={key} className={classes.icon} onClick={handlerWaySelected}>
                            { item.icon }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export { OtherWays }

import classes from './progress_bar.module.scss'


const ProgressBar = ({ title, value }) => {

    const painColor = (title) => {
        let color = ''
        switch(title) {
            case 'Заимствования': color = 'red'; break;
            case 'Самоцитирования': color = 'blue'; break;
            case 'Цитирования': color = 'yellow'; break;
            case 'Оригинальность': color = 'green'; break;
            default: color = ''
        }

        return `${classes[color]}`
    }

    const progress_bar = (
        <div className={classes.progress_bar}>
            <h5 className={classes.title}>{ title }</h5>
            <div className={classes.progress}>
                <div className={`${classes.fill} ${painColor(title)}`} style={{width: value}}></div>
            </div>
            <h4 className={classes.value}>{`${value} %`}</h4>
        </div>
    )

    return progress_bar
}

export { ProgressBar }
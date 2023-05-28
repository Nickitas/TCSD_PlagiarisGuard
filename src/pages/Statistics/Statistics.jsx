

import classes from './statistics.module.scss'

const Statistics = () => {

    
    const statistics = (
        <section className={classes.statistics}>
             <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header}>
                        <h1 className='title'>Статистика</h1>
                        <p className='disc'>Здесь вы можете посмотреть общую сводку ваших работ.</p>
                    </div>
                    <div className={classes.controls}>

                    </div>
                </div>
            </div>
        </section>
    )

    return statistics
}

export default Statistics
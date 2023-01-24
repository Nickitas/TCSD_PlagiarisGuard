import classes from './loader.module.scss'


const Loader = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.spinner}>
                <div className={classes.circle}>
                    {
                        Array.from({length: 10}).map((_, key) => (
                            <span key={key} className={classes.line}></span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export { Loader }
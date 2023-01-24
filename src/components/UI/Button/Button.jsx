import classes from './button.module.scss'


const Button = ({ ...props }) => {
    
    return (
        <button className={classes.button} {...props}>
            <div className={classes.icon}>
                {props.icon}
            </div>
            <div className={classes.text}>
                { props.children }
            </div>        
        </button>
    )
}

export { Button }
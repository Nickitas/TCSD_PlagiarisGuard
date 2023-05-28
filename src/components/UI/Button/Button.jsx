import classes from './button.module.scss'

const Button = ({ ico, children, accent, red, disabled, onClick, ...props }) => {

    const button  = (
        <button className={classes.button}
            type={props.type}
            data-accent={accent}
            data-red={red}
            onClick={onClick}
            disabled={disabled}
        >
            { ico && ico }
            <span>
                { children }
            </span>
        </button>
    )

    return button  
}

export { Button  }
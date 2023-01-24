import { SearchIcon } from '../../svg.module'
import classes from './search_input.module.scss'

const SearchInput = ({ ...props }) => {

    return (
        <div className={classes.search}>
            <div className={classes.icon}>
                <SearchIcon/>
            </div>
            <input className={classes.input}
                {...props}
            />
        </div>
    )
}

export { SearchInput }
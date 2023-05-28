import { SearchIcon } from '../../svg.module'
import classes from './search_input.module.scss'

const SearchInput = ({ ...props }) => {

    const search_input = (
        <div className={classes.search}>
            <div className={classes.icon}>
                <SearchIcon/>
            </div>
            <input className={classes.input}
                {...props}
            />
        </div>
    )

    return search_input
}

export { SearchInput }
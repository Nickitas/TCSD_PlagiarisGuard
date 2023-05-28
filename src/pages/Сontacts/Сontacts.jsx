
import classes from './contacts.module.scss'

const Сontacts = () => {

    
    const contacts = (
        <section className={classes.contacts}>
             <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header}>
                        <h1 className='title'>Контакты</h1>
                        <p className='disc'>Здесь мы собрали для Вас всю нашу контактную информацию, которая может быть полезна.</p>
                    </div>
                    <div className={classes.controls}>

                    </div>
                </div>
            </div>
        </section>
    )

    return contacts
}

export default Сontacts
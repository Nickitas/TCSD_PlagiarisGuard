import { useState } from 'react'
import { UploadFile } from '../../components/UI/UploadFile/UploadFile'
import { UploadText } from '../../components/UI/UploadText/UploadText'
import classes from './check_document.module.scss'


const CheckDocument = () => {
    const [checkMode, setCheckMode] = useState('doc')

    const check_document = (
        <section className={classes.check_document}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header}>
                        <h1 className='title'>Проверка уникальности</h1>
                        <p className='disc'>
                            {
                                checkMode === 'doc'
                                    ? 'Вы можете загрузить сразу несколько документов. Они будут обробатываться в порядке очереди.'
                                    : 'Для проверки текста просто вставьте его в рабочию область.'
                            }
                        </p>
                    </div>

                    <div className={classes.frame}>
                        <div className={classes.tabs}>
                            <div className={`${classes.anchor} ${checkMode === 'doc' && classes.active}`} onClick={() => setCheckMode('doc')}>
                                <span>Документ</span>
                            </div>
                            <div className={`${classes.anchor} ${checkMode === 'txt' && classes.active}`} onClick={() => setCheckMode('txt')}>
                                <span>Текст</span>
                            </div>
                        </div>
                        { checkMode === 'doc'
                            ? <UploadFile />
                            : <UploadText />
                        }
                    </div>
                </div>
            </div>
        </section>
    )

    return check_document
}

export default CheckDocument
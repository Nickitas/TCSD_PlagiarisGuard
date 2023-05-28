import React, { useState } from 'react'
import { Button } from '../../UI/Button/Button'
import classes from './upload_text.module.scss'


const UploadText = () => {
    const [text, setText] = useState('')
  
    const handleCleanOffUploadText = () => {
        setText('')
    }

    const handleSendUploadText = async () => {
        if (!text?.length) return

        const URL = process.env.NEXT_PUBLIC_URL
        const data = await fetch(URL, {
            method: 'POST',
            body: text
        }).then(res => res.json())

        console.log(data)
    }

    const handleSubmit = e => {
        e.preventDefault()
        handleSendUploadText()
    }

    return (
        <form className={classes.upload_text} onSubmit={handleSubmit}>
            <textarea className={`${ text !== '' ? `${classes.active} ${classes.upload}` : classes.upload }`}
                onChange={e => setText(ee => e.target.value)}
                value={text}
            />

            <h3 className='header'> {  text?.length ? 'Отлично! Можно преступать к проверке 😃' : 'Вставьте Ваш текст в обалсть выше 👆🏼' }</h3>

            <div className={classes.controls}>
                <Button red onClick={handleCleanOffUploadText}>
                    Отмена
                </Button>
                <Button type='submit' onClick={handleSubmit} disabled={!text?.length}>
                    Проверить
                </Button>
            </div>
      </form>
    )
}

export { UploadText }
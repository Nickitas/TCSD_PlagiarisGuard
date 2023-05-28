import React, {useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { PreviewDoc } from '../PreviewDoc/PreviewDoc'
import { Button } from '../../UI/Button/Button'
import { OkeyCircleIcon, DocumentIcon } from '../../svg.module'
import classes from './upload_file.module.scss'


const UploadFile = () => {
    const navigate = useNavigate()
    const [awaiting, setAwaiting] = useState(true)
    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => 
                    Object.assign(file, { preview: URL.createObjectURL(file) })    
                )
            ])
        }

        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [])

    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: ['.pdf', '.docx'],
        maxSize: 20 * 1024 * 1024, // 20 МБ
        maxFiles: 1,
        onDropRejected: (rejectedFiles) => {
            const firstRejectedFile = rejectedFiles[0]
            if (firstRejectedFile) {
              alert(`Недопустимый формат файла!`)
            }
        },
    })
  
    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const removeRejected = (name) => {
        setRejected(files => files.filter(({ file }) => file.name !== name))
    }

    const handleCleanOffUploadFiles = () => {
        setFiles([])
        setRejected([])
    }

    const fileToBlob = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
        return blob;
    }

    const handleSendUploadFiles = async () => {
        if (!files?.length) return
      
        const formData = new FormData();
        const blob = await fileToBlob(files[0])
        formData.append('files[]', blob, `user_doc.${files[0].name.split('.')[1]}`)
        formData.append('file2', files[0], `user_doc.${files[0].name.split('.')[1]}`)
      
        const URL = 'http://95.163.240.231/api/v1/check_doc'
        try {
            const data = await fetch(URL, {
                headers: { "Content-Type": "multipart/form-data" },
                method: 'POST',
                body: formData
        }).then(res => res.json())
      
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        handleSendUploadFiles()
        awaiting && navigate('/report')
    }

    return (
        <form className={classes.upload_file} onSubmit={handleSubmit} enctype='multipart/form-data'>
            <div {...getRootProps({
                className:`${ isDragActive ? classes.active : classes.upload }`
            })} >
                <input {...getInputProps()} type='file' name='file' />
                <h3 className='header'>Загрузите Ваши документы</h3>
                {isDragActive ? <OkeyCircleIcon/> : <DocumentIcon/> }
                {
                    isDragActive 
                        ? <p>Перетащите документ сюда ...</p> 
                        : <p>Перетащите сюда файлы или нажмите, чтобы выбрать их</p>
                }
            </div>

            <div className={classes.prev_info}>
                <div className={classes.block}>
                    <h3 className='header'> {  files?.length ? 'Загруженные файлы:' : 'Загрузите Ваши файлы в обалсть выше 👆🏼' }</h3>
                    <ul className={classes.list}>
                        {
                            files.map(file => (
                                <PreviewDoc key={file.path} 
                                    file={file} 
                                    onClick={() => removeFile(file.name)}
                                />
                            ))
                        }
                    </ul>
                </div>
                { rejected?.length ? (
                    <div className={classes.block}>
                        <h3 className='header'>Эти файлы отклонены:</h3>
                        <ul className={classes.list}>
                            {
                                rejected.map(({ file, errors }) => (
                                    <PreviewDoc key={file.path} 
                                        file={file} 
                                        onClick={() => removeRejected(file.name)}
                                        errors={errors}
                                    />
                                ))
                            }
                        </ul>
                    </div> ) : null
                }
            </div>

            <div className={classes.controls}>
                <Button red onClick={handleCleanOffUploadFiles}>
                    Отмена
                </Button>
                <Button type='submit' onClick={handleSubmit} disabled={!files?.length}>
                    Проверить
                </Button>
            </div>
      </form>
    )
}

export { UploadFile }
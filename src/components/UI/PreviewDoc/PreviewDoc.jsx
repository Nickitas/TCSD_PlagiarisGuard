import docx_icon from '../../../assets/medias/pic/docx_icon.svg.png'
import { CloseIcon } from '../../svg.module'
import classes from './preview_doc.module.scss'

const PreviewDoc = ({ file, errors, onClick }) => {
  const isPdf = file.type === 'application/pdf'
  const isImage = file.type.startsWith('image/')

  const preview_doc = (
    <div className={classes.preview_doc}>
      { isPdf && <iframe src={file.preview} />}
      { isImage && <img src={file.preview} alt={file.name} onLoad={() => { URL.revokeObjectURL(file.preview) }} />}
      { !isPdf && !isImage && (
        <div className={classes.preview_doc_deffalte}>
          <img src={docx_icon} />
        </div>
      )}
      <button onClick={onClick}>
        <CloseIcon />
      </button>
      <p>
        {file.name} <br/>
        {`(${file.size} bytes)`}
      </p>
      <div className={classes.errors_block}>
        {
          errors && errors.map((error, index) => {
            <div className={classes.line}>
              <span># {index+1}</span>
              <p key={error.code}>{ error.message }</p>
            </div>
          })
        }
    </div>
  </div>
  )

  return preview_doc
}

export { PreviewDoc }
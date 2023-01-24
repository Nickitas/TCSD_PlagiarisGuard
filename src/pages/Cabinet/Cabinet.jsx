import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth'
import { Table } from '../../components/UI/Table/Table'
import { TableHead } from '../../components/UI/Table/TableHead'
import { TableBody } from '../../components/UI/Table/TableBody'
import { TableRow } from '../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../components/UI/Table/TableBodyCell'
import { Button } from '../../components/UI/Button/Button'
import { BtnLink  } from '../../components/UI/BtnLink/BtnLink'
import { SearchInput } from '../../components/UI/SearchInput/SearchInput'
import { BackLink  } from '../../components/UI/BackLink/BackLink'
import { CaseIcon, OkeyCircleIcon, CrossCircleIcon, ReportIcon, TrashIcon, TextIcon, DocumentIcon, ChartIcon } from '../../components/svg.module'
import { getUserFiles } from '../../components/Fetch'
import classes from './cabinet.module.scss'



const worksData = [
    {
        id: '1',
        user_id: '1' ,
        type: 'txt',
        title: 'УДК 004.03',
        doc_link: '',
        upload_date: '09 Янв 2023 20:22',
        isVerified: true,
        originality: ' 91,62%'
    },
    {
        id: '2',
        user_id: '2' ,
        type: 'pdf',
        title: 'УДК 004',
        doc_link: '',
        upload_date: '09 Фев 2022 12:43',
        isVerified: true,
        originality: ' 90,04%'
    },
    {
        id: '3',
        user_id: '1' ,
        type: 'txt',
        title: 'УДК 004',
        doc_link: '',
        upload_date: '20 Янв 2023 23:12',
        isVerified: true,
        originality: ' 94,23%'
    }
]


const Cabinet = () => {

    const [openModalDoc, setOpenModalDoc] = useState(false)
    const [openModalTxt, setOpenModalTxt] = useState(false)

    const [userFiles, setUserFiles] = useState()
    useEffect(() => {
        getUserFiles().then(e => {
            setUserFiles(e.map(item => {
                return {
                    id: item._id,
                    title: item.title,
                    type: item.type,
                    filename: item.filename,
                    upload_date: item.upload_date,
                    user_id: item.user_id,
                    isVerified: item.isVerified
                }
            }))
        })
    }, [])


    const handlerOpenModalDoc = () => {
        setOpenModalDoc(e => !e)
    }

    const handlerOpenModalTxt = () => {
        setOpenModalTxt(e => !e)
    }

    const [sortedField, setSortedField] = useState('')

    const handlerDeleteDoc = () => {

    }

    const [queryText, setQueryText] = useState('')

    // const _worksData = worksData.fileter(e => e.includes(queryText))


    return (
        <section className={classes.cabinet}>
            <div className='container'>
               
                <BackLink  />
               
                <div className={classes.row}>

                    <div className={classes.panel}>
                        <div className={classes.head}>
                            <h2 className='subtitle'>Кабинет</h2>
                            <CaseIcon/>
                        </div>
                        <div className={classes.body}>
                            <Button icon={<DocumentIcon/>} onClick={handlerOpenModalDoc}>
                                Проверить документ
                            </Button>
                            <Button icon={<TextIcon/>} onClick={handlerOpenModalTxt}>
                                Проверить текст
                            </Button>
                            <BtnLink icon={<ChartIcon/>} path={'/statistics'}>
                                Статистика
                            </BtnLink>                                        
                        </div>
                        <div className={classes.details}>
                            <summary>Всего работ: <b>{ worksData.length }</b></summary>
                        </div>
                    </div>

                    <div className={classes.content}>
                        <SearchInput placeholder='Поиск по названиям документов'
                            onChange={e => setQueryText(ee => e.target.value)}
                            
                        />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>№</TableHeadCell>
                                    <TableHeadCell onClick={() => setSortedField('type')}>
                                        Тип
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => setSortedField('title')}>
                                        Название
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => setSortedField('status')}>
                                        Статус
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => setSortedField('date')}>
                                        Дата загрузки
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => setSortedField('orig')}>
                                        Оригинальность
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Отчет
                                    </TableHeadCell>
                                    <TableHeadCell>Удалить</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    worksData.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableBodyCell>
                                                { index + 1 }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { row.type }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { row.title }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <div className={`svg-wrapp ${row.isVerified ? 'green': 'red'}`}>
                                                    { row.isVerified ? <OkeyCircleIcon/> : <CrossCircleIcon/> }
                                                </div>
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { row.upload_date }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { row.originality }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <div className='svg-wrapp'>
                                                    <Link>
                                                    <ReportIcon/>
                                                    </Link>
                                                </div>
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <div className='svg-wrapp red' onClick={() => handlerDeleteDoc(row._id)}>
                                                    <TrashIcon/>
                                                </div>
                                            </TableBodyCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                
                </div>
            </div>
        </section>
    )
}

export default Cabinet
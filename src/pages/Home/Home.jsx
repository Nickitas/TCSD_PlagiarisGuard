import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table } from '../../components/UI/Table/Table'
import { TableHead } from '../../components/UI/Table/TableHead'
import { TableBody } from '../../components/UI/Table/TableBody'
import { TableRow } from '../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../components/UI/Table/TableBodyCell'
import { SearchInput } from '../../components/UI/SearchInput/SearchInput'
import { Button } from '../../components/UI/Button/Button'
import { ChartIcon, DocumentIcon, OkeyCircleIcon, ReportIcon, TrashIcon } from '../../components/svg.module'
import classes from './home.module.scss'



const worksData = [
    {
        id: '1',
        user_id: '1' ,
        type: 'docx',
        title: 'Test',
        doc_link: '',
        upload_date: '24 Марта 2023 20:22',
        isVerified: true,
        originality: ' 0,04%'
    },
    {
        id: '2',
        user_id: '2' ,
        type: 'pdf',
        title: 'Обзор источников',
        doc_link: '',
        upload_date: '24 Марта 2023 21:04',
        isVerified: true,
        originality: ' 90,04%'
    },
    {
        id: '3',
        user_id: '1' ,
        type: 'txt',
        title: 'УДК 004.43',
        doc_link: '',
        upload_date: '24 Марта 2023 21:41',
        isVerified: true,
        originality: '89.99%'
    },
    {
        id: '4',
        user_id: '1' ,
        type: 'pdf',
        title: 'Моделирование',
        doc_link: '',
        upload_date: '24 Марта 2023 23:02',
        isVerified: true,
        originality: '43.44%'
    }
]


const Home = () => {
    const navigate = useNavigate()
    const [queryText, setQueryText] = useState()
    const [sortedField, setSortedField] = useState('')


    const home = (
        <section className={classes.home}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header}>
                        <h1 className='title'>Личный Кабинет</h1>
                        <p className='disc'>Здесь вы можете управлять своими работами и просамтривать их в любое время.</p>
                    </div>
                    <div className={classes.controls}>
                        <SearchInput placeholder='Поиск по названиям документов'
                            onChange={e => setQueryText(ee => e.target.value)}
                        />
                        <Button ico={<DocumentIcon/>} accent onClick={() => navigate('/check_document')}>
                            Проверить файл
                        </Button>
                        <Button ico={<ChartIcon/>} accent onClick={() => navigate('/statistics')}>
                            Статистика
                        </Button>
                    </div>
                    
                    <Table>
                        <TableHead>
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
                        </TableHead>
                        <TableBody>
                            {
                                worksData.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableBodyCell>
                                            { `[ ${index+1} ]` }
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
                                            <b>{ row.originality }</b>
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            <div className='svg-wrapp'>
                                                <Link to={'report'}>
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
        </section>
    )

    return home
}

export default Home
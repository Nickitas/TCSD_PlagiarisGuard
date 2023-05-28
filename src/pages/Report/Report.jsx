import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ProgressBar } from '../../components/UI/ProgressBar/ProgressBar'
import { Table } from '../../components/UI/Table/Table'
import { TableHead } from '../../components/UI/Table/TableHead'
import { TableBody } from '../../components/UI/Table/TableBody'
import { TableRow } from '../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../components/UI/Table/TableBodyCell'
import { Button } from '../../components/UI/Button/Button'
import { DoubleLogo } from '../../components/UI/DoubleLogo/DoubleLogo'
import { DownloadDocIcon, Logo } from '../../components/svg.module'
import classes from './report.module.scss'


const Report = () => {
    const currentUrl = window.location.href // https://DSTU_plagiarisguard.ru

    const [awaiting, setAwaiting] = useState(false)

    useEffect(() => {
        

        setAwaiting(true)
    }, [])

    const data = [
        {
            link: "https://core.ac.uk/download/542423592.pdf",
            percent: 0.2738958134281987,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://digitallibrary.un.org/record/723302/files/A_6002-RU.pdf",
            percent: 0.23702223961107471,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://kubsu.ru/sites/default/files/users/10962/portfolio/bezopasnost_informacii_v_inform.pdf",
            percent: 0.8813375855136505,
            type: "file",
            sys: 'Google'
        },
        {
            link: "http://www.cs.cmu.edu/~apd/forWendy/Jan37/jan37TrialTranscript.pdf",
            percent: 0.17299226563541437,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://kubsu.ru/sites/default/files/users/10962/portfolio/bezopasnost_informacii_v_inform.pdf",
            percent: 0.8813375855136505,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://www.fatf-gafi.org/content/dam/fatf-gafi/translations/guidance/Russian-MUMCFM-FATF%20Guidance%20on%20Risk-based%20Supervision.pdf.coredownload.inline.pdf",
            percent: 0.28450352966022285,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://www.dni.gov/files/images/globalTrends/documents/GT-Core-Russian.pdf",
            percent: 0.31965185642385086,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://www.kubsu.ru/sites/default/files/users/8548/portfolio/kim_2_kurs_kursovaya_segmentaciya_rynkov_v_marketinge.docx",
            percent: 0.38318069552129386,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://kpfu.ru/portal/docs/F1409170334/MI_Uchebnoe.posobie.s.oglavleniem.pdf",
            percent: 0.27302745508253645,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://edu.dobro.ru/upload/uf/55d/55dc6097f8995058755af688fcc49e6b.pdf",
            percent: 0.3163004248318634,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://irnr.ru/wp-content/uploads/%D0%9A%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8F/%D0%9B%D0%B8%D0%BA%D0%B2%D0%B8%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D1%8C/4_r.pdf",
            percent: 0.27225946777462806,
            type: "file",
            sys: 'Google'
        },
        {
            link: "http://www.iee.unn.ru/wp-content/uploads/sites/9/2018/02/2.Inf.ugrozy-vred.programmykomp.prestupleniya.pdf",
            percent: 0.35207167109896853,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://core.ac.uk/download/pdf/286629059.pdf",
            percent: 0.2633010795231797,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://www.kaznu.kz/content/files/news/folder22810/%D0%9B%D0%B0%D0%B1%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F_01.pdf",
            percent: 0.39070711843952644,
            type: "file",
            sys: 'Google'
        },
        {
            link: "https://www.kaznu.kz/content/files/news/folder23185/%D0%A1%D0%B5%D0%BC%D0%B8%D0%BD%D0%B0%D1%80%201.pdf",
            percent: 0.3628445655770025,
            type: "file",
            sys: 'Google'
        },
        {
            link: "http://www.unn.ru/bibn/files/materials/kript/kr2.pdf",
            percent: 0.29701784542382725,
            type: "file",
            sys: 'Google'
        },
    ]

    const downloadPDF = () => {
        const input = document.getElementById('printPdf')
        
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'pt', 'a4')
    
            let position = 0
            const pageHeight = pdf.internal.pageSize.height
    
            pdf.addImage(imgData, 'PNG', 0, position, 595, 842, '', 'FAST')
    
            position += pageHeight
    
            while (position < canvas.height) {
                pdf.addPage()
                pdf.addImage(imgData, 'PNG', 0, -position, 595, 842, '', 'FAST')
                position += pageHeight
            }
    
            pdf.save(`Report_${'id'}.pdf`)
        })
    }

    const await_section = (
        <div className={classes.await}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header_await}>
                        <h1 className='title'>Проверяем...</h1>
                        <p className='disc'>Идет проверка вашего документа. Дождитесь завершения проверки для того чтобы посмотреть отчет. Обычно на это уходит от 4 до 10 минут.</p>
                    </div>
                    <div className={classes.spinner}>
                        <div>
                            <Logo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const report = (
        <section className={classes.report}>
            <div id={'printPdf'}>
                <div className='container'>
                    <div className={classes.col}>
                        <div className={classes.header}>
                            <div className={classes.texts}>
                                <h1 className='title'>Отчет о проверке</h1>
                                <p className='disc'><b>Автор:</b> nickitadatsky@mail.com, ID: 9b9055cc-28bb-49de-b367-f1d93a4357d8</p>
                                <p className='disc'><b>Проверяющий:</b>nickitadatsky@mail.com, ID: 9b9055cc-28bb-49de-b367-f1d93a4357d8</p>
                                <p className='disc'>Отчет предоставлен сервисом <b>“PlagiarisGuard ДГТУ”®</b> 👉 <span>{currentUrl}</span>.</p>
                            </div>
                        </div>
                        <div className={classes.info}>
                            <h2 className={classes.heading}>Информация о документе</h2>
                            <div className={classes.table}>
                                <div className={classes.row}>
                                    <div className={classes.category}>№ документа:</div>
                                    <span className={classes.value}>1</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Имя исходного файла:</div>
                                    <span className={classes.value}>test.docx</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Начало загрузки:</div>
                                    <span className={classes.value}>2023-05-24 21:21:15</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Длительность загрузки:</div>
                                    <span className={classes.value}>00:01:12</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Языки в тексте:</div>
                                    <span className={classes.value}>русский</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Размер текста:</div>
                                    <span className={classes.value}>1 кБ</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Символов в тексте:</div>
                                    <span className={classes.value}>112 405</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Слов в тексте:</div>
                                    <span className={classes.value}>10 034</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Предложений в тексте:</div>
                                    <span className={classes.value}>1 345</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Время определения темы текста:</div>
                                    <span className={classes.value}>0:07:38</span>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.category}>Основные ключевые слова:</div>
                                    <span className={classes.value}>информационная безопасность, защита информации, информационная система, информационные системы, электронный ресурс, режим доступа, информационные технологии, программное обеспечение, несанкционированный доступ, средства защиты информации"</span>
                                </div>
                            </div>
                        </div>

                        <div className={classes.progres_bars_wrapper}>
                            <ProgressBar
                                title='Заимствования'
                                value={100 - (0.32*100)}
                            />
                            <ProgressBar
                                title='Самоцитирования'
                                value={0}
                            />
                            <ProgressBar
                                title='Цитирования'
                                value={0}
                            />
                            <ProgressBar
                                title='Оригинальность'
                                value={0.32 * 100}
                            />
                        </div>

                        <p className={classes.about}>
                            Заимствования — доля всех найденных текстовых пересечений, за исключением тех, которые система отнесла к цитированиям, по отношению к общему объему документа. Самоцитирования — доля фрагментов текста проверяемого документа, совпадающий или почти совпадающий с фрагментом текста источника, автором или соавтором которого является автор проверяемого документа, по отношению к общему объему документа. Цитирования — доля текстовых пересечений, которые не являются авторскими, но система посчитала их использование корректным, по отношению к общему объему документа. Сюда относятся оформленные по ГОСТу цитаты; общеупотребительные выражения; фрагменты текста, найденные в источниках из коллекций нормативно-правовой документации. Текстовое пересечение — фрагмент текста проверяемого документа, совпадающий или почти совпадающий с фрагментом текста источника. Источник — документ, проиндексированный в системе и содержащийся в модуле поиска, по которому проводится проверка. Оригинальность — доля фрагментов текста проверяемого документа, не обнаруженных ни в одном источнике, по которым шла проверка, по отношению к общему объему документа. Заимствования, самоцитирования, цитирования и оригинальность являются отдельными показателями и в сумме дают 100%, что соответствует всему тексту проверяемого документа. Обращаем Ваше внимание, что система находит текстовые пересечения проверяемого документа с проиндексированными в системе текстовыми источниками. При этом система является вспомогательным инструментом, определение корректности и правомерности заимствований или цитирований, а также авторства текстовых фрагментов проверяемого документа остается в компетенции проверяющего.
                        </p>

                        <Table>
                            <TableHead>
                                <TableHeadCell>№</TableHeadCell>
                                <TableHeadCell>
                                    Доля в отчете
                                </TableHeadCell>
                                <TableHeadCell>
                                    Источник
                                </TableHeadCell>
                                <TableHeadCell>
                                    Актуален на
                                </TableHeadCell>
                                <TableHeadCell>
                                    Поиск
                                </TableHeadCell>
                            </TableHead>
                            <TableBody>
                                {
                                    data.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableBodyCell>
                                                { `[ ${index+1} ]` }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <b>{ Math.round(row.percent , 2) }</b>
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { row.link }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { '24.05.2023' }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { row.sys }
                                            </TableBodyCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        
                        <DoubleLogo />
                        
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className={classes.controls}>
                    <Button>
                        Назад
                    </Button>
                    <Button accent ico={<DownloadDocIcon/>} onClick={downloadPDF}>
                        Скачать отчет
                    </Button>
                </div>
            </div>
        </section>
    )

    return !awaiting ? report : await_section
}

export default Report
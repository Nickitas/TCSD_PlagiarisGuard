import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Nav/Nav'
import { HistoryBackButton } from '../components/UI/HistoryBackButton/HistoryBackButton'
// import { Footer } from '../components/Footer/Footer'

const Layout  = () => {
    return (
        <>
            <Nav />
            <HistoryBackButton />
            <main>
                <Outlet/>
            </main>
            {/* <Footer /> */}
        </>
    )
}

export { Layout  }
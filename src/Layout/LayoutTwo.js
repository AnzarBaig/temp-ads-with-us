import Header from '@/Layout/Header'
import Footer from '@/Layout/Footer/Footer'
// import NavBar from '@/pages/Navbar'

export default function Layout({ children }) {
    return (
        <div>
            <Header home={true} />
            <div className='main bg-image bg-cover bg-center min-w-screen'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

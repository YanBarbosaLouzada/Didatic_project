import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/ui/navbar/Navbar'
function Layout() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </>

    )
}

export default Layout
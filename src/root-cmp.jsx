import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { CarIndex } from './pages/car-index.jsx'
import { StayIndex } from './pages/stay-index.jsx'

import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { StayDetails } from './pages/stay-details'

export function RootCmp() {

    return (
        <div>
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path="/user/:id" element={<UserDetails />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/stay" element={<StayIndex />} />
                    <Route path="/stay/:stayId" element={<StayDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


// Routes accesible from the main navigation (in AppHeader)
// const routes = [
//     {
//         path: '/',
//         component: <HomePage />,
//         label: 'Home 🏠',
//     },
//     {
//         path: 'car',
//         component: <CarIndex />,
//         label: 'Cars'
//     },
//     {
//         path: 'review',
//         component: <ReviewIndex />,
//         label: 'Reviews'
//     },
//     {
//         path: 'chat',
//         component: <ChatApp />,
//         label: 'Chat'
//     },
//     {
//         path: 'about',
//         component: <AboutUs />,
//         label: 'About us'
//     },
//     {
//         path: 'admin',
//         component: <AdminApp />,
//         label: 'Admin Only'
//     }
// ]

// export default routes



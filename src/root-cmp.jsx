import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { StayIndex } from './pages/stay-index.jsx'

import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { StayDetails } from './pages/stay-details'
import { useSelector } from 'react-redux'
import { LoginModal } from './cmps/login-modal.jsx'
import { FilterModal } from './cmps/filter-modal.jsx'


import { HostHome } from './pages/host-home-page'
import { HostIndex } from './pages/host-index'


export function RootCmp() {

    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)

    return (
        <div>
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path="/user/:id" element={<UserDetails />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<StayIndex />} />
                    <Route path="/explore/:filterByQuery" element={<StayIndex />} />
                    <Route path="/explore/:stayId" element={<StayDetails />} />
                    <Route path="/host/home" element={<HostHome />} />
                    <Route path="/host" element={<HostIndex />} />
                </Routes>

            </main>
            <FilterModal />
            {(isLoginModalOpen) && <LoginModal />}
            {/* {(isLoginModalOpen)&& <LoginModal />} */}
            {/* <AppFooter /> */}
        </div >
    )
}





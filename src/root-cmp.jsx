import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home-page.jsx'
import { StayIndex } from './pages/stay-index.jsx'

import { UserDetails } from './pages/user-details'
import { StayDetails } from './pages/stay-details'
import { useSelector } from 'react-redux'
import { LoginModal } from './cmps/login-modal.jsx'
import { FilterModal } from './cmps/filter-modal.jsx'
import { HostHome } from './pages/host-home-page'
import { HostIndex } from './pages/host-index'
import { UserTrips } from './pages/user-trips'


export function RootCmp() {

    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)
    const isRefreshedLoginModal = useSelector(storeState => storeState.userModule.isRefreshedLoginModal)

    return (
        <div>
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}

                    <Route path="/user/trip" element={<UserTrips />} />
                    <Route path="/user/:id" element={<UserDetails />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<StayIndex />} />
                    <Route path="/explore/:stayId" element={<StayDetails />} />
                    <Route path="/explore/:filterByQuery" element={<StayIndex />} />
                    <Route path="/host/home" element={<HostHome />} />
                    <Route path="/host" element={<HostIndex />} />
                </Routes>

            </main>
            <FilterModal />
            
            {(isRefreshedLoginModal) && <LoginModal />}
          
        </div >
    )
}

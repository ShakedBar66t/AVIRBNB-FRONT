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
import { MoblieFooter } from './cmps/mobile-footer.jsx'
import { HostDashBoard } from './pages/host-dashboard.jsx'
import { UserWishlist } from './pages/user-wishlist.jsx'
import { UserNotification } from './cmps/user-notification.jsx'



export function RootCmp() {

    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)
    const isRefreshedLoginModal = useSelector(storeState => storeState.userModule.isRefreshedLoginModal)

    return (
        <div>
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}

                    <Route path="/user/trip" element={<UserTrips />} />
                    <Route path="/user/wishlist/:id" element={<UserWishlist />} />
                    <Route path="/user/notification/:id" element={<UserNotification />} />
                    <Route path="/user/:id" element={<UserDetails />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<StayIndex />} />
                    <Route path="/explore/:stayId" element={<StayDetails />} />
                    <Route path="/host/home" element={<HostHome />} />
                    <Route path="/host" element={<HostIndex />} />
                    <Route path="/host/dashboard" element={<HostDashBoard />} />
                </Routes>

            </main>
            <FilterModal />
            <MoblieFooter/>
            {(isRefreshedLoginModal) && <LoginModal />}

        </div >
    )
}

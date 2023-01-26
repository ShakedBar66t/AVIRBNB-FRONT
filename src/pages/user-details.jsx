import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { AppHeader } from '../cmps/app-header'
import { UserSetting } from '../cmps/user-setting'
import { UserEdit } from '../cmps/user-edit'

export function UserDetails() {

  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.user)
  const [page,setPage] = useState('setting')

  // useEffect(() => {
  //   loadUser(params.id)

  //   socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
  //   socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  //   return () => {
  //     socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  //   }

  // }, [])

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className="user-details">
      <AppHeader/>

    <main className='user-deatils-cont'>
      <header>

      <h2>Account</h2>
      <p><span>{user.fullname + ','}</span><span>{user.email}</span><span>·Go to profile</span></p>
      </header>
    {(page==='setting') ?  <UserSetting setPage={setPage}/> : ''}
    {(page==='edit') ?  <UserEdit setPage={setPage}/> : ''}
      
      

    </main>
      {/* <h1>User Details</h1>
      {user && <div>
        <h3>
          {user.fullname}
        </h3>
         Demo for dynamic images:
        <div className="user-img" style={{ backgroundImage: `url('/img/u${0}.png')` }}>
        </div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>}  */}
    </section>
  )
}
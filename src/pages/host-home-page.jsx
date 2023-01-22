import { SiAirbnb } from 'react-icons/si'
import { useNavigate } from 'react-router'
import { AppFooter } from '../cmps/app-footer'
export function HostHome(){
    const navigate = useNavigate()

    return <section className='host-home-page'>

        <div className='logo' onClick={()=>{navigate('/explore')}}><SiAirbnb/></div>
        <div className='page-cont'>
            <p>HOST AN EXPERIENCE ON AVIRBNB </p>
            <h1>Earn money leading people on activities you love</h1>
            <button onClick={()=>{navigate('/host')}}>Let's go</button>
        </div>
        <img style={{width:'100vw'}} src="https://www.edreams.com/blog/wp-content/uploads/sites/3/2016/03/globe-map.gif" alt="" />
        <AppFooter/>
    </section>
}
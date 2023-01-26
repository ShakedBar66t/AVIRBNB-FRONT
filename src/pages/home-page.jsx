import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function HomePage() {

    const navigate = useNavigate()

    useEffect(()=>{
        navigate('/explore')
    },[])


    return (
        <section>

        </section >
    )
}
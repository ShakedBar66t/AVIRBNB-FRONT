import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { stayService } from "../services/stay.service"
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>;
const Loc1 = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>
const Loc2 = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>
const Loc3 = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>

export default function GoogleMap() {

    const params = useParams()
    const { stayId } = params
    const [stay, setStay] = useState(null)
    const [coordinates, setCoordinates] = useState({})

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        const stay = await stayService.getById(stayId)
        setStay(stay)
        setCoordinates({ lat: stay.loc.lat, lng: stay.loc.lng })
    }

    // console.log('stay from google', stay.loc.lat)

    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (stay) &&
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '90%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyC0TgvRwhSTyPNxupAu8iGt6ViO7EET43Q" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    // lat={coorinates.lat}
                    // lng={coorinates.lng}
                    {...coordinates}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
        ;
}
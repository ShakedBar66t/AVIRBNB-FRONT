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
        setCoordinates({ lat: stay.loc.lat, lng: stay.loc.lan })
    }

    const zoom = 11
    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (stay) &&
        <div style={{ width: '100%', margin: 'auto', aspectRatio: '16 / 9' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyC0TgvRwhSTyPNxupAu8iGt6ViO7EET43Q" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="🏠"
                />
            </GoogleMapReact>
        </div>
        ;
}
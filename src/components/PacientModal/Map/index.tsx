import React, { useContext } from 'react';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { PacientsContext } from '../../../contexts/PacientsContext';

import styles from './map.module.scss';
import Loader from '../../Loader';

const containerStyle = {
    width: '100%',
    height: '230px'
};

function Map() {
    const { activePacient } = useContext(PacientsContext);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    })

    const position = {
        lat: Number(activePacient.location.coordinates.latitude),
        lng: Number(activePacient.location.coordinates.longitude),
    };

    const [map, setMap] = React.useState(null)

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <div className={styles.container}>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={5}
                    clickableIcons={false}
                    onUnmount={onUnmount}
                >
                    <Marker
                        position={position}
                    />
                    <></>
                </GoogleMap>
            ) : (<Loader />)}
        </div>
    )
}

export default React.memo(Map)
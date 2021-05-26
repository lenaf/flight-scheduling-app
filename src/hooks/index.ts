
import { useEffect, useState } from 'react';
import axios from 'axios'

export const useFetchAircrafts = () => {
    const [aircrafts, setAircrafts] = useState<IAircraft[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://infinite-dawn-93085.herokuapp.com/aircrafts')
            .then(res => {
                console.log(res)
                setAircrafts(res.data.data)
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, [])
    return { aircrafts, loading }
}

export const useFetchFlights = () => {
    const [flights, setFlights] = useState<IFlight[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://infinite-dawn-93085.herokuapp.com/flights')
            .then(res => {
                console.log(res)
                setFlights(res.data.data)
                setLoading(false);

            })
            .catch(err => console.log(err))
    }, [])
    return { flights, loading }
}




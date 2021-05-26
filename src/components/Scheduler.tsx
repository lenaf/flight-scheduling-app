import { Col, Row, Select } from 'antd';
import React, { useState } from 'react';
import Aircraft from './Aircraft';
import AircraftTimeline from './AircraftTimeline';
import Flight from './Flight';

interface IProps {
  flights: IFlight[];
  aircrafts: IAircraft[];
}

const Scheduler: React.FC<IProps> = ({ flights: flightsData, aircrafts }) => {
  const [flights, setFlights] = useState<IFlight[]>(flightsData);
  const [selectedAircraftId, setSelectedAircraftId] = useState<null | string>(null)

  const updateFlightAircraft = (flightId: string, aircraftId: string | null) =>
    setFlights(prev => prev.map(f => f.id === flightId ? { ...f, aircraftId } : f))

  const aircraftsWithFlightData = aircrafts.map(ac => {
    const assignedFlights = flights.filter(f => f.aircraftId === ac.id).sort((a, b) => a.departuretime - b.departuretime);
    const totalAirTime = assignedFlights.reduce((prev, curr) => prev + (curr.arrivaltime - curr.departuretime), 0);
    return ({
      ...ac,
      assignedFlights,
      utization: totalAirTime / 60 / 60 / 24
    })
  })

  const selectedAircraft = aircraftsWithFlightData.find(ac => ac.id === selectedAircraftId);

  return (
    <div>
      <Row>
        <Col span={4} className='mr-6'>
          <h3 className='text-2xl mb-4'>All Aircrafts</h3>
          {aircraftsWithFlightData.map(a =>
            <Aircraft
              aircraft={a}
              isSelected={selectedAircraftId === a.id}
              onClick={() => setSelectedAircraftId(a.id)} />)}
        </Col>
        <Col span={8} className='mr-6'>
          <Row align='middle' className='mb-4'>
            <h3 className='text-2xl mr-4'>Flights for </h3>
            <Select
              placeholder='Select an aircraft'
              value={selectedAircraftId ?? undefined}
              style={{ minWidth: '100px' }}
              options={aircrafts.map(a => ({ label: `Aircraft ${a.id}`, value: a.id }))}
              onChange={(option) => setSelectedAircraftId(option as string)} />
          </Row>
          {selectedAircraft?.assignedFlights.map(flight =>
            <Flight
              flight={flight}
              updateFlightAircraft={aircraftId => updateFlightAircraft(flight.id, aircraftId)}
              aircrafts={aircrafts}
            />)}
          {selectedAircraft && <AircraftTimeline aircraft={selectedAircraft} />}
        </Col>
        <Col span={8}>
          <h3 className='text-2xl mb-4'>All Flights</h3>
          {flights.map((flight, i) =>
            <Row key={i} className='flex-nowrap'>
              <Flight
                flight={flight}
                updateFlightAircraft={aircraftId => updateFlightAircraft(flight.id, aircraftId)}
                aircrafts={aircraftsWithFlightData}
              />
            </Row>
          )}
        </Col>

      </Row >
    </div >
  );
}

export default Scheduler

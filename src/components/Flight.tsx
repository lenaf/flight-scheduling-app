import React from 'react';
import { Button, Col, Dropdown, Menu, Row, Tooltip, Tag } from 'antd';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';


interface IProps {
  flight: IFlight
  updateFlightAircraft: (id: string | null) => void;
  aircrafts: IAircraft[];
}

const Flight: React.FC<IProps> = ({
  flight,
  updateFlightAircraft,
  aircrafts,
}) => {
  const potentailAircrafts = aircrafts.filter(a => {
    const firstScheduledflight = a.assignedFlights && a.assignedFlights[0];
    const lastScheduledFlight = a.assignedFlights && a.assignedFlights[a.assignedFlights.length - 1];
    return !a.assignedFlights?.length ||
      lastScheduledFlight?.destination === flight.origin && (flight.departuretime - lastScheduledFlight.arrivaltime) > (20 * 60) ||
      firstScheduledflight?.origin === flight.destination && (firstScheduledflight.departuretime - flight.arrivaltime) > (20 * 60)
  })


  return (
    <Row
      align='middle'
      className='bg-gray-50 mb-2 p-2 shadow flex-grow'
    >
      <Col span={6} className='text-lg'>{flight.id}</Col>
      <Col span={12}>
        <div>{moment().startOf('day').seconds(flight.departuretime).format('h:mm A')} - {moment().startOf('day').seconds(flight.arrivaltime).format('h:mm A')}</div>
        <small>{flight.origin} - {flight.destination}</small>
      </Col>
      <Col span={6}>
        {!flight.aircraftId ? potentailAircrafts.length > 0 ? <Dropdown overlay={
          <Menu> {potentailAircrafts.map(aircraft =>
            <Menu.Item onClick={() => updateFlightAircraft(aircraft.id)}>
              Assign flight to aircraft {aircraft.id}
            </Menu.Item>)}
          </Menu >
        } >
          <Button type='primary' onClick={e => e.preventDefault()}>Assign</Button>
        </Dropdown> :
          <small>No available aircrafts</small> :
          <Tag >
            <Row align='middle'>
              <div className='mr-1'>{`Aircraft ${flight.aircraftId}`}</div>
              <Tooltip title="Clear assignment">
                <Button type='link' size='small' shape='circle' icon={<CloseOutlined style={{ verticalAlign: 'initial' }} />} onClick={() => updateFlightAircraft(null)}></Button>
              </Tooltip>
            </Row>
          </Tag>
        }
      </Col>
    </Row>
  );
}

export default Flight

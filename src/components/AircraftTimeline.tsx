import React from 'react';


const AircraftTimeline: React.FC<{ aircraft: IAircraft }> = ({
  aircraft,
}) => {

  return (
    <div>
      Timeline
      <div
        className={`bg-gray-50 `}
        style={{ position: 'relative', height: '40px', }}
      >
        {aircraft.assignedFlights?.map(af =>
          <div>
            <div
              className='bg-green-400' style={{
                left: `${af.departuretime / 60 / 60 / 24 * 100}%`,
                width: `${(af.arrivaltime - af.departuretime) / 60 / 60 / 24 * 100}%`,
                height: '100%',
                position: 'absolute',
              }} />
            <div
              className='bg-purple-400' style={{
                left: `${af.arrivaltime / 60 / 60 / 24 * 100}%`,
                width: `${20 / 60 / 24 * 100}%`,
                height: '100%',
                position: 'absolute',
              }} />
          </div>)
        }
      </div>
    </div>
  );
}

export default AircraftTimeline

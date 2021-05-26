import React from 'react';


const Aircraft: React.FC<{ aircraft: IAircraft, isSelected: boolean; onClick: () => void }> = ({
  aircraft,
  isSelected,
  onClick,
}) => {
  return (
    <div onClick={onClick}
      className={`bg-gray-50 mb-2 p-2 shadow cursor-pointer ${isSelected ? 'border border-blue-600' : ''}`}
    >
      <div className='text-lg mr-4'>Aircraft {aircraft.id}</div>
      <div className='mr-4'>Utization: {Math.round(aircraft.utization * 100)}%</div>
    </div>
  );
}

export default Aircraft

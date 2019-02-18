import React from 'react';
import { FaCheck } from 'react-icons/fa/index';

export const StatusMark = ({ status }) => {
  if (status === 'Live') {
    return (
      <div className="live_status_ic live_status_live">
        <FaCheck style={{ fontSize: '10px', marginRight: '5px' }} />
        {status}
      </div>
    );
  }

  return (
    <div className="live_status_ic live_status_dead">
      {status}
    </div>
  );
};

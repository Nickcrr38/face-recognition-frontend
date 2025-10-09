import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div style={{ color: 'black', textAlign: 'center', margin: '20px 0' }}>
      <div style={{ fontSize: '1.5rem' }}>
        {name}, your current entry count is:
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000000ff' }}>
        {entries}
      </div>
    </div>
  );
};

export default Rank;

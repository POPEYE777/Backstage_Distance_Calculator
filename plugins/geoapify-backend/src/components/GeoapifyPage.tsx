import React, { useState } from 'react';
import axios from 'axios';

const GeoapifyPage: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [distance, setDistance] = useState<string | null>(null);

  const handleCheckDistance = async () => {
    try {
      const response = await axios.post('http://localhost:7007/api/geoapify/distance', {
        start: startLocation,
        end: endLocation,
      });
      setDistance(`${response.data.distance} km`);
    } catch (error) {
      console.error('Error fetching distance:', error);
      setDistance(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Check Distance</h2>
      <div>
        <label>
          Start Location:
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Enter start location coordinates"
          />
        </label>
      </div>
      <div>
        <label>
          End Location:
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="Enter end location coordinates"
          />
        </label>
      </div>
      <button onClick={handleCheckDistance}>Check Distance</button>
      {distance && <p>Distance: {distance}</p>}
    </div>
  );
};

export default GeoapifyPage;

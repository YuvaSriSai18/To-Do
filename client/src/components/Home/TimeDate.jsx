import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TimeDate() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDegrees = (hour % 12) * 30 + minute * 0.5; // Hour hand rotation
  const minuteDegrees = minute * 6; // Minute hand rotation
  const secondDegrees = second * 6; // Second hand rotation

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '4px solid #1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        {/* Hour Hand */}
        <Box
          sx={{
            position: 'absolute',
            width: '30%', // Shorter length for hour hand
            height: '4px',
            backgroundColor: '#1976d2',
            transformOrigin: '0% 50%', // Set origin at start of the hand
            transform: `rotate(${hourDegrees}deg)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        />

        {/* Minute Hand */}
        <Box
          sx={{
            position: 'absolute',
            width: '45%', // Medium length for minute hand
            height: '3px',
            backgroundColor: '#1976d2',
            transformOrigin: '0% 50%',
            transform: `rotate(${minuteDegrees}deg)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        />

        {/* Second Hand */}
        <Box
          sx={{
            position: 'absolute',
            width: '50%', // Longest length for second hand
            height: '2px',
            backgroundColor: '#d32f2f',
            transformOrigin: '0% 50%',
            transform: `rotate(${secondDegrees}deg)`,
            transition: 'transform 0.2s ease-in-out',
          }}
        />

        {/* Center Circle */}
        <Box
          sx={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: '#1976d2',
            borderRadius: '50%',
          }}
        />
      </Box>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {time.toLocaleTimeString()}
      </Typography>
    </Box>
  );
}

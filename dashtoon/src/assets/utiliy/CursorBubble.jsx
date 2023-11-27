import React, { useState, useEffect } from 'react';
import './cursorbubble.css';

const CursorBubble = () => {
  const [bubbles, setBubbles] = useState([]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newBubble = { x: clientX, y: clientY, id: Date.now() };
    setBubbles([...bubbles, newBubble]);

    // Start the bubble falling animation after a delay
    setTimeout(() => {
      setBubbles((prevBubbles) => {
        return prevBubbles.filter((bubble) => bubble.id !== newBubble.id);
      });
    }, 3000); // Adjust the delay as needed (e.g., 3000 milliseconds for a 3-second delay)
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [bubbles]);

  return (
    <div className="cursor-bubble-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="cursor-bubble"
          style={{ left: bubble.x, top: bubble.y }}
        />
      ))}
    </div>
  );
};

export default CursorBubble;

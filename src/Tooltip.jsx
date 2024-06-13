import React from 'react';

const Tooltip = ({ topic, position }) => {
  if (!topic) return null;

  const tooltipStyle = {
    position: "absolute",
    top: position.y,
    left: position.x,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    zIndex: "999",
    pointerEvents: "none", 
    transform: "translate(-50%, -120%)"
  };

  return (
    <div style={tooltipStyle}>
      <p>{topic}</p>
    </div>
  );
};

export default Tooltip;

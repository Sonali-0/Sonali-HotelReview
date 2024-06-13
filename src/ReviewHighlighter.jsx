import React, { useState } from 'react';
import Tooltip from './Tooltip';

const ReviewHighlighter = ({ content, highlightIndices, topic }) => {
  const [tooltip, setTooltip] = useState({
    topic: null,
    position: { x: 0, y: 0 }
  });

  const getColorForSentiment = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "#D9F2DD";
      case "Negative":
        return "#F2DBD9";
      case "Mixed":
        return "#e8bd6d3d";
      case "Neutral":
        return "#eaf09b6b";
      default:
        return "transparent";
    }
  };

  const handleMouseEnter = (event, topic) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip({
      topic,
      position: {
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY
      }
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ topic: null, position: { x: 0, y: 0 } });
  };

  const createHighlightedContent = (content, highlightIndices) => {
    let result = [];
    let lastIndex = 0;

    if (!highlightIndices || highlightIndices.length === 0) {
      result.push(<span key="normal">{content}</span>);
      return result;
    }

    highlightIndices.forEach(([start, end, sentiment], index) => {
      if (start > lastIndex) {
        result.push(
          <span key={`${index}-normal`}>
            {content.substring(lastIndex, start)}
          </span>
        );
      }
      result.push(
        <span
          key={`${index}-highlighted`}
          style={{ backgroundColor: getColorForSentiment(sentiment) }}
          onMouseEnter={(e) => handleMouseEnter(e, topic)}
          onMouseLeave={handleMouseLeave}
        >
          {content.substring(start, end)}
        </span>
      );
      lastIndex = end;
    });

    if (lastIndex < content.length) {
      result.push(
        <span key={`last-normal`}>{content.substring(lastIndex)}</span>
      );
    }

    return result;
  };

  return (
    <>
      {createHighlightedContent(content, highlightIndices)}
      <Tooltip topic={tooltip.topic} position={tooltip.position} />
    </>
  );
};

export default ReviewHighlighter;

import React from 'react';
import ReviewHighlighter from './ReviewHighlighter';

const Review = ({ review }) => {
  const analytics =
    review.analytics && review.analytics.length > 0 ? review.analytics[0] : {};
  const highlightIndices = analytics.highlight_indices || [];
  const topic = analytics.topic || "No topic available";

  const getStarPercentage = (outOf, rating) => {
    return (rating / outOf) * 100;
  };

  const renderStars = (ratingPercentage) => {
    const totalStars = 5;
    const fullStars = Math.floor(ratingPercentage / 20);
    const partialStarPercentage = ratingPercentage % 20;

    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <i key={i} className="fa fa-star" style={{ color: '#F6C700' }}></i>
        );
      } else if (i === fullStars && partialStarPercentage > 0) {
        stars.push(
          <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
            <i className="fa fa-star" style={{ color: '#808080' }}></i>
            <i
              className="fa fa-star"
              style={{
                color: '#F6C700',
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${(partialStarPercentage / 20) * 100}%`,
                overflow: 'hidden',
              }}
            ></i>
          </div>
        );
      } else {
        stars.push(
          <i key={i} className="fa fa-star" style={{ color: '#808080' }}></i>
        );
      }
    }

    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="icon">
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <div className="reviewer-info">
          <div className="name">{review.reviewer_name}</div>
          <span style={{ opacity: '.8' }}>wrote a review at</span>
          <div className="name">{review.hotel_code}</div>
        </div>
        <div className="icons">
          <i className="fa-regular fa-user"></i>
          <i className="fa-regular fa-bookmark"></i>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div className="review-rating">
        <div className="stars-outer">
          {renderStars(getStarPercentage(review.rating_review_score, review.out_of))}
        </div>
        <span className="review-date">{review.date}</span>
      </div>
      <div className="review-content">
        <ReviewHighlighter
          content={review.content}
          highlightIndices={highlightIndices}
          topic={topic}
        />
      </div>
    </div>
  );
};

export default Review;

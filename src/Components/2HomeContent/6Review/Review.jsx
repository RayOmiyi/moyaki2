import './Review.css';
import reviews from './review';
import z324 from '../../../assets/z324new.png'
import z376 from '../../../assets/z376new.png'

const Review = () => {
  return (
    <div className='review-containers'>
      <h2 className='reviews-h2'>Reviews</h2>
      <div className="corner-image bottom-left">
        <img src={z324} alt="Top Left" className="side-image" />
      </div>
      <div className="corner-image bottom-right">
        <img src={z376} alt="bottom right " className="side-image"/>
      </div>
      {/* Flex container to align the review items in a row */}
      <div className='reviews-row'>
        {reviews.map((review) => {
          const { id,  image, text, occupation,name } = review;
          return (
            <article key={id} className="review-container">
              <img src={image} alt='img' className='review-img' />
              <div className='review-text'>
                <h2 className='review-h2'>{`"${text}"`}</h2>
                <div className='review-flex'>
                <h3 className='review-h4'>{name}</h3>
                <h3 className='review-h3'>{occupation}</h3>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Review;

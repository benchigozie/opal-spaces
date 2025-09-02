import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


type starRatingProps = {
    rating: number,
};

function StarRating( { rating } : starRatingProps) {


const stars = []

    for ( let i = 1; i <= 5; i++ ) {
        if (rating >= i) {
            stars.push(<FaStar key={i} className="text-light-wood" />);
          } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="text-light-wood" />);
          } else {
            stars.push(<FaRegStar key={i} className="text-light-wood" />);
          }
    }
  return (
        <div className="flex items-center gap-1">
            <div className="flex text-lg">
            {stars}
            </div>
        </div>
  )
}

export default StarRating
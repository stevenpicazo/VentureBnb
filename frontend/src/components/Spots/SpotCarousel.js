import './SpotCarousel.css';

const SpotCarousel = ({ spot }) => {
    <div class="swiper carousel">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img className="spot-image" src={spot.images[0]}></img>
            </div>
            <div class="swiper-slide">
                <img className="spot-image" src={spot.images[1]}></img>
            </div>
            <div class="swiper-slide">
                <img className="spot-image" src={spot.images[2]}></img>
            </div>
            <div class="swiper-slide">
                <img className="spot-image" src={spot.images[3]}></img>
            </div>
            <div class="swiper-slide">
                <img className="spot-image" src={spot.images[4]}></img>
            </div>
        </div>
        <button type="button" class="swiper-button-next"></button>
        <button type="button" class="swiper-button-prev"></button>
        <div className='swiper-pagination'></div>
    </div>
}

export default SpotCarousel;
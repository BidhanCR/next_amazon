import { Carousel } from "react-responsive-carousel";
import slideImg_1 from "../images/slides/sliderImg_1.jpg";
import slideImg_2 from "../images/slides/sliderImg_2.jpg";
import slideImg_3 from "../images/slides/sliderImg_3.jpg";
import slideImg_4 from "../images/slides/sliderImg_4.jpg";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image priority src={slideImg_1} alt="sliderImg_1" />
        </div>
        <div>
          <Image src={slideImg_2} alt="sliderImg_2" />
        </div>
        <div>
          <Image src={slideImg_3} alt="sliderImg_3" />
        </div>
        <div>
          <Image src={slideImg_4} alt="sliderImg_4" />
        </div>
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;

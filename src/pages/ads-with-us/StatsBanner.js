// components/StatsBanner.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const sliderData = [
  { img: '/B2b ad banner website - 2025-01.jpg', alt: 'Happy Advertisers' },
  { img: '/B2b ad banner website - 2025-02.jpg', alt: 'Revenue Generated' },
  { img: '/B2b ad banner website - 2025-03.jpg', alt: 'Average ROAS' },
  // { img: '/B2B-advertising page-banner.png', alt: 'Campaign Snapshot' },
  // { img: '/Emerge-solution-Ad-mobile.png', alt: 'Client Success' },
];

const StatsBanner = () => (
  // <section className="bg-[#f9fbfc] py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto px-3 sm:px-5 md:px-8 py-5 sm:py-6 ">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-[50vh] rounded-2xl overflow-hidden"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.img}
              alt={item.alt}
              className="w-full object-contain rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  // </section>
);

export default StatsBanner;
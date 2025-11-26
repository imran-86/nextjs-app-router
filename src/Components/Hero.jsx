
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      title: "Research Papers Collection",
      description: "Discover, Share and Collaborate on Cutting-Edge Research",
      image: "https://cdn.pixabay.com/photo/2017/10/04/09/56/chemist-2815640_1280.jpg",
      buttonText: "Explore Papers"
    },
    {
      id: 2,
      title: "Share Your Research",
      description: "Publish your findings and contribute to academic community",
      image: "https://cdn.pixabay.com/photo/2019/11/19/22/24/watch-4638673_1280.jpg",
      buttonText: "Upload Paper"
    },
    {
      id: 3,
      title: "Collaborate with Researchers",
      description: "Connect with fellow researchers and expand your network",
      image: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Join Community"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl h-96 md:h-[500px] relative mt-20">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-96 md:h-[500px]">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                                <div className="text-center text-white px-4">
                                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                        {slide.title}
                                    </h2>
                                    <p className="text-lg md:text-xl max-w-2xl">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
  );
}
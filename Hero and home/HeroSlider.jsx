import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Vision & Mission',
      tag: 'WHY WE EXIST',
      tagColor: 'bg-secondary',
      vision: 'To create a better-informed, educated, and aware world.',
      mission: 'To catalyse the power of research and communication for social equity and progressive change.',
      buttonText: 'Work with us',
      buttonLink: '/what-we-do',
      backgroundImage: 'https://cmsrconsultants.com/img/slider1.jpg',
      overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
    },
    {
      id: 2,
      title: 'Evidence, storytelling, and capacity Building',
      tag: 'WHAT WE DO',
      tagColor: 'bg-primary',
      description: 'End-to-end solutions from research to communication and training.',
      buttonText: 'Explore Services',
      buttonLink: '/what-we-do',
      backgroundImage: 'https://cmsrconsultants.com/img/slider5.png',
      overlay: 'bg-gradient-to-r from-primary/85 to-primary/65',
    },
    {
      id: 3,
      title: 'End-to-end solutions from research to communication and training ',
      tag: 'OUR SERVICES',
      tagColor: 'bg-secondary',
      description: 'Your description text goes here.',
      buttonText: 'Button Text',
      buttonLink: '/location',
      backgroundImage: 'https://picafsp.org/wp-content/uploads/2017/10/Communication-Research.jpg',
      overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
    },
    {
      id: 4,
      title: 'Your New Slide Title',
      tag: 'YOUR TAG',
      tagColor: 'bg-secondary',
      description: 'Your description text goes here.',
      buttonText: 'Button Text',
      buttonLink: '/location',
      backgroundImage: 'https://cmsrconsultants.com/img/slider1.jpg',
      overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[10]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
            }}
          >
            {/* Overlay */}
            <div className={`absolute inset-0 ${slide.overlay}`} />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                {/* Tag */}
                <div
                  className={`inline-block ${slide.tagColor} text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6`}
                >
                  {slide.tag}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>

                {/* Content */}
                {slide.vision && slide.mission ? (
                  <div className="space-y-4 mb-8">
                    <p className="text-xl sm:text-2xl text-white/95 font-medium">
                      <span className="font-semibold">Vision:</span>{' '}
                      {slide.vision}
                    </p>
                    <p className="text-xl sm:text-2xl text-white/95 font-medium">
                      <span className="font-semibold">Mission:</span>{' '}
                      {slide.mission}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-8 font-light">
                    {slide.description}
                  </p>
                )}

                {/* Button */}
                <Link
                  to={slide.buttonLink}
                  className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl relative z-[100]"
                >
                  <span>{slide.buttonText}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-[100]"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-[100]"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-[100]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-12 h-2'
                : 'bg-white/50 w-2 h-2 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-xs mb-2">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider


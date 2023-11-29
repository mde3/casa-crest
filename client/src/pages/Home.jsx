import { useState } from 'react';
import Helmet from "../components/Helmet"

const Home = () => {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      url: 'https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=1514&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      url: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return <Helmet title={"Home"}>
    <section className="home py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full">
        <div>
          <h1 className="text-4xl text-center font-bold mb-2 lg:text-5xl">Find a Place to Call Your Own</h1>
          <p className="text-base text-center text-gray-800 mb-8 mx-auto max-w-[50ch]">
            Browse through our extensive listings to find properties that suit your taste and budget.
            Your dream home awaits you here.
          </p>
        </div>
        <div className="max-w-[768px] h-[320px] w-full m-auto relative group lg:max-w-[968px] lg:h-[480px]">
          <div 
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full rounded-xl bg-black/30 bg-center bg-cover duration-500"
          ></div>
          <div onClick={prevSlide} className='flex items-center w-12 h-16 pl-2 absolute top-0 right-auto bottom-0 left-0 overflow-hidden m-auto z-[4] rounded-tr-full rounded-br-full bg-black/30 backdrop-blur-sm text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <div onClick={nextSlide} className='flex items-center justify-end w-12 h-16 pr-2 absolute top-0 right-0 bottom-0 left-auto overflow-hidden m-auto z-[4] rounded-tl-full rounded-bl-full bg-black/30 backdrop-blur-sm text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 rounded-xl"></div>
        </div>
      </div>
    </section>
  </Helmet>
}

export default Home
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from "../components/Helmet"
import { useSelector } from 'react-redux';
import ContactLandlord from '../components/ContactLandlord';

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? listing.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === listing.imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

    return <Helmet title={"Listing"}>
      <section className="listings">
        {loading && 
          <div className='py-36 flex items-center justify-center text-center'>
            <p className='text-2xl'>loading...</p>
          </div>
        }
        {error && (
          <div className='py-36 flex flex-col items-center justify-center text-center'>
            <div className="flex items-center text-2xl text-red-800" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  Something went wrong!
                </span>
              </div>
            </div>
            <Link to={'/'} className="mt-4 underline">
              Return home
            </Link>
          </div>
        )} 
        {listing && !loading && !error && (
          <>
            <div className="relative w-full h-[450px] lg:h-[500px]">
              {listing.imageUrls.map((url, index) => (
                <React.Fragment key={url}>
                  <div 
                    style={{ display: index === currentIndex ? 'block' : 'none', backgroundImage: `url(${url})` }} 
                    className="w-full h-full bg-black/30 bg-center bg-cover duration-500"
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
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/30"></div>
                </React.Fragment>
              ))}
            </div>
            <div className="py-10 max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full">
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                <div className="flex flex-col lg:w-6/12">
                  <h3 className='text-xl font-semibold mb-3 md:text-2xl'>
                    {listing.name} - $
                    {listing.offer
                      ? listing.discountPrice.toLocaleString('en-US')
                      : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19 9A7 7 0 1 0 5 9c0 1.387.409 2.677 1.105 3.765h-.008L12 22l5.903-9.235h-.007A6.971 6.971 0 0 0 19 9zm-7 3a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"/>
                    </svg>
                    <p className="text-base">{listing.address}</p>
                  </div>
                  <div className='flex gap-4 mb-6'>
                    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {listing.offer && (
                      <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        ${+listing.regularPrice - +listing.discountPrice} OFF
                      </p>
                    )}
                  </div>
                  <div className="">
                    <p className='text-slate-800'>
                      <span className='font-semibold text-black'>Description - </span>
                      {listing.description}
                    </p>
                  </div>
                  <div className="mt-4 border-solid border-t border-t-gray-300 lg:border-b-gray-300 lg:border-b lg:pb-4">
                    <ul className='mt-4 flex flex-wrap items-center text-[#303133] font-semibold text-sm gap-4 sm:gap-6'>
                      <li className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78c-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v5c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-5c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z"/>
                        </svg>
                        {listing.bedrooms > 1
                          ? `${listing.bedrooms} Beds `
                          : `${listing.bedrooms} Bed `}
                      </li>
                      <li className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <circle cx="7" cy="7" r="2" fill="currentColor"/>
                          <path fill="currentColor" d="M20 13V4.83C20 3.27 18.73 2 17.17 2c-.75 0-1.47.3-2 .83l-1.25 1.25c-.16-.05-.33-.08-.51-.08c-.4 0-.77.12-1.08.32l2.76 2.76c.2-.31.32-.68.32-1.08c0-.18-.03-.34-.07-.51l1.25-1.25a.828.828 0 0 1 1.41.59V13h-6.85c-.3-.21-.57-.45-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5A2.251 2.251 0 0 0 5 12.25V13H2v6c0 1.1.9 2 2 2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1c1.1 0 2-.9 2-2v-6h-2zm0 6H4v-4h16v4z"/>
                        </svg>
                        {listing.bathrooms > 1
                          ? `${listing.bathrooms} Baths `
                          : `${listing.bathrooms} Bath `}
                      </li>
                      <li className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
                        </svg>
                        {listing.parking ? 'Parking spot' : 'No Parking'}
                      </li>
                      <li className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M5 21q-.425 0-.712-.288T4 20v-1q-1.25 0-2.125-.875T1 16v-5q0-.825.588-1.412T3 9q.825 0 1.413.588T5 11v4h14v-4q0-.825.588-1.412T21 9q.825 0 1.413.588T23 11v5q0 1.25-.875 2.125T20 19v1q0 .425-.288.713T19 21q-.425 0-.712-.288T18 20v-1H6v1q0 .425-.288.713T5 21Zm2-8v-2q0-1.375-.837-2.463T4 7V6q0-1.25.875-2.125T7 3h10q1.25 0 2.125.875T20 6v1q-1.35.35-2.175 1.463T17 11v2H7Z"/>
                        </svg>
                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:border-l-[#DADFE5] lg:border-l lg:border-solid lg:w-6/12">
                  {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <>
                      <div className="mb-4">
                        <h3 className='text-xl font-semibold md:text-2xl'>
                          Are you interested?
                        </h3>
                      </div>
                      <div className="w-full">
                        <button
                          onClick={() => setContact(true)}
                          className="flex w-full justify-center rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-6/12 md:m-auto"
                        >
                          Contact landlord
                        </button>
                      </div>
                    </>
                  )}
                  {contact && <ContactLandlord listing={listing} />}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </Helmet>
  }
  
  export default Listing
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <div className="mt-4">
        <Link to={`/listing/${listing._id}`}>
            <div className="card overflow-hidden shadow-[0px_5px_10px_0px_#0000000D] rounded-2xl sm:w-[340px] md:max-w-[380px] md:w-full">
                <div className="card-banner relative">
                    <div className="img-holder overflow-hidden">
                        <img 
                            src={
                                listing.imageUrls[0]
                            }
                            width={585}
                            height={390} 
                            alt="listing item" 
                            className="w-full h-[200px] object-cover hover:scale-105 transition-scale duration-300" 
                        />
                    </div>
                </div>
                <div className="card-content pt-5 pb-6 px-5">
                    <p className='text-gray-900 text-xl font-semibold'>
                        $
                        {listing.offer
                        ? listing.discountPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                        <span className="text-sm text-gray-500 font-medium">
                            {listing.type === 'rent' ? ' /month' : ' /sale'} 
                        </span>
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900 truncate hover:text-myblue transition duration-300 ease-linear">
                        {listing.name}
                    </h3>
                    <div className="flex mb-2 text-gray-500 font-medium items-center gap-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 9A7 7 0 1 0 5 9c0 1.387.409 2.677 1.105 3.765h-.008L12 22l5.903-9.235h-.007A6.971 6.971 0 0 0 19 9zm-7 3a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"/>
                        </svg>
                        <p className="text-sm truncate">{listing.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                        {listing.description}
                    </p>

                    <div className="mt-4 border-solid border-t border-t-gray-300">
                        <ul className='mt-4 flex flex-wrap items-center justify-between text-[#303133] font-semibold text-sm gap-1 md:flex-nowrap md:whitespace-nowrap'>
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
                                    <path fill="currentColor" d="M5 21q-.425 0-.712-.288T4 20v-1q-1.25 0-2.125-.875T1 16v-5q0-.825.588-1.412T3 9q.825 0 1.413.588T5 11v4h14v-4q0-.825.588-1.412T21 9q.825 0 1.413.588T23 11v5q0 1.25-.875 2.125T20 19v1q0 .425-.288.713T19 21q-.425 0-.712-.288T18 20v-1H6v1q0 .425-.288.713T5 21Zm2-8v-2q0-1.375-.837-2.463T4 7V6q0-1.25.875-2.125T7 3h10q1.25 0 2.125.875T20 6v1q-1.35.35-2.175 1.463T17 11v2H7Z"/>
                                </svg>
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

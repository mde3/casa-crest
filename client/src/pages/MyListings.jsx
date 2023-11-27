import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";

const MyListings = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    
    const handleShowListings = async () => {
        try {
          setShowListingsError(false);
          const res = await fetch(`/api/user/listings/${currentUser._id}`);
          const data = await res.json();
          if (data.success === false) {
            setShowListingsError(true);
            return;
          }
    
          setUserListings(data);
        } catch (error) {
          setShowListingsError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
          const res = await fetch(`/api/listing/delete/${listingId}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
    
          setUserListings((prev) =>
            prev.filter((listing) => listing._id !== listingId)
          );
        } catch (error) {
          console.log(error.message);
        }
    };

  return <Helmet title={"My Listings"}>
        <section className="pb-36">
            <div className="flex flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        My Listings
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <div className="space-y-6">
                        <button onClick={handleShowListings} className='text-green-700 w-full'>
                            Click here to Show Listings
                        </button>
                        <p className='text-red-700 mt-5'>
                            {showListingsError ? 'Error showing listings' : ''}
                        </p>

                        {userListings && userListings.length > 0 && (
                            <div>
                                {userListings.map((listing) => (
                                    <div key={listing._id} className='flex justify-between items-center p-3 gap-4 border rounded-lg'>
                                        <Link to={`/listing/${listing._id}`}>
                                            <img
                                                src={listing.imageUrls[0]}
                                                alt='listing cover'
                                                className='w-20 h-20 object-contain'
                                            />
                                        </Link>
                                        <Link
                                            className='text-slate-700 font-semibold hover:underline truncate flex-1'
                                            to={`/listing/${listing._id}`}
                                        >
                                            <p>{listing.name}</p>
                                        </Link>

                                        <div className='flex item-center'>
                                            <button
                                                onClick={() => handleListingDelete(listing._id)}
                                                className='text-red-700'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                                                    <path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"/>
                                                </svg>
                                            </button>
                                            <Link to={`/update-listing/${listing._id}`}>
                                                <button className='text-green-700'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                                        <path fill="currentColor" d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04L27.87 7.863zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936l-.097 2.658zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z"/>
                                                    </svg>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    </Helmet>
}

export default MyListings
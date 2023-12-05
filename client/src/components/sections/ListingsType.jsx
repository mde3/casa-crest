import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../ListingCard";

export default function ListingsType() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full">
      <div className="py-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3 flex items-center justify-between'>
              <h2 className='text-base uppercase font-semibold md:text-xl'>
                Featured on offer
              </h2>
              <Link to={'/search?offer=true'} className='bg-myblue text-white text-sm px-4 py-2 font-medium rounded-lg shadow-sm'>
                View more
              </Link>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="py-10">
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3 flex items-center justify-between'>
              <h2 className='text-base uppercase font-semibold md:text-xl'>
                Featured on rent
              </h2>
              <Link to={'/search?type=rent'} className='bg-myblue text-white text-sm px-4 py-2 font-medium rounded-lg shadow-sm'>
                View more
              </Link>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="py-10">
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3 flex items-center justify-between'>
              <h2 className='text-base uppercase font-semibold md:text-xl'>
                Featured on sale
              </h2>
              <Link to={'/search?type=sale'} className='bg-myblue text-white text-sm px-4 py-2 font-medium rounded-lg shadow-sm'>
                View more 
              </Link>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

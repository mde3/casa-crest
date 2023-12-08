import { useState, useEffect } from "react";
import Helmet from "../components/Helmet"
import { useNavigate } from 'react-router-dom';
import ListingCard from "../components/ListingCard";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return <Helmet title={"Listing"}>
    <section className="search py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:p-4 lg:border-gray-300 lg:border lg:border-solid lg:rounded-lg">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Search term:</h3>
                <input
                  type="search" 
                  id="searchTerm"
                  placeholder="Search listings..."
                  value={sidebardata.searchTerm}
                  onChange={handleChange} 
                  className="block w-full rounded-lg p-4 text-gray-900 text-sm shadow-sm border border-solid border-gray-300 placeholder:text-gray-800 sm:leading-6 focus:outline-0"
                />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Search by:</h3>
                <ul className="w-full text-sm font-medium text-gray-900 border border-gray-300 rounded-lg">
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input 
                        type="checkbox" 
                        id='all'
                        onChange={handleChange}
                        checked={sidebardata.type === 'all'}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2" 
                      />
                      <label className="w-full py-2 ms-2 text-base font-medium text-gray-900">
                        Rental & Sale
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input 
                        type="checkbox" 
                        id='rent'
                        onChange={handleChange}
                        checked={sidebardata.type === 'rent'}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2" 
                      />
                      <label className="w-full py-2 ms-2 text-base font-medium text-gray-900">
                        Rental
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input 
                        type="checkbox" 
                        id='sale' 
                        onChange={handleChange}
                        checked={sidebardata.type === 'sale'}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                      />
                      <label className="w-full py-2 ms-2 text-base font-medium text-gray-900">
                        Sale
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input 
                        type="checkbox" 
                        id='offer'
                        onChange={handleChange}
                        checked={sidebardata.offer}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                      />
                      <label className="w-full py-2 ms-2 text-base font-medium text-gray-900">
                        Offer
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input 
                        type="checkbox" 
                        id='parking'
                        onChange={handleChange}
                        checked={sidebardata.parking}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                      />
                      <label className="w-full py-2 ms-2 text-base font-medium text-gray-900">
                        Parking
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input 
                        type="checkbox" 
                        id='furnished'
                        onChange={handleChange}
                        checked={sidebardata.furnished}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                      />
                      <label className="w-full py-2 ms-2 text-base font-medium text-gray-900">
                        Furnished
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">Sort:</h3>
                <select 
                  id="sort_order" 
                  onChange={handleChange}
                  defaultValue={'created_at_desc'}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                  <option value="regularPrice_desc">Highest pirce</option>
                  <option value="regularPrice_asc">Lowest price</option>
                </select>
              </div>
              <button className="mb-8 w-full flex justify-center items-center gap-2 rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Search
              </button>
            </form>
          </div>
          <div className="lg:ps-4 lg:ml-4 lg:flex-1 lg:w-full">
            
            <h1 className="text-2xl font-semibold border-b">
             Listing results:
            </h1>

            {!loading && listings.length === 0 && (
              <div className='py-36 flex items-center justify-center text-center'>
                <p className='text-xl text-slate-700'>No listing found!</p>
              </div>
            )}

            {loading && (
              <div className='py-36 flex items-center justify-center text-center'>
                <p className='text-xl text-slate-700'>Loading...</p>
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
              {!loading && listings && listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center md:mt-6">
              {showMore && (
                <button
                  onClick={onShowMoreClick}
                  className="flex justify-center w-6/12 m-auto text-base text-myblue font-semibold leading-6 hover:underline"
                >
                  Show more
                </button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  </Helmet>
}

export default Search
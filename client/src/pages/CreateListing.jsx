import Helmet from '../components/Helmet'

export default function CreateListing() {
  return <Helmet title={"Create Listing"}>
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    {/* <section className="max-w-7xl mx-auto p-6 px-4 lg:px-8 xl:max-w-full"> */}
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Listing
        </h2>
      </div>
      <form className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className='flex flex-col lg:w-6/12'>
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div>
                <input
                  type="text"
                  id="name"
                  maxLength='62'
                  minLength='10'
                  required
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div>
                <textarea
                  type="text"
                  id="description"
                  required
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div>
                <input
                  type="text"
                  id="address"
                  required
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="sale"
                  required
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Sale</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="rent"
                  required
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Rental</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="furnished"
                  required
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Furnished</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="offer"
                  required
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Offer</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="parking"
                  required
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Parking spot</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id="bedrooms"
                  min='1'
                  max='10'
                  required
                  className="block rounded-md border-0 outline-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Bedrooms</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id="bathrooms"
                  min='1'
                  max='10'
                  required
                  className="block rounded-md border-0 outline-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Bathrooms</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="mt-4 flex flex-wrap gap-4">
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id="regularPrice"
                    min='50'
                    max='10000000'
                    required
                    className="block rounded-md border-0 outline-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className='flex flex-col items-center'>
                    <p>Regular price</p>
                    <span className='text-xs'>($ / month)</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id="discountPrice"
                    min='0'
                    max='10000000'
                    required
                    className="block rounded-md border-0 outline-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className='flex flex-col items-center'>
                    <p>Discount price</p>
                    <span className='text-xs'>($ / month)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col p-2 items-center justify-center bg-gray-50 rounded-md lg:w-6/12'>
            <p className='font-semibold'>
              Images:
              <span className='text-gray-600 ml-2'>
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className='mt-4 flex gap-4'>
              <input
                className='p-2 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                className='p-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex w-6/12 m-auto justify-center rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Listing
        </button>
      </form>
    </section>
  </Helmet>
}

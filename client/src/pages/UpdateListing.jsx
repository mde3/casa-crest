import { useState, useEffect } from 'react';
import Helmet from '../components/Helmet'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
        setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return <Helmet title={"Update Listing"}>
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Listing
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={handleChange}
                  value={formData.name}
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
                  onChange={handleChange}
                  value={formData.description}
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
                  onChange={handleChange}
                  value={formData.address}
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Sale</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Rental</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Furnished</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                  className="block rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span>Offer</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
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
                  onChange={handleChange}
                  value={formData.bedrooms}
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
                  onChange={handleChange}
                  value={formData.bathrooms}
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
                    onChange={handleChange}
                    value={formData.regularPrice}
                    className="block rounded-md border-0 outline-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className='flex flex-col items-center'>
                    <p>Regular price</p>
                    {formData.type === 'rent' && (
                      <span className='text-xs'>($ / month)</span>
                    )}
                  </div>
                </div>
              </div>
              {formData.offer && (
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className='flex items-center gap-2'>
                    <input
                      type='number'
                      id="discountPrice"
                      min='0'
                      max='10000000'
                      required
                      onChange={handleChange}
                      value={formData.discountPrice}
                      className="block rounded-md border-0 outline-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className='flex flex-col items-center'>
                      <p>Discount price</p>
                      {formData.type === 'rent' && (
                        <span className='text-xs'>($ / month)</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='p-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div key={url} className='mt-4 flex w-full justify-between p-2 border items-center'>
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-xl'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='p-3 text-red-700 hover:opacity-75'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"/>
                    </svg>
                  </button>
                </div>
            ))}
          </div>
        </div>
        <button
          disabled={loading || uploading}
          type="submit"
          className="flex w-6/12 m-auto justify-center rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? 'Updating...' : 'Update listing'}
        </button>
        {error && <p className='text-red-700 text-center text-sm'>{error}</p>}
      </form>
    </section>
  </Helmet>
}

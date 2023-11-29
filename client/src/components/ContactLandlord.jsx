import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactLandlord({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
          try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLandlord();
    }, [listing.userRef]);
    
  return (
    <div>
        {landlord && (
            <div className='flex flex-col text-center gap-2'>
                <h3 className="text-xl">Landlord details</h3>
                <p className="mb-2">
                    Contact <span className='font-semibold'>{landlord.username}</span>{' '}
                    for{' '}
                    <span className='font-semibold capitalize'>{listing.name}</span>
                </p>
                <textarea
                  type="text"
                  id='message'
                  name='message'
                  rows='2'
                  onChange={onChange}
                  placeholder='Enter your message here...'
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <Link
                    to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                    className="flex justify-center items-center gap-2 rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8l-19 8Z"/>
                    </svg>
                </Link>
            </div>
        )}
    </div>
  )
}

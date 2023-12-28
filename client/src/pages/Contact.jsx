import { useRef, useState } from "react"
import emailjs from "@emailjs/browser";
import Helmet from "../components/Helmet"

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      // 'YOUR_SERVICE_ID', 
      import.meta.env.VITE_SERVICE_ID,
      // 'YOUR_TEMPLATE_ID', 
      import.meta.env.VITE_TEMPLATE_ID,
      form.current, import.meta.env.VITE_PUBLIC_KEY
      // form.current, 'YOUR_PUBLIC_KEY'
    )
    .then((result) => {
      setMessage('Message sent successfully');
    }, (error) => {
      setMessage('An error occurred, message not sent');
    });
    e.target.reset();
  };

  return <Helmet title={"Contact"}>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full lg:flex lg:items-center lg:gap-4">
        <div className="mx-auto lg:w-6/12 lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-myblue">Contact</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact us
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 lg:mx-auto lg:max-w-[50ch]">
            We&#39;re here to help! If you have any questions or need assistance, feel free to
            reach out to us. Our team is always ready to assist you.
          </p>
        </div>
        <div className="mx-auto mt-4 lg:w-6/12 lg:flex-1 lg:mt-0">
          <form ref={form} onSubmit={sendEmail} className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Your name</label>
              <input 
                type="text" 
                name="user_name"
                placeholder="John Doe" 
                className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Your email</label>
              <input 
                type="email" 
                name="user_email" 
                placeholder="name@example.com" 
                className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Subject (optional)</label>
              <input 
                type="text" 
                name="subject" 
                placeholder="Let us know how we can help you" 
                className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Your message</label>
              <textarea 
                name="message"
                rows="6" 
                required
                className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                placeholder="Leave a comment...">
              </textarea>
            </div>
            <button 
              type="submit" 
              className="flex justify-center items-center gap-2 rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send message
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8l-19 8Z"/>
              </svg>
            </button>
          </form>
          <p className={message === 'Message sent successfully' ? 'text-green-500 mt-4' : 'text-red-500 mt-4'}>
            {message}
          </p>
        </div>
      </div>
    </section>
  </Helmet>
}

export default Contact
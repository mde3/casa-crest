import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Helmet from "../components/Helmet"
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/auth/OAuth";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return <Helmet title={"Login"}>
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src='./images/logo.png'
          alt="logo"
          className='w-8 h-8 mx-auto'
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                required
                className="block w-full rounded-md py-2.5 px-4 text-gray-900 text-sm shadow-sm border border-solid border-gray-300 placeholder:text-gray-800 sm:leading-6 focus:outline-0 focus:border-indigo-600"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm hidden">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-md py-2.5 px-4 text-gray-900 text-sm shadow-sm border border-solid border-gray-300 placeholder:text-gray-800 sm:leading-6 focus:outline-0 focus:border-indigo-600"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
            <OAuth />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&#39;t have an account?{' '}
          <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
        {error && <p className='text-center text-red-500 mt-5'>{error}</p>}
      </div>
    </section>
  </Helmet>
}

export default Login
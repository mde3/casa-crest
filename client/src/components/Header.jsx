import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom"
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice";
import logo from '/images/logo.png'

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Listing',
    href: '/search',
  },
  {
    name: 'Benefits',
    href: '/benefits',
  },
  {
    name: 'FAQs',
    href: '/faqs',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const [scrollHeader, setScrollHeader] = useState(false);
  const menuRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //open hamburger function
  const handleClick = () => {
    setShowMenu(true);
    document.body.style.overflow = 'hidden';
  };

  //close hamburger function
  const handleClose = () => {
    setShowMenu(false);
    document.body.style.overflow = 'auto';
  };

  //adding handclick function to menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        document.body.style.overflow = 'auto';
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <header className="bg-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-6 px-4 lg:px-8 xl:max-w-full">
        <div className="flex lg:flex-1">
          <Link to='/' className='font-semibold flex items-center gap-x-1 -m-1.5 p-1.5'>
            <img
              src={logo}
              alt="logo"
              loading='eager'
              className='w-6' 
            />
            CasaCrest
          </Link>
        </div>

        <div className={`fixed bg-[#efefef] top-0 -right-full w-[70%] h-full transition-[0.4s] z-[100] pt-24 pb-14 px-8 lg:[all:unset] lg:block ${showMenu ? 'right-0' : ''}`} ref={menuRef}>
          <ul className='flex flex-col items-center gap-y-8 lg:flex-row lg:gap-x-12' onClick={handleClose}>
            {links.map(({ name, href }) => {
              return (
                <li key={name}>
                  <NavLink to={href} className={(navClass) => navClass.isActive ? 'relative text-myblue font-semibold before:absolute before:bottom-[-0.75rem] before:w-[5px] before:h-[5px] before:bg-myblue before:rounded-[50%] before:left-[45%]' : '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900'}>
                    {name}
                  </NavLink>
                </li>
              );
            })}
            <>
              <div className="lg:hidden">
                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <Link to='/profile'>
                      <img
                        className='rounded-full h-8 w-8 object-cover'
                        src={currentUser.avatar}
                        alt='profile'
                      />
                    </Link>
                    <span onClick={handleSignOut} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 cursor-pointer">
                      Sign out
                    </span>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-base font-semibold leading-7 py-2 px-4 text-myblue">
                      Login
                    </Link>
                    <Link to="/sign-up" className="text-base font-medium leading-7 bg-myblue py-2 px-4 rounded text-white">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </>
          </ul>
          <button className='absolute top-4 right-6 -m-2.5 rounded-md p-2.5 text-gray-700 cursor-pointer lg:hidden' onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>  

        <button className='inline-flex -m-2.5 p-2.5 cursor-pointer lg:hidden' onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
        </button>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link to='/profile'>
                <img
                  className='rounded-full h-8 w-8 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              </Link>
              <span onClick={handleSignOut} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 cursor-pointer">
                Sign out
              </span>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-base font-semibold leading-7 py-2 px-4 text-myblue">
                Login
              </Link>
              <Link to="/sign-up" className="text-base font-medium leading-7 bg-myblue py-2 px-4 rounded text-white">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className="h-px bg-gray-300 mx-4 my-0 lg:mx-8"></div>
    </header>
  )
}

export default Header

import { Link } from "react-router-dom";
import logo from "/images/logo.png";

const Footer = () => {
  return (
    <footer className="pt-12 pb-8">
      <div className="max-w-7xl mx-auto grid gap-y-8 px-4 lg:px-8 xl:max-w-full">
        <div className="grid gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {/* <div className="grid gap-y-8 md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(4,max-content)] justify-between"> */}
          <div>
            <Link
              to="/"
              className="font-semibold flex items-center gap-x-1 mb-2"
            >
              <img src={logo} alt="logo" loading="eager" className="w-6" />
              CasaCrest
            </Link>
            <p className="max-w-[50ch]">Your dream home awaits you here.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Company</h3>
            <ul className="flex flex-col gap-y-3">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <ul className="flex flex-col gap-y-3">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Legal</h3>
            <ul className="flex flex-col gap-y-3">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-900 transition duration-300 easy-in-out hover:text-myblue"
                >
                  Copyright
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col text-base pt-8">
          <div className="w-full border border-solid border-[#eaecf0] mb-4"></div>
          <div>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              {/* <p className='font-medium'>Copyright &copy; 2023 CasaCrest. All Rights Reserved</p> */}
              <p className="font-medium">
                Copyright © {new Date().getFullYear()}. All Rights Reserved
              </p>
              <ul className="flex gap-2.5">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 896 1664"
                    >
                      <path
                        fill="#0025ba"
                        d="M895 12v264H738q-86 0-116 36t-30 108v189h293l-39 296H592v759H286V905H31V609h255V391q0-186 104-288.5T667 0q147 0 228 12z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 1600 1280"
                    >
                      <path
                        fill="#0025ba"
                        d="M1588 152q-67 98-162 167q1 14 1 42q0 130-38 259.5T1273.5 869T1089 1079.5t-258 146t-323 54.5q-271 0-496-145q35 4 78 4q225 0 401-138q-105-2-188-64.5T189 777q33 5 61 5q43 0 85-11q-112-23-185.5-111.5T76 454v-4q68 38 146 41q-66-44-105-115T78 222q0-88 44-163q121 149 294.5 238.5T788 397q-8-38-8-74q0-134 94.5-228.5T1103 0q140 0 236 102q109-21 205-78q-37 115-142 178q93-10 186-50z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill="#0025ba"
                        d="M7.5 5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Z"
                      />
                      <path
                        fill="#0025ba"
                        fillRule="evenodd"
                        d="M4.5 0A4.5 4.5 0 0 0 0 4.5v6A4.5 4.5 0 0 0 4.5 15h6a4.5 4.5 0 0 0 4.5-4.5v-6A4.5 4.5 0 0 0 10.5 0h-6ZM4 7.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0ZM11 4h1V3h-1v1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

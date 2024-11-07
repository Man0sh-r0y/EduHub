import { useEffect, useState, useRef } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import logo from "../../assets/Logo/EduHub_LOGO_2.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import NavbarDropDown from "./NavbarDropDown";
import { logout } from "../../services/operations/authAPI";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { MdLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const handleLogout = () => {
    dispatch(logout(navigate)) // You can call the logout action here
    navigate("/login") // Navigate to login page after logout
  }

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((navItems, index) => (
              <li key={index}>
                {navItems.title == "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p className="cursor-pointer">{navItems.title}</p>

                    <div className="invisible absolute left-[-70%] top-[180%] flex flex-col gap-4 rounded-md bg-richblack-25 text-richblack-800 p-4  opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      {subLinks.length > 0 ? (
                        subLinks.map((catagory, index) => (
                          <Link
                            to={`/catalog/${catagory.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                          >
                            <span className="cursor-pointer">
                              {catagory.name}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <div> No Catagory Found !</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={navItems?.path}>
                    <p
                      className={`${matchRoute(navItems?.path)
                          ? "border-b-2 border-yellow-800"
                          : "border-0"
                        }`}
                    >
                      {navItems.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/wishlist" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-white">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-white">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        <button
          className="mr-4 md:hidden relative"
          onClick={toggleDropdown}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

        {/* {isOpen && (<NavbarDropDown isOpen={isOpen} toggleDropdown={toggleDropdown} />)} */}
        {isOpen && (
          <div className="absolute top-[50px] right-[50px] z-20 md:hidden" ref={ref}>
            <div className="absolute top-[10px] right-[0px] p-2 bg-richblack-700 text-white rounded-md shadow-lg w-[200px]">
              {
                user && (
                  <div>
                    <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                      <VscDashboard className="mr-2" />
                      <Link to="/dashboard/my-profile">Dashboard</Link>
                    </div>
                    <div
                      className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <VscSignOut className="mr-2" />
                      Logout
                    </div>
                  </div>
                )
              }
              {
                !user && (
                  <div>

                    <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                      <FaHome className="mr-2" />
                      <Link to="/">Home</Link>
                    </div>

                    <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                      <MdContactSupport className="mr-2" />
                      <Link to="/contact">Contact Us</Link>
                    </div>

                    <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                      <MdLogin className="mr-2" />
                      <Link to="/login">Login</Link>
                    </div>

                    <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                      <SiGnuprivacyguard className="mr-2" />
                      <Link to="/signup">Signup</Link>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

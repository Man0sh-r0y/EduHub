import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/EduHub_LOGO_2.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import NavbarDropDown from "./NavbarDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
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
                {
                  navItems.title == "Catalog" ? (
                    <div className="relative flex items-center gap-2 group">

                      <p className="cursor-pointer">
                        {navItems.title}
                      </p>

                      <div className='invisible absolute left-[-70%] top-[180%] flex flex-col gap-4 rounded-md bg-richblack-25 text-richblack-800 p-4  opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                        {
                          subLinks.length > 0 ? (
                            subLinks.map((catagory, index) => (
                              <Link to={`/catalog/${catagory.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                <span className="cursor-pointer">{catagory.name}</span>
                              </Link>
                            ))
                          ) : (<div> No Catagory Found !</div>)
                        }

                      </div>


                    </div>
                  ) : (
                    <Link to={navItems?.path}>
                      <p className={`${matchRoute(navItems?.path) ? "border-b-2 border-yellow-800" : "border-0"}`}>
                        {navItems.title}
                      </p>
                    </Link>
                  )
                }
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
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden relative"
          onClick={toggleDropdown}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        {/* {isOpen && (<NavbarDropDown />)} */}
      </div>
    </div>
  )
}

export default Navbar
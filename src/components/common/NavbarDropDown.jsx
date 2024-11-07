import { useEffect, useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services/operations/authAPI"

export default function NavbarDropDown({ isOpen, toggleDropdown }) {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const ref = useRef(null)

  //useOnClickOutside(ref, () => setOpen(false))

  const handleLogout = () => {
    dispatch(logout(navigate)) // You can call the logout action here
  }

  if (!user) return null

  return (
    <div className="absolute top-[50px] right-[50px] z-20 ">
      <div className="absolute top-[10px] right-[0px] p-2 bg-richblack-700 text-white rounded-md shadow-lg w-[200px]">
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
    </div>

  )
}
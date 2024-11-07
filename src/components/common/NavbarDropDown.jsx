import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services\/operations/authAPI"

export default function NavbarDropDown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  const handleLogout = () => {
    dispatch(logout()) // You can call the logout action here
    navigate("/login") // Navigate to login page after logout
  }

  if (!user) return null

  return (
    <div className="absolute top-[50px] right-[50px] bg-richblack-400 " onClick={() => setOpen(false)}>
      <div className="text-white">
        <div className="relative" ref={ref}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)} // Toggle dropdown open/close
          >
            <span className="text-white">{user.name}</span>
            <AiOutlineCaretDown className="text-white" />
          </div>

          {open && (
            <div className="absolute top-[50px] right-[0px] bg-gray-800 text-white rounded-md shadow-lg w-[200px]">
              <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                <VscDashboard className="mr-2" />
                <Link to="/dashboard">Dashboard</Link>
              </div>
              <div
                className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                onClick={handleLogout}
              >
                <VscSignOut className="mr-2" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}
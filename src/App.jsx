import React from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import AuthRoute from "./components/core/Auth/AuthRoute"
import Contact from "./pages/Contact"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Error from "./pages/Error"
import VerifyEmail from "./pages/VerifyEmail"
import Dashboard from "./pages/Dashboard"
import MyProfile from "./components/core/Dashboard/MyProfile"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Cart from "./components/core/Dashboard/Cart/Cart"
import Settings from "./components/core/Dashboard/Settings/Settings"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import Home from "./pages/Home"
import About from "./pages/About"
import { ACCOUNT_TYPE } from "./utils/constants"
import { useSelector } from "react-redux"
import "./App.css"

function App() {

  const { user } = useSelector(state => state.profile)

  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthRoute> <Signup /> </AuthRoute>} />
        <Route path="/login" element={<AuthRoute> <Login /> </AuthRoute>} />
        <Route path="/forgot-password" element={<AuthRoute> <ForgotPassword /> </AuthRoute>} />
        <Route path="/update-password/:id" element={<AuthRoute> <UpdatePassword /> </AuthRoute>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} /> 

        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>

          <Route path="/dashboard/my-profile" element={<PrivateRoute> <MyProfile /> </PrivateRoute>} />
          <Route path="/dashboard/settings" element={<PrivateRoute> <Settings /> </PrivateRoute>} />

          <Route>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/cart" element={<PrivateRoute> <Cart /> </PrivateRoute>} />
                  <Route path="/dashboard/enrolled-courses" element={<PrivateRoute> <EnrolledCourses /> </PrivateRoute>} />
                </>
              )
            }
          </Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App;

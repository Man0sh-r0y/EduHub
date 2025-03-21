import toast from 'react-hot-toast';

import rzpLogo from '../../assets/Logo/EduHub_LOGO_2.png'
import { studentEndpoints } from '../apis';
import { apiConnector } from '../apiconnector';
import { resetCart } from '../../slices/cartSlice';
import { setPaymentLoading } from '../../slices/courseSlice'

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatach) {
    const toastId = toast.loading("Loaddig...")
    try {
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res) {
            toast.error("RazorPay SDK failed to load")
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
            {courses},
            {Authorization: `Bearer ${token}`,}
        )
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }
        
        console.log("PRINTING ORDERRESPONSE: ",orderResponse)
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "Eduhub",
            description: "Thank you for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email
            },
            handler: function(response) {
                // send successful mail to the Student
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token)
                // verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatach);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log("PAYMENT API ERROR.........", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {Authorization: `Bearer ${token}`}
        )
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR", error);
        // toast.error(error.response.data.message);
    }
}

// verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR......", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
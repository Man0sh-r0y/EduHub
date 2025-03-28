const {instance} =require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User')
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const crypto = require("crypto");
const CourseProgress = require('../models/CourseProgress');
require('dotenv').config();


exports.capturePayment = async(req, res) => {
    const { courses } = req.body;
    const { userId } = req.user.id;

    if(courses.length === 0) {
        return res.json({success: false, message: "Please Provide Course Id"});
    }

    let totalAmount = 0;

    for( const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success: false, meassage: "Could Not find the course"});
            }

            // const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(userId)) {
                return res.status(200).json({success: false, message: "Students is already Enrolled"});
            }

            totalAmount += course.price;;
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: error.meassage})
        }
    }

    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({success: true, message: paymentResponse})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Could not Initiate Order"});
    }
}

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId
    ) {
        return res.status(200).json({success: false, message: "Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature === razorpay_signature) {
        // Enroll course to student
            await enrollStudents(courses, userId, res);
        // return res
        return res.status(200).json({success: true, message: "Payment Veified"});
    }
    return res.status(500).json({success: false, message: "Payment Failed"});
}


const enrollStudents = async(courses, userId, res) => {
    if(!courses || !userId) {
        return res.status(400).json({success: false, message: "Please provide data for Courses or UserId"});
    }

    for (const courseId of courses) {
        try {
            // find the couurse and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: userId}},
                {new: true},
            )

            if(!enrolledCourse) {
                return res.status(500).json({success: false, message: "Course not Found"});
            }

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            })

            // find the student and add the course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }},
                {new: true},
            )

            // send mail to student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}` )
            )
            // console.log("Emial Sent Successfuly", emailResponse.response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({sucess: false, message: error.meassage})
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success: false, mesage: "Please provide all the fields"})
    }

    try{
        // find Student
        const enrolledStudent = await useReducer.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
            amount/100, orderId, paymentId),
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success: false, message: "Could not send email1"})
    }
}

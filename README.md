# EdTech Platform

This is Full Stack EdTech Platform built in modern Technology (MERN Stack)

## Test Users

Test Email id (for Student Profile):

Test Email Password (for Student Profile):

Test Email id (for Instructor Profile):

Test Email Password (for Instructor Profile):

## Know about Backend APIs

[Click Here for more information](./server/README.md)

## Razorpay Integration in Backend

> RazorPay Docs: [Click Here](https://razorpay.com/docs/)

### How Razorpay works in Node.Js?

- User Click on `Buy Now` button
- The `product id` is fetched and sent to the Server
- Product Price is fetched through this id from the database
- This price is sent to the RazorPay API along with additional details like `currency`, `receipt` etc
- An `order id` sent to the Response
- We are going to pass this `order id` to check out
- After succesfull payment, Razorpay send `razorpay_payment_id`, `razorpay_signature`, `razorpay_order_id` in response
- We send them in our server to verify payment
- After verifying payment, We perform post tasks which are needed to do (Like Give access of the Course to Student)

### Build Integration

**Payment Stages**:

1. `Payment Stage 1`: Order State is created and payment state is also created. (Cutomer clicks on Buy Now button and submits the payment information which is sent to Razorpay But the payment isn't processed at this stage)
2. `Payment Stage 2`: Order State is attempted and Payment state is authorized/faild (An order movesfrom created to attempted state when payment is first attempted. It remains in this state until apayment associated with the order is captured.)
3. `Payment Stage 3`: Order State is paid and Payment state is captured (After the payment moves to the captured state, the order moves to the paid state. No more payment requests are allowed after an order moves to the paid state. The order continues to be in this state even if the payment for this order is refunded.)

> Order is an important step in the payment process.
> An order should be created for every payment.
> You can create an order using the Orders API. It is a server-side API call. Know how toauthenticate Orders API.
> The `order_id` received in the response should be passed to the checkout. This ties the orderwith the payment and secures the request from being tampered.

### Follow the below steps to integrate your Node.js-based website/app with Razorpay Payment Gateway

1. **Install Razorpay Node.js SDK**: Open your project folder and run the following command on your command prompt to install the Razorpay Node.js SDK:

   ```bash
    npm install razorpay
   ```
2. **Instantiate Razorpay**:
   Add this code in the `config` directory of your backend code structure. This code snippet is importing the razorpay module in a Node.js application and then creating an instance of the Razorpay class. This instance is configured with the key_id and key_secret obtained from environment variables.

   ```js
    const Razorpay = require('razorpay'); 
    require('dotenv').config();

    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET
    });

    module.exports = instance; 
   ```
3. **Create an Order in Server**:
4. **Add Checkout Options**:
5. **Store Fields in Server**:
6. **Verify Payment Signature**:
7. **Verify Payment Status**:

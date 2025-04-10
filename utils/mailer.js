const nodemailer=require('nodemailer')
require('dotenv').config();
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
        
    },
});
 async function sendConfirmationEmail(to,{restaurantName,date,time}){
    const mailOptions={
        from:process.env.EMAIL_USER,
        to,
        subject:'Reservation Confirmation ✔️',
        html: `
        <h2>Your Table is Reserved!</h2>
        <p><strong>Restaurant:</strong> ${restaurantName}</p>
        <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p>Thank you for booking with us!</p>
      `,
    };
    await transporter.sendMail(mailOptions);
 }
 async function sendCancellationEmail(to,{restaurantName,date,time}){
    const mailOptions={
        from:process.env.EMAIL_USER,
        to,
        subject:'Cancellation Confirmation ✔️',
        html: `
        <h2>Your Table is Cancelled!</h2>
        <p><strong>Restaurant:</strong> ${restaurantName}</p>
        
     
      `,
    };
    await transporter.sendMail(mailOptions);
 }
 module.exports={sendConfirmationEmail,sendCancellationEmail};
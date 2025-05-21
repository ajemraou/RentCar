const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send reservation notification to admin
const sendReservationNotification = async (reservation, car) => {
  try {
    const { customerName, customerEmail, startDate, endDate, totalPrice } = reservation;
    const { name, model } = car;
    
    const message = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Car Reservation',
      html: `
        <h2>New Reservation Details</h2>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Car:</strong> ${name} ${model}</p>
        <p><strong>Dates:</strong> ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}</p>
        <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
        <p>Please log in to the admin panel to confirm this reservation.</p>
      `
    };
    
    await transporter.sendMail(message);
    console.log('Reservation notification email sent');
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = {
  sendReservationNotification
};
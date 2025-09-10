const BOOKING_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Booking Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table align="center" width="600" style="background: #ffffff; border-radius: 10px; padding: 20px;">
      <tr>
        <td align="center">
          <h2 style="color: #2b6cb0;">Booking Confirmation</h2>
        <p style="color: #555;">Dear {{user}}</p>
          <p style="color: #555;">Thank you for booking with <b>SammyLuxury Home</b></p>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-size: 15px; color: #333;">
            We are excited to confirm your booking. Below are your booking details:
          </p>

          <table width="100%" cellpadding="10" cellspacing="0" style="margin-top: 15px; border: 1px solid #eee;">
            <tr>
              <td><strong>Booking code:</strong></td>
              <td>{{booking}}</td>
            </tr>
            <tr>
              <td><strong>Room Type:</strong></td>
              <td>{{roomType}}</td>
            </tr>
            <tr>
              <td><strong>Check-In:</strong></td>
              <td>{{checkIn}}</td>
            </tr>
            <tr>
              <td><strong>Check-Out:</strong></td>
              <td>{{checkOut}}</td>
            </tr>
            <tr>
              <td><strong>Guests:</strong></td>
              <td>{{guests}}</td>
            </tr>
            <tr>
              <td><strong>Total Price:</strong></td>
              <td>₦{{totalPrice}}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; font-size: 14px; color: #555;">
            If you have any questions, feel free to contact us at 
            <a href="mailto:support@Sammyluxuryhome.com" style="color: #2b6cb0;">support@Sammyluxuryhome.com</a>.
          </p>

          <p style="margin-top: 20px; font-size: 12px; color: #888;">
            &copy; {{year}} SammyLuxury Home. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

module.exports = {BOOKING_CONFIRMATION_TEMPLATE};

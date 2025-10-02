import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  // Check if email config is available
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn('Email configuration not found. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Send welcome email after registration
export async function sendWelcomeEmail(email, userName) {
  try {
    const transporter = createTransporter();

    // If no transporter, skip sending email
    if (!transporter) {
      console.log('Skipping email send - no SMTP configuration');
      return { success: true, skipped: true };
    }

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Miko N8N'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Chào mừng bạn đến với Miko N8N Dashboard',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(135deg, #4fd1c7 0%, #38b2ac 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #4fd1c7;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Chào mừng đến với Miko N8N!</h1>
            </div>
            <div class="content">
              <h2>Xin chào ${userName || 'bạn'}!</h2>
              <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>Miko N8N Dashboard</strong>.</p>
              <p>Tài khoản của bạn đã được tạo thành công. Bây giờ bạn có thể:</p>
              <ul>
                <li>Tạo và quản lý workflow automation</li>
                <li>Kết nối với các API khác nhau</li>
                <li>Xây dựng các quy trình tự động hóa mạnh mẽ</li>
                <li>Truy cập marketplace với nhiều tính năng</li>
              </ul>
              <p>
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:8888'}/dashboard" class="button">
                  Truy cập Dashboard
                </a>
              </p>
              <p>Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.</p>
              <p>Chúc bạn có trải nghiệm tuyệt vời!</p>
              <p><strong>Đội ngũ Miko N8N</strong></p>
            </div>
            <div class="footer">
              <p>Email này được gửi tự động. Vui lòng không trả lời email này.</p>
              <p>&copy; 2025 Miko N8N. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Xin chào ${userName || 'bạn'}!

Cảm ơn bạn đã đăng ký tài khoản tại Miko N8N Dashboard.

Tài khoản của bạn đã được tạo thành công. Bây giờ bạn có thể:
- Tạo và quản lý workflow automation
- Kết nối với các API khác nhau
- Xây dựng các quy trình tự động hóa mạnh mẽ
- Truy cập marketplace với nhiều tính năng

Truy cập Dashboard: ${process.env.NEXTAUTH_URL || 'http://localhost:8888'}/dashboard

Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.

Chúc bạn có trải nghiệm tuyệt vời!

Đội ngũ Miko N8N
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error - we don't want to fail registration if email fails
    return { success: false, error: error.message };
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email, resetToken) {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.log('Skipping email send - no SMTP configuration');
      return { success: true, skipped: true };
    }

    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:8888'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Miko N8N'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Yêu cầu đặt lại mật khẩu',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { display: inline-block; padding: 12px 30px; background-color: #4fd1c7; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Đặt lại mật khẩu</h2>
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấp vào nút bên dưới để tiếp tục:</p>
            <a href="${resetUrl}" class="button">Đặt lại mật khẩu</a>
            <p>Hoặc copy link sau vào trình duyệt:</p>
            <p>${resetUrl}</p>
            <p>Link này sẽ hết hạn sau 1 giờ.</p>
            <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { success: false, error: error.message };
  }
}

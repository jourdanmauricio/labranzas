require('dotenv').config();

const config = {
  // App
  env: process.env.NODE_ENV || 'dev',
  adminFrontEnd: process.env.ADMIN_FRONTEND,
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,

  adminName: process.env.ADMIN_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPass: process.env.ADMIN_PASS,
  adminRole: process.env.ADMIN_ROLE,

  revalidateToken: process.env.REVALIDATE_TOKEN,
  jwtSecret: process.env.JWT_SECRET,

  domain: process.env.DOMAIN,
  apiFrontend: process.env.API_FRONTEND,

  mailerEmail: process.env.MAILER_EMAIL,
  mailerPassword: process.env.MAILER_PASSWORD,

  emailSend: process.env.EMAIL_SEND,
  emailSendPass: process.env.EMAIL_SEND_PASS,
  emailTo: process.env.EMAIL_TO,

  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.APP_SECRET,
  },
};

module.exports = { config };

export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  quantity_threshold: +process.env.QUANTITY_THRESHOLD,
  orderServiceBaseUrl: process.env.ORDER_APIS_BASE_URL || 'http://localhost:3002',
};

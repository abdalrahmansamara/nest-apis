# Combined README for Order APIs, Product APIs, and the App

## Overview
This project consists of three core components:

1. **Order APIs**: Manages customer orders, including creation, updates, and retrieval.
2. **Product APIs**: Handles product-related operations such as adding new products, updating existing ones, and fetching product details.
3. **App**: A front-end interface where users can interact with the system, create and manage dynamic forms.

## Prerequisites
Ensure you have the following installed:

- Node.js (v16+)
- npm
- Docker (optional, for containerized environments)

### Additional Tools
If you're using TypeScript, ensure the TypeScript compiler is installed globally:
```bash
npm install -g typescript
```

## Folder Structure
```
root/
├── order-apis/
├── product-apis/
├── dynamic-forms-app/
└── README.md
```

---

## Order APIs

### Description
The Order APIs allow you to perform CRUD operations on customer orders. These APIs are designed to work seamlessly with the Product APIs to provide a complete e-commerce backend solution.

### Key Features
- Create, update, and delete orders
- Fetch order details
- Link orders to products
- Authenticate and Authorize users

### Running the Order API
1. Navigate to the `order-api` directory:
   ```bash
   cd order-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3001`.

4. Run tests:
   ```bash
   npm test
   ```

---

## Authentication Users
To log in, use the following credentials, you can login from within both products and order apis under `host:port/jwt/login`

| Username | Password |
|----------|----------|
| admin    | crypto   |
| user     | crypto   |

---

## Product APIs

### Description
The Product APIs handle all product-related operations. This includes adding, updating, and retrieving product data.

### Key Features
- Add new products
- Update product information
- Retrieve product listings

### Running the Product API
1. Navigate to the `product-api` directory:
   ```bash
   cd product-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3002`.

4. Run tests:
   ```bash
   npm test
   ```

---

## App

### Description
The App is a front-end interface that allows users to interact with the system. It communicates with both the Order APIs and Product APIs to provide a seamless user experience.

### Key Features
- View product listings
- Place and manage orders
- Real-time updates

### Running the App
1. Navigate to the `app` directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will start at `http://localhost:3000`.

4. Run tests:
   ```bash
   npm test
   ```

---

## Docker Setup (Optional)

To run the postgres container:

1. Build the Docker images for each service:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up
   ```

3. Access the services:
   - Order API: `http://localhost:3001`
   - Product API: `http://localhost:3002`
   - App: `http://localhost:3000`

4. Stop the services:
   ```bash
   docker-compose down
   ```

---

## Environment Variables

Each component has a `.env` file where you can configure the following variables:

### Order API
```
DB_TYPE = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_USER = username
DB_PASSWORD = password
DB_NAME = master
PORT = 3001
JWT_SECRET="secretKey"
SESSION_SECRET="secretKey2"
```

### Product API
```
DB_TYPE = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_USER = username
DB_PASSWORD = password
DB_NAME = master
JWT_SECRET="secretKey"
SESSION_SECRET="secretKey2"
QUANTITY_THRESHOLD=10
```

### App
```
NEXT_PUBLIC_API_BASE_URL=http://localhost
```

---

## Testing

Each component has unit tests to ensure reliability. Run the tests using:
```bash
npm test
```

For integration tests, ensure the APIs and database services are running.

---

## Deployment

1. Build the production version of each component:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting service (e.g., AWS, Vercel, Netlify).

---

## Troubleshooting

1. **Port Conflicts**:
   - Ensure no other services are running on ports `3000`, `3001`, or `3002`.

2. **Database Issues**:
   - Verify that MongoDB is running locally or update the `DB_URL` in `.env` to point to the correct database.

3. **API Connectivity**:
   - Check that the APIs are reachable from the App by testing endpoints manually.

---

## Future Enhancements

- Add caching for improved performance.
- Implement GraphQL APIs for flexible querying.
- Improve test coverage and CI/CD pipelines.

---

## Contributors

- Abdelrahman Samara - Initial Development
- Abdelrahman Samara - API Integration

---
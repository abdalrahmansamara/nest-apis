# Order API

This API provides endpoints to manage orders in an e-commerce system. It allows you to create, read, update, and delete orders.

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Create Order](#create-order)
  - [Get All Orders](#get-all-orders)
  - [Get Order by ID](#get-order-by-id)
  - [Update Order](#update-order)
  - [Delete Order](#delete-order)
- [Error Handling](#error-handling)

## Base URL

The base URL for all endpoints is:

http://localhost:3001

## Authentication

- **JWT token** is required to access protected routes such as `create`, `update`, and `delete`.
- The token should be included in the `Authorization` header as `Bearer <token>`.

## Endpoints

### Create Order

- **POST** `/order`

Create a new order.

#### Request Body:

```json
{
{
    "shippingAddress": "shippingAddress",
    "billingAddress": "billingAddress",
    "products": [
        {
            "id": 1,
            "quantity": 1
        },
        {
            "id": 2,
            "quantity": 1
        }
    ]
}
}
```

#### Response

```json
{
    "id": 4,
    "customerId": "73ceb20b-ca2d-46d9-b12a-aba53eab903d",
    "customerName": "admin",
    "totalAmount": 19.98,
    "status": "Pending",
    "shippingAddress": "shippingAddress",
    "billingAddress": "billingAddress",
    "updated_at": "2025-01-26T08:19:21.549Z",
    "created_at": "2025-01-26T08:19:21.549Z",
    "orderProducts": [
        {
            "id": 7,
            "product": {
                "id": 1,
                "name": "product 1",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:35:30.376Z",
                "created_at": "2025-01-25T08:35:30.376Z"
            },
            "quantity": 1
        },
        {
            "id": 8,
            "product": {
                "id": 2,
                "name": "product 2",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:54:16.955Z",
                "created_at": "2025-01-25T08:54:16.955Z"
            },
            "quantity": 1
        }
    ]
}
```

### Get All Orders

- **GET** `/orders`

Fetch all orders.

#### Response

```json
[
{
    "id": 4,
    "customerId": "73ceb20b-ca2d-46d9-b12a-aba53eab903d",
    "customerName": "admin",
    "totalAmount": 19.98,
    "status": "Pending",
    "shippingAddress": "shippingAddress",
    "billingAddress": "billingAddress",
    "updated_at": "2025-01-26T08:19:21.549Z",
    "created_at": "2025-01-26T08:19:21.549Z",
    "orderProducts": [
        {
            "id": 7,
            "product": {
                "id": 1,
                "name": "product 1",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:35:30.376Z",
                "created_at": "2025-01-25T08:35:30.376Z"
            },
            "quantity": 1
        },
        {
            "id": 8,
            "product": {
                "id": 2,
                "name": "product 2",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:54:16.955Z",
                "created_at": "2025-01-25T08:54:16.955Z"
            },
            "quantity": 1
        }
    ]
}
]
```

### Get Order by ID

- **GET** `/order/:id`

Fetch an order by its ID.

#### Response

```json
{
    "id": 4,
    "customerId": "73ceb20b-ca2d-46d9-b12a-aba53eab903d",
    "customerName": "admin",
    "totalAmount": 19.98,
    "status": "Pending",
    "shippingAddress": "shippingAddress",
    "billingAddress": "billingAddress",
    "updated_at": "2025-01-26T08:19:21.549Z",
    "created_at": "2025-01-26T08:19:21.549Z",
    "orderProducts": [
        {
            "id": 7,
            "product": {
                "id": 1,
                "name": "product 1",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:35:30.376Z",
                "created_at": "2025-01-25T08:35:30.376Z"
            },
            "quantity": 1
        },
        {
            "id": 8,
            "product": {
                "id": 2,
                "name": "product 2",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:54:16.955Z",
                "created_at": "2025-01-25T08:54:16.955Z"
            },
            "quantity": 1
        }
    ]
}
```

### Update Order

- **PUT** /products/:id

Update an existing order by ID.

#### Parameters:

* id: The UUID of the product.

#### Request Body:
```json
{
    "billingAddress": "abc",
    "shippingAddress": "name"
}
```

#### Response:
```json
{
    "id": 4,
    "customerId": "73ceb20b-ca2d-46d9-b12a-aba53eab903d",
    "customerName": "admin",
    "totalAmount": 19.98,
    "status": "Pending",
    "shippingAddress": "shippingAddress",
    "billingAddress": "billingAddress",
    "updated_at": "2025-01-26T08:19:21.549Z",
    "created_at": "2025-01-26T08:19:21.549Z",
    "orderProducts": [
        {
            "id": 7,
            "product": {
                "id": 1,
                "name": "product 1",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:35:30.376Z",
                "created_at": "2025-01-25T08:35:30.376Z"
            },
            "quantity": 1
        },
        {
            "id": 8,
            "product": {
                "id": 2,
                "name": "product 2",
                "price": 9.99,
                "stock": 39,
                "archived": false,
                "updated_at": "2025-01-25T08:54:16.955Z",
                "created_at": "2025-01-25T08:54:16.955Z"
            },
            "quantity": 1
        }
    ]
}
```

### Delete Product

- **DELETE** /orders/:id

Delete an order by its ID.

#### Parameters:

* id: The id of the product.

### Response:
```json
{
  "message": "Order successfully deleted"
}
```

## Configuration

1. Create a `.env` file
    - Rename the [.env.sample](.env.sample) file to `.env` to fix it.
2. Edit env config
    - Edit the file in the [config](src/config)/envs folder.
    - `default`, `development`, `production`, `test`

## Installation

- npm install

## Development

```sh
npm run start:dev
```

OR

```sh
run debugger for vscode
```

Run [http://localhost:3001](http://localhost:3001)

## Test

```sh
npm test # exclude e2e
npm run test:e2e
```

## Production

```sh
npm run lint
npm run build
# define environment variable yourself.
# NODE_ENV=production PORT=8000 NO_COLOR=true node dist/app
node dist/app
# OR
npm start
```

## Folders

```js
+-- dist // Source build
+-- public // Static Files
+-- src
|   +-- config // Environment Configuration
|   +-- auth // Authentication
|   +-- common // Global Nest Module
|   |   +-- decorators // Nest Decorators
|   |   +-- filters // Nest Filters
|   |   +-- guards // Nest Guards
|   |   +-- middleware // Nest Middleware
|   |   +-- providers // Nest Providers
|   |   +-- * // models, repositories, services...
|   +-- shared // Shared Nest Modules
|   +-- * // Other Nest Modules, non-global, same as common structure above
+-- test // Jest testing
+-- typings // Modules and global type definitions

// Module structure
// Add folders according to module scale. If it's small, you don't need to add folders.
+-- src/greeter
|   +-- * // folders
|   +-- greeter.constant.ts
|   +-- greeter.controller.ts
|   +-- greeter.service.ts
|   +-- greeter.module.ts
|   +-- greeter.*.ts
|   +-- index.ts
```

## Implements

- See [bootstrap](src/app.ts), [app.module](src/app.module.ts)
  - Database, Module Router, Static Files, Validation, Pino Logger
- [Global Exception Filter](src/common/filters/exceptions.filter.ts)
- [Global Logging Context Middleware](src/common/middleware/logger-context.middleware.ts)
- [Custom Logger](src/config/logger.config.ts) with nestjs-pino
- [Configuration](src/config)
- [Authentication](src/auth) - JWT and Session login with Passport
- [Role-based Guard](src/common/guards/roles.guard.ts)
- Controller Routes
  - [Auth Login](src/base/controllers/auth.controller.ts)
- [E2E Test](test/e2e)
- [Shared Modules](src/shared) Example

## Documentation

```sh
npm run doc:api #> http://localhost:8000/api
```

### File Naming for Class

```ts
export class PascalCaseSuffix {} //= pascal-case.suffix.ts
// Except for suffix, PascalCase to hyphen-case
class FooBarNaming {} //= foo-bar.naming.ts
class FooController {} //= foo.controller.ts
class BarQueryDto {} //= bar-query.dto.ts
```

### Interface Naming

```ts
// https://stackoverflow.com/questions/541912
// https://stackoverflow.com/questions/2814805
interface User {}
interface CustomeUser extends User {}
interface ThirdCustomeUser extends CustomeUser {}
```

### Index Exporting

```diff
# It is recommended to place index.ts in each folder and export.
# Unless it's a special case, it is import from a folder instead of directly from a file.
- import { FooController } from './controllers/foo.controller';
- import { BarController } from './controllers/bar.controller';
+ import { FooController, BarController } from './controllers';
# My preferred method is to place only one fileOrFolder name at the end of the path.
- import { UtilService } from '../common/providers/util.service';
+ import { UtilService } from '../common';
```

#### Circular dependency

```diff
# Do not use a path that ends with a dot.
- import { FooService } from '.';
- import { BarService } from '..';
+ import { FooService } from './foo.service';
+ import { BarService } from '../providers';
```

## Error Handling

Our application employs robust error-handling practices to ensure smooth operation and clear communication of issues. Below is an overview of how errors are managed:

### General Approach
1. **Centralized Exception Handling:**
   - All exceptions are caught and handled centrally to ensure consistent error reporting and response formatting.

2. **Standardized Error Responses:**
   - Errors are returned in a uniform JSON format with details about the error type and a user-friendly message:
     ```json
     {
       "statusCode": 400,
       "message": "Invalid input data",
       "error": "Bad Request"
     }
     ```

3. **Logging:**
   - All errors are logged with relevant context for easier debugging and monitoring.

### HTTP Status Codes
Our API adheres to standard HTTP status codes for error responses:
- `400 Bad Request`: Validation errors or invalid inputs.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Access to the resource is denied.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: An unexpected server-side error occurred.

### Validation Errors
- **Request validation:** Handled using DTOs with decorators (e.g., `@IsString()`, `@IsInt()`) to ensure the payload meets the required criteria.
- Validation errors return a `400 Bad Request` status with detailed messages about the invalid fields.

### Example Error Handling in Code
```typescript
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  async processData(input: any): Promise<void> {
    if (!input.isValid) {
      throw new BadRequestException('Input data is invalid.');
    }
    // Process the input
  }
}

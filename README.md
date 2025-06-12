# Express.js Products API

A RESTful API built with Express.js that supports standard CRUD operations, middleware, error handling, filtering, pagination, and search for a `products` resource.

---

## Features

- **CRUD**: Create, Read, Update, Delete products
- **Middleware**: Logging, authentication, validation, error handling
- **Advanced**: Filtering by category, pagination, search by name, product statistics
- **API Key**: Secured endpoints with API key authentication

---

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd week-2-express-js-assignment-stacy-wk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```
   API_KEY=your_api_key_here
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

---

## Authentication

All `/api` routes require an API key in the request header:

```
x-api-key: your_api_key_here
```

---

## Product Object

```json
{
  "id": "uuid",
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Category Name",
  "inStock": true
}
```

---

## API Endpoints

### Hello World

- **GET /**  
  Returns: `"Hello World"`

---

### Products

- **GET /api/products**
  - List all products
  - Query params:
    - `category` (filter by category)
    - `search` (search by name)
    - `page` (pagination, default 1)
    - `limit` (pagination, default 10)
  - **Example:**  
    `/api/products?category=Electronics&search=phone&page=2&limit=5`

- **GET /api/products/:id**
  - Get a product by ID

- **POST /api/products**
  - Create a new product
  - **Body:**  
    ```json
    {
      "name": "Laptop",
      "description": "A fast laptop",
      "price": 1200,
      "category": "Electronics",
      "inStock": true
    }
    ```

- **PUT /api/products/:id**
  - Update an existing product
  - **Body:** Same as POST

- **DELETE /api/products/:id**
  - Delete a product

- **GET /api/products/stats**
  - Get product count by category

---

## Example Requests

**Create a product**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{"name":"Phone","description":"Smartphone","price":699,"category":"Electronics","inStock":true}'
```

**Get all products**
```bash
curl -H "x-api-key: your_api_key_here" http://localhost:3000/api/products
```

---

## Error Handling

- Returns JSON error responses with appropriate HTTP status codes.
- Example:
  ```json
  {
    "error": "NotFoundError",
    "message": "Product not found"
  }
  ```

---


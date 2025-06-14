
````markdown
# Med-x-plain-backend

> A brief description of your project.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [POST /signup](#post-signup)
- [POST /login](#post-login)
- [POST /extract-text](#post-extract-text)
- [POST /parse-lab-report](#post-parse-lab-report)
- [POST /explain](#post-explain)
- [POST /lab-report](#post-lab-report)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/Vivek1-coder/MedXplain-backend.git
cd yourrepo
````

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. (Optional) Configure environment variables in `.env`:

```env
PORT=4000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=gemini_api_key
# Add other environment variables as needed
```

---

## Usage

This backend provides authentication, OCR text extraction, and lab report parsing APIs.

You can send HTTP requests to the endpoints described below.

---

## API Routes

### POST `/api/signup`

Register a new user.

* **Headers:**
  `Content-Type: application/json`

* **Request Body:**

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

* **Success Response:**

  * **Code:** 201 Created
  * **Content:**

  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "userId": "unique_user_id"
  }
  ```

* **Error Responses:**

  * **Code:** 400 Bad Request
    **Content:** `{ "error": "Validation failed" }`
  * **Code:** 409 Conflict
    **Content:** `{ "error": "User already exists" }`

---

### POST `/api/login`

Authenticate a user and generate a JWT token.

* **Headers:**
  `Content-Type: application/json`

* **Request Body:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

* **Success Response:**

  * **Code:** 200 OK
  * **Content:**

  ```json
  {
    "success": true,
    "user": {
      "id": "unique_user_id",
      "username": "string",
      "email": "string"
    }
  }
  ```

* **Error Responses:**

  * **Code:** 400 Bad Request
    **Content:** `{ "error": "Validation failed" }`
  * **Code:** 401 Unauthorized
    **Content:** `{ "error": "Invalid credentials" }`

---

### POST `/images/extract-text`

Upload an image and extract text from it (OCR).

* **Headers:**
  `Content-Type: multipart/form-data`

* **Request Body:**
  Form-data with key `image` (image file)

* **Success Response:**

  * **Code:** 200 OK
  * **Content:**

  ```json
  {
    "success": true,
    "extractedText": "Extracted text goes here"
  }
  ```

* **Error Responses:**

  * **Code:** 400 Bad Request
    **Content:** `{ "error": "No image uploaded" }`
  * **Code:** 500 Internal Server Error
    **Content:** `{ "success": false, "error": "Failed to extract text" }`

---

### POST `/pdfs/parse-lab-report`

Upload a PDF lab report and extract structured data.

* **Headers:**
  `Content-Type: multipart/form-data`

* **Request Body:**
  Form-data with key `pdf` (PDF file)

* **Success Response:**

  * **Code:** 200 OK
  * **Content:**

  ```json
  {
    "success": true,
    "data": { /* parsed lab report data */ }
  }
  ```

* **Error Responses:**

  * **Code:** 400 Bad Request
    **Content:** `{ "error": "No PDF uploaded" }`
  * **Code:** 500 Internal Server Error
    **Content:** `{ "success": false, "error": "Failed to parse lab report" }`

---

### POST `/diagnosis/explain`

Provide explanation logic for submitted data.

* **Headers:**
  `Content-Type: application/json`

* **Request Body:**
  Describe the expected JSON structure here (customize based on your logic).

* **Success Response:**

  * **Code:** 200 OK
  * **Content:**

  ```json
  {
    "success": true,
    "explanation": "Explanation text here"
  }
  ```

* **Error Responses:**

  * **Code:** 400 Bad Request
    **Content:** `{ "error": "Invalid input" }`

---

### POST `/diagnosis/lab-report`

Handle lab report logic processing.

* **Headers:**
  `Content-Type: application/json`

* **Request Body:**
  Describe the expected JSON structure here.

* **Success Response:**

  * **Code:** 200 OK
  * **Content:**

  ```json
  {
    "success": true,
    "result": { /* processed lab report result */ }
  }
  ```

* **Error Responses:**

  * **Code:** 400 Bad Request
    **Content:** `{ "error": "Invalid input" }`

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

ISC.

```


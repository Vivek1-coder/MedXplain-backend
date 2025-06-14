````markdown
# Med-x-plain-backend

> A brief description of our project.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [POST /api/signup](#post-signup)
- [POST /api/login](#post-login)
- [POST /diagnosis/explain](#post-explain)
- [POST /diagnosis/lab-report](#post-lab-report)
- [POST /pdfs/analyze-lab-report](#post-lab-report-pdf)
- [POST /images/analyze-lab-report](#post-lab-report-imagge)
- [Contributing](#contributing)
- [License](#license)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Vivek1-coder/MedXplain-backend.git
cd your repo
```
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
GEMINI_API_KEY2=another_gemini_api_key(If an alternate key is not available, first key will be used as default.)
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

- **Headers:**
  `Content-Type: application/json`

- **Request Body:**

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Success Response:**

  - **Code:** 201 Created
  - **Content:**

  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "userId": "unique_user_id"
  }
  ```

- **Error Responses:**

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "Validation failed" }`
  - **Code:** 409 Conflict
    **Content:** `{ "error": "User already exists" }`

---

### POST `/api/login`

Authenticate a user and generate a JWT token.

- **Headers:**
  `Content-Type: application/json`

- **Request Body:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Success Response:**

  - **Code:** 200 OK
  - **Content:**

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

- **Error Responses:**

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "Validation failed" }`
  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "Invalid credentials" }`

---

### POST `/diagnosis/explain`

Provide explanation logic for submitted data.

- **Headers:**
  `Content-Type: application/json`

- **Request Body:**

  ```json
  {
    "query": "Your query string (for eg : Red eyes with High fever and headache)"
  }
  ```

- **Success Response:**

  - **Code:** 200 OK
  - **Content:**

  ```json
  {
    "success": true,
    "response": {
      "answer": "Medical implications based on the query string",
      "explaination": "describes the typical signs and symptoms that often appear in patients with this health issue, which likely influenced the result."
    }
  }
  ```

- **Error Responses:**

  - **Code:** 400 Bad Request
    **Content:** `{ success: false, message: "No Query Found!" }`

---

### POST `/diagnosis/lab-report`

Handle lab report logic processing.

- **Headers:**
  `Content-Type: application/json`

- **Request Body:**

  ```json
  {
    "metrices": {
      "WBC": {"value" :"14.2","normalRange":"100-150"},
      "Hemoglobin": {"value" :"9.1","normalRange":"100-150"},
      "Platelets": {"value" :"470","normalRange":"100-150"}
    },
    "remarks": "Patient reports fatigue and mild fever for the past week."
  }
  ```

- **Success Response:**

  - **Code:** 200 OK
  - **Content:**

  ```json
  {
    "success": true,
    "response": {
      "summary": "Elevated WBC count with low hemoglobin
      and high platelets suggest possible infection and
      anemia",
      "explanation": "The high white blood cell count
      indicates the body is fighting an infection or
      inflammation. The low hemoglobin level points to
       anemia which can cause fatigue. The high platelet
       count might be a reaction to the infection or a
       separate issue",
      "actionable_insights": [
        "Order a differential blood count to identify the
        type of infection",
        "Perform a complete blood count with peripheral smear
         to further assess anemia and rule out other blood
         disorders",
        "Check iron studies ferritin transferrin saturation
        to investigate iron deficiency anemia",
      ]
    }
  }
  ```

- **Error Responses:**

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "Invalid input" }`

---

### POST `/pdfs/analyze-lab-report`

Extracts text from the lab-report pdf and returns matrices and remarks extracted from the report .

- **Headers:**
  `Content-Type: application/json`

- **Request Body (form-data):**

  ```json
  {
    "pdf": "<uploaded pdf file>"
  }
  ```

- **Success Response:**

  - **Code:** 200 OK
  - **Content:**

  ```json
  {
    "success": true,
    "response": {
      "metrics": {
        "matrice1":{"value" :"val$","normalRange":"100-150"},
        "matrice2":{"value" :"val$","normalRange":"100-150"},
        "matrice3": {"value" :"val$","normalRange":"100-150"}
      },
      "remarks": "remarks "
    }
  }
  ```

- **Error Responses:**

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "Invalid input" }`

---

### POST `/images/analyze-lab-report`

Extracts text from the lab-report Image and returns matrices and remarks extracted from the report .

- **Headers:**
  `Content-Type: application/json`

- **Request Body (form-data):**

  ```json
  {
    "image":"<uploaded image>"
  }
  ```

- **Success Response:**

  - **Code:** 200 OK
  - **Content:**

  ```json
  {
    "success": true,
    "response": {
      "metrics": {
        "matrice1":{"value" :"val$","normalRange":"100-150"},
        "matrice2":{"value" :"val$","normalRange":"100-150"},
        "matrice3": {"value" :"val$","normalRange":"100-150"}
      },
      "remarks": "remarks "
    }
  }
  ```

- **Error Responses:**

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "Invalid input" }`

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

ISC.

```

```

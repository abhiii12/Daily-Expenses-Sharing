**Daily Expenses Sharing Application**

The Daily Expenses Sharing Application is a backend service that enables users to manage and share daily expenses. It allows splitting expenses among participants in three different ways: equal, exact amounts, or percentages. The system provides both individual and overall expense summaries and allows users to download balance sheets in CSV format.

**Features**

User Management: Add, retrieve, and manage user details.
Expense Management: Split expenses using equal amounts, exact amounts, or percentages.
Balance Sheet: Generate and download balance sheets that show detailed expense breakdowns.
Authentication (Bonus): JWT-based user authentication for secure access.

Technologies Used:

  Node.js (Backend)
  
  Express (Server Framework)
  
  MongoDB (Database)
  
  Mongoose (ODM for MongoDB)
  
  JWT (Authentication)
  
  bcrypt (Password hashing)

Getting Started

**1. Install dependencies**

   npm install
**2. Environment Setup**
   
  Create a .env file in the root directory with the following environment variables:
    
        PORT=5000
        
        MONGO_URI=mongodb://localhost:*****
        
        JWT_SECRET=yourSecretKey

   Replace MONGO_URI with your MongoDB connection string.
   
   Replace JWT_SECRET with a secret key for JWT authentication.
   
**3. Start the Server**

           npm start
           By default, the server will run on http://localhost:5000.

**4.API Endpoints**

  1. User Endpoints
     
     Create User
     
     URL: /api/users
     
     Method: POST
     
     Body:
     
             {
     
             "name": "John Doe",
     
             "email": "john@example.com",
             "mobile": "1234567890",
             "password": "password123"
             }
     Retrieve User Details
     
     URL: /api/users/:id
     
     Method: GET

2. Expense Endpoints
   
     Add Expense
   
     Equal Split
   
     URL: /api/expenses
   
     Method: POST
   
     Body:
   
               {
        "description": "Dinner",
        "amount": 3000,
        "splitMethod": "equal",
        "participants": [
          {"user": "userId1"},
          {"user": "userId2"},
          {"user": "userId3"}
           ]}
   Exact Split
   
   URL: /api/expenses
   
   Method: POST
   
   Body:
   
           {
          "description": "Shopping",
          "amount": 4299,
          "splitMethod": "exact",
          "participants": [
            {"user": "userId1", "amountOwed": 799},
            {"user": "userId2", "amountOwed": 2000},
            {"user": "userId3", "amountOwed": 1500}
          ]
        }
    Percentage Split
   
    URL: /api/expenses
   
    Method: POST
   
    Body:
   
           {
          "description": "Party",
          "amount": 4000,
          "splitMethod": "percentage",
          "participants": [
            {"user": "userId1", "percentage": 50},
            {"user": "userId2", "percentage": 25},
            {"user": "userId3", "percentage": 25}
          ]
        }
Retrieve User Expenses

      URL: /api/expenses/user/:userId
      Method: GET
Retrieve Overall Expenses

      URL: /api/expenses/overall
      Method: GET
Download Balance Sheet

      URL: /api/expenses/download
      Method: GET
  
      Response: Returns a CSV file with a detailed expense breakdown.
      
**Authentication**

For endpoints requiring authentication, send the JWT token in the Authorization header:

     Authorization: Bearer <JWT_TOKEN>
     
JWT tokens can be obtained during the user login process (not included in the basic setup).

**Error Handling**

The application includes basic error handling and validation:

    400 Bad Request: For missing fields or invalid inputs.
    401 Unauthorized: For unauthorized access (if authentication is implemented).
    500 Internal Server Error: For unexpected errors.

    
**Thank you for using the Daily Expenses Sharing Application!**

Personal Expense Tracker

1. Setup and Run Instructions

    A. Setup Instructions
     I. Clone the repository
        git clone:-  https://github.com/madhu-chinna/FlowwAssignment

2. Install dependencies
    A. npm install

3. Set up the database
    A. This application uses SQLite. You can initialize the database with tables when the server starts for the first time.

4. Start the server
    A. nodemon(or node) index.js
    The server will run on http://localhost:3008


API Endpoints
1. POST /transactions
    A. To Add a new transaction.
        I. URL: /transactions
        II. Method: POST
        III.Request Body
            {
                "type": "expense",
                "category": 1,
                "amount": 100.5,
                "date": "2024-10-22",
                "description": "Grocery shopping"
            }
        IV. Response Example:
            {
                "transactionId": 1
            }

2. GET /transactions
    A. To Retrieve all transactions.
        I. URL: /transactions
        II. Method: GET
        III. Response Example
            [
                {
                "id": 1,
                "type": "expense",
                "category": 1,
                "amount": 100.5,
                "date": "2024-10-22",
                "description": "Grocery shopping"
                }
            ]


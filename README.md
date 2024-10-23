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
            status code: 201 Created
            {
                "transactionId": 1
            }
            400 Bad Request (if data validation fails)
                {
                    "error": "Invalid input data"
                }

        

2. GET /transactions
    A. To Retrieve all transactions.
        I. URL: /transactions
        II. Method: GET
        III. Response Example
            status code: 200 OK
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

            500 Internal Server Error (if something goes wrong)


3. GET /transactions/
    A. To Retrieve transaction by ID.
        I. URL: /transactions/:id
        II. Method: GET
        III. URL Parameter: :id (integer) - ID of the transaction to retrieve.
        IV. Response:
            Status code: 200 OK
            {
                "id": 1,
                "type": "expense",
                "category": 1,
                "amount": 100.5,
                "date": "2024-10-22",
                "description": "Grocery shopping"
            }

            404 Not Found (if no transaction with the given ID)

4. PUT /transactions/
    A. To Update a specific transaction by ID.
        I. URL: /transactions/:id
        II. Method: PUT
        III. URL Parameter: :id (integer) - ID of the transaction to update.
        IV. Request Body:
            {
                "type": "expense",
                "category": 1,
                "amount": 100.5,
                "date": "2024-10-22",
                "description": "Grocery shopping"
            }
        V. Response:
            Status code: 200 OK
                {
                    "message": "Transaction updated successfully"
                }

            404 Not Found (if no transaction with the given ID)
            400 Bad Request (if validation fails)


5. DELETE /transactions/
    A. To Deletes a transaction by ID.
        I. URL: /transactions/:id
        II. Method: DELETE
        III. URL Parameter: :id (integer) - ID of the transaction to delete.
        IV. Response:
            Status code: 200 OK
                {
                    "message": "Transaction deleted successfully"
                }

            404 Not Found (if no transaction with the given ID)


6. GET /summary
    A. To Retrieve the summary of total income, total expenses, and the balance. We can filter the summary by date range or category.
        I. URL: /summary
        II. Method: GET
        III. Query Parameters (optional):
            a. startDate (optional, string, YYYY-MM-DD) - Filter transactions from this date.
            b. endDate (optional, string, YYYY-MM-DD) - Filter transactions until this date.
            c. category (optional, integer) - Filter transactions by category ID.
        IV. Response:
            Status code: 200 OK
            {
                "totalIncome": 0,
                "totalExpenses": 100.5,
                "balance": -100.5
            }

            500 Internal Server Error (if something goes wrong)


Postman Test Cases:

To test these APIs in Postman, follow these steps:

1. POST /transactions
    I. Set method to POST
    II. URL: http://localhost:3008/transactions
    III. In the Body tab, select raw and set type to JSON. Use the following request body:
        {
            "type": "expense",
            "category": 1,
            "amount": 100.5,
            "date": "2024-10-22",
            "description": "Grocery shopping"
        }

2. GET /transactions
    I. Set method to GET.
    II. URL: http://localhost:3008/transactions
    III. Send the request.

3. GET /transactions/
    I. Set method to GET.
    II. URL: http://localhost:3008/transactions/1 (replace 1 with the transaction ID).
    III. Send the request.

4. PUT /transactions/
    I. Set method to PUT.
    II. URL: http://localhost:3008/transactions/1 (replace 1 with the transaction ID).
    III. In the Body tab, select raw and set type to JSON. Use the same request body:
        {
            "type": "expense",
            "category": 1,
            "amount": 100.5,
            "date": "2024-10-22",
            "description": "Grocery shopping"
        }
    
5. DELETE /transactions/
    I. Set method to DELETE.
    II. URL: http://localhost:3008/transactions/1 (replace 1 with the transaction ID).
    III. Send the request.

6. GET /summary
    I. Set method to GET.
    II. URL: http://localhost:3008/summary.
    III. Optionally, add query parameters for date range or category.







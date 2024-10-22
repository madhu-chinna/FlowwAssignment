const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const path = require('path')
const {open} = require('sqlite')


const app = express()
const PORT = 3008;

const dbPath = path.join(__dirname, 'floww.db')

let db = null


const createTables = async () => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL
    );
  
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      category INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (category) REFERENCES categories(id)
    );
  `);
};

 
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    // Calling createTables after database connection is established
    await createTables();

    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`)
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// Middleware to parse JSON bodies
app.use(express.json())

// For Adding a new transaction (income or expense)
app.post('/transactions', async (req, res) => {
  const { type, category, amount, date, description } = req.body;

  try {
    const result = await db.run(
      `INSERT INTO transactions (type, category, amount, date, description) 
      VALUES (?, ?, ?, ?, ?)`, 
      [type, category, amount, date, description]
    );
    res.status(201).send({ transactionId: result.lastID });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// For Retrieving all transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await db.all(`SELECT * FROM transactions`);
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Retrieving a transaction by ID
app.get('/transactions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await db.get(`SELECT * FROM transactions WHERE id = ?`, [id]);
    if (transaction) {
      res.send(transaction);
    } else {
      res.status(404).send({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// For Updating a transaction by ID
app.put('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  try {
    const result = await db.run(
      `UPDATE transactions 
       SET type = ?, category = ?, amount = ?, date = ?, description = ? 
       WHERE id = ?`, 
      [type, category, amount, date, description, id]
    );
    if (result.changes > 0) {
      res.send({ message: "Transaction updated successfully" });
    } else {
      res.status(404).send({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// For Deleting a transaction by ID
app.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.run(`DELETE FROM transactions WHERE id = ?`, [id]);
    if (result.changes > 0) {
      res.send({ message: "Transaction deleted successfully" });
    } else {
      res.status(404).send({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Retrieving the summary of transactions
app.get('/summary', async (req, res) => {
  const { startDate, endDate, category } = req.query;

  let filters = [];
  let params = [];

  if (startDate) {
    filters.push("date >= ?");
    params.push(startDate);
  }
  if (endDate) {
    filters.push("date <= ?");
    params.push(endDate);
  }
  if (category) {
    filters.push("category = ?");
    params.push(category);
  }

  const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

  try {
    const income = await db.get(`SELECT SUM(amount) AS total_income FROM transactions WHERE type = 'income' ${whereClause}`, params);
    const expenses = await db.get(`SELECT SUM(amount) AS total_expenses FROM transactions WHERE type = 'expense' ${whereClause}`, params);

    const totalIncome = income.total_income || 0;
    const totalExpenses = expenses.total_expenses || 0;
    const balance = totalIncome - totalExpenses;

    res.send({
      totalIncome,
      totalExpenses,
      balance
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

  

module.exports = app

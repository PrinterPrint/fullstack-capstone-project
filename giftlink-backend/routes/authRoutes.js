// Step 1 - Task 2: Import necessary packages
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino'); // Import Pino logger

// Step 2: Initialize the router
const router = express.Router();

// Step 1 - Task 4: Load environment variables
dotenv.config();

// Step 1 - Task 3: Create a Pino logger instance
const logger = pino(); // Create a Pino logger instance

// Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// User Registration Route
// Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to the database
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        // Task 3: Check for existing email ID
        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        // Task 4: Save user details in the database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        // Task 5: Create JWT authentication with the user ID as the payload
        const payload = {
            user: {
                id: newUser.insertedId,  // Use the inserted user ID
            },
        };

        // Sign the JWT token with the secret key
        const authtoken = jwt.sign(payload, JWT_SECRET);

        // Log successful registration
        logger.info('User registered successfully');

        // Return the JWT token and email as a response
        res.json({ authtoken, email: req.body.email });
    } catch (e) {
        // Handle errors and log them using Pino
        logger.error('Error during registration:', e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;

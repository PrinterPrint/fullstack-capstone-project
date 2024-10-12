// Step 1 - Task 2: Import necessary packages
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // Task 1: Import express-validator
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

router.post('/login', async (req, res) => {
    console.log("\n\n Inside login")
    try {
        // const collection = await connectToDatabase();
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const theUser = await collection.findOne({ email: req.body.email });
        if (theUser) {
            let result = await bcryptjs.compare(req.body.password, theUser.password)
            if(!result) {
                logger.error('Passwords do not match');
                return res.status(404).json({ error: 'Wrong pasword' });
            }
            let payload = {
                user: {
                    id: theUser._id.toString(),
                },
            };
            const userName = theUser.firstName;
            const userEmail = theUser.email;
            const authtoken = jwt.sign(payload, JWT_SECRET);
            logger.info('User logged in successfully');
            return res.status(200).json({ authtoken, userName, userEmail });
        } else {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        logger.error(e);
        return res.status(500).json({ error: 'Internal server error', details: e.message });
    }
});

router.put('update', [
    body('email', 'Please enter a valid email').isEmail(),
    body('firstName', 'First name cannot be empty').notEmpty(),
    body('lastName', 'Last name cannot be empty').notEmpty(),
], async(req, res) =>{

    // Task 2: Validate the input and return an appropriate message if there is an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Task 3: Check if 'email' is present in the headers and throw an appropriate error if not present
        const email = req.headers.email;
        if (!email) {
            return res.status(400).json({ error: 'Email not found in the request headers' });
        }

        // Task 4: Connect to MongoDB (giftsdb)
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Task 5: Find user credentials in the database
        const existingUser = await collection.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Task 6: Update user credentials in the database
        const updatedUser = await collection.findOneAndUpdate(
            { email },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    updatedAt: new Date(),
                },
            },
            { returnDocument: 'after' }
        );

        // Task 7: Create JWT authentication using user._id as payload
        const payload = {
            user: {
                id: updatedUser.value._id.toString(),
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        // Return the JWT token and user details
        res.json({ authtoken, email: updatedUser.value.email });

    } catch (e) {
        console.error('Error during profile update:', e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;

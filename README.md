# Interviewer Instructions and API Keys

This document provides the necessary instructions and API keys to run and test the Phone Verification project on your local machine or via the deployed URL.

---

## Accessing the Deployed Application

The live API Gateway URL is:
https://hi6n4zcjrd.execute-api.us-east-1.amazonaws.com/


You can open the frontend interface directly if served statically from this backend or test API calls directly using this base URL.

---


## Running Locally

### Step 1: Clone the Repository


### Step 2: Install Dependencies
### Step 3: Configure Environment Variables

Create a `.env` file in the root folder with the below content:

MONGO_URI="YOUR MONGO URI/localhost"
PORT=3000

TWOFACTOR_API_KEY & JWT_SECRET is mentioned in the .env 
>  AS THIS IS A TEST PROJECT, I HAVE PROVIDED THE API KEYS AND INCLUDED THE .ENV FILE IN THE GITHUB REPO. 


> The `TWOFACTOR_API_KEY` provided here is a public demo key and will be deleted soon after the interview. Use only for testing.

---

### Step 4: Start the Server
node app.js

Open your browser and visit:

http://localhost:3000


---

## How to Use the Application

1. Enter your phone number with the country code (e.g., 9876543210) in the app.
2. Click on "Request OTP Code" and you should receive an OTP via SMS.
3. Enter the OTP in the field and click "Verify OTP".
4. On successful verification, you will be redirected to a thank you page.

---

## Important Notes

- The provided MongoDB URI requires your own Atlas password if running locally.
- The 2Factor API key is public and only for demo/demo purposes.
- For live testing, use the deployed API URL and no setup is needed.

---

Feel free to reach out if you have any issues running the app or accessing the deployed URL.
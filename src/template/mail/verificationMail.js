export function verificationMail(displayname, token) {
    return `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #181818; /* Dark background */
            color: #ffffff; /* Light text */
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #1f1f1f; /* Darker background for the email container */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Shadow for better contrast */
        }
        h1 {
            font-size: 24px;
            color: #ffffff; /* Light color for header */
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #cccccc; /* Lighter text for paragraphs */
            line-height: 1.5;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            font-size: 16px;
            background-color: #4CAF50; /* Green button for action */
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .btn:hover {
            background-color: #45a049; /* Slightly darker on hover */
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888888; /* Light gray for footer */
            margin-top: 40px;
        }
        .footer a {
            color: #888888;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .footer p {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, ${displayname}!</h1>
        <p>Thank you for signing up with mern2401LMS. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
        
        <a href="http://localhost:8000/api/v1/users/verify/${token}" class="btn">Verify Your Email</a>

        <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
        <p><a href="http://localhost:8000/api/v1/users/verify/${token}">http://localhost:8000/api/v1/users/verify/${token}</a></p>

        <p>By verifying your email, you will gain access to all of the features on your account and ensure your security. If you did not create an account with us, no further action is needed.</p>
        
        <p>If you have any questions or need assistance, please reach out to our support team at [Support Email].</p>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} mern2401LMS. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>

    `
}
{/* <p><a href="[Unsubscribe Link]">Unsubscribe</a> | <a href="[Privacy Policy Link]">Privacy Policy</a></p> */ }
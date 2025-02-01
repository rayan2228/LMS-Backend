import { APP_URL, PORT } from "../../constant.js";

export const userInfo = (username, password) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Credentials</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td align="center">
                <h2 style="color: #333;">Welcome to Our Platform</h2>
                <p style="color: #555;">Here are your login credentials:</p>
                <table border="0" cellspacing="0" cellpadding="10" style="background-color: #f9f9f9; border-radius: 5px; margin: 10px auto; padding: 10px;">
                    <tr>
                        <td><strong>Username:</strong></td>
                        <td>${username}</td>
                    </tr>
                    <tr>
                        <td><strong>Password:</strong></td>
                        <td>${password}</td>
                    </tr>
                </table>
                <p style="color: #555;">Please keep this information secure and change your password after logging in.</p>
                <a href="${APP_URL}:${PORT}/api/v1/users/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Login Now</a>
                <p style="color: #777; font-size: 12px; margin-top: 20px;">If you did not request this email, please ignore it.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}
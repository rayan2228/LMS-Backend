import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "rayan.cit.bd@gmail.com",
        pass: "yjos xqfh kics bvrr",
    },
});


export async function sendMail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: '"mern2401LMS 👻" <rayan.cit.bd@gmail.com>', // sender address
            to,
            subject,
            text,
            html
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}


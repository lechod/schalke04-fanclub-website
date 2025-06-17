const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Erlaube CORS für dein Frontend
app.use(cors());
app.use(bodyParser.json());

app.post('/kontakt', async (req, res) => {
  const { name, email, nachricht } = req.body;

  // Transporter für Gmail (oder anderen Anbieter)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deine-email@gmail.com',
      pass: 'dein-app-passwort'
    }
  });

  const mailOptions = {
    from: email,
    to: 'deine-email@gmail.com',
    subject: 'Neue Kontaktanfrage von der Vereinswebsite',
    text: `Name: ${name}\nE-Mail: ${email}\nNachricht:\n${nachricht}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Nachricht erfolgreich gesendet!' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Senden der Nachricht.', error });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
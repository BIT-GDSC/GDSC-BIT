const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { readdirSync } = require('fs');
const connectDatabase = require('./api/config/connectDatabase');

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Backend Routes
readdirSync("./api/routes").map((r) => app.use("/api/", require('./api/routes/' + r)));
app.get('/api/status', (req, res) => {
    res.status(201).json({
        success: true,
        msg: "Server Running",
    });
});

// Frontend Routes
app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'dist', 'index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
});

const PORT = process.env.PORT || 5000;
connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to PORT => ${PORT}`);
    })
});
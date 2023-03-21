const path = require('path')
const express = require('express')


const app = express()
app.use(express.static(path.join(__dirname, 'dist')))

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => console.log(`server running on ${PORT}`))
const express = require('express')

const app = express()

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => console.log(`server running on ${PORT}`))
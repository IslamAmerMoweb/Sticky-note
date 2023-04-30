require('dotenv').config()
const app = require('./app/runner')
app.listen(process.env.PORT, () => { console.log('hello from http://localhost:' + process.env.PORT); })
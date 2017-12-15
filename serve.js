const http = require('http')

const ecstatic = require('ecstatic')({
  root: __dirname,
  showDir: true,
  autoIndex: true,
})

const port = process.env.PORT || 3000

http.createServer(ecstatic).listen(port)

console.log(`Listening at :${port}`)

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get(`/tsts`, (req, res) => {
  res.sendFile(__dirname + '/tsts.html');
});
console.log('接続');
io.on('connection', (socket) => {
  //,totalをdbに登録
  socket.on('post-score3', (score3,total) => {
    //繋がった時に行われる動作
    console.log('score3: ' + score3);
    console.log('total: ' + total);
    io.emit('post-score3',score3 ,total);
  });
});

http.listen(PORT, () => {
});

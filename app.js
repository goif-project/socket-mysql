const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const connection = require('./mysqlConnection');
const PORT = process.env.PORT || 3000;

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get(`/tsts`, (req, res) => {
  res.sendFile(__dirname + '/tsts.html');
});
console.log('接続');
io.on('connection', (socket) => {
  //name登録
  socket.on('post-name', (name) => {
    //繋がった時に行われる動作
    console.log('name: ' + name);
    io.emit('post-name',name);
  });
  //score1登録
  socket.on('post-score1', (score1) => {
    //繋がった時に行われる動作
    console.log('score1: ' + score1);
    io.emit('post-score1',score1);
  });
  //score2登録
  socket.on('post-score2', (score2) => {
    //繋がった時に行われる動作
    console.log('score2: ' + score2);
    io.emit('post-score2',score2);
  });
  //score3,total登録、totalをdbに登録
  socket.on('post-score3', (score3,total) => {
    //繋がった時に行われる動作
    console.log('score3: ' + score3);
    console.log('total: ' + total);
    var query = 'INSERT INTO total_score (score, user_name) VALUES ("'+ total +'", ' + '"' + score3 + '")';
    connection.query(query, function(err, rows) {
      console.log("登録成功！！");
    });
    io.emit('post-score3',score3 ,total);
  });
});

http.listen(PORT, () => {
});

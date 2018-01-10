const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const connection = require('./mysqlConnection');
const PORT = process.env.PORT || 3000;

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    //繋がった時に行われる動作
    console.log('message: ' + msg);
    var query = 'INSERT INTO total_score (score, user_name) VALUES ("150", ' + '"' + msg + '")';
    connection.query(query, function(err, rows) {
      // res.redirect('/tsts');
      console.log("登録成功！！");
    });
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const connection = require('./mysqlConnection');
const PORT = process.env.PORT || 3000;

app.get(`/`, (req, res) => {
  // connection.query(query, function(err, rows) {
  //   connection.query(query2, function(err, rows2) {
  //     res.render('users', {
  //       title: 'ランキング',
  //       List: rows,
  //       Rank: rows2
  //     });
  //   });
  // });
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('接続成功');
  socket.on('chat message', (score,name) => {
    //繋がった時に行われる動作
    console.log('score: ' + score);
    console.log('name: ' + name);
    var query = 'INSERT INTO total_score (score, user_name) VALUES ("'+ score +'", ' + '"' + name + '")';
    connection.query(query, function(err, rows) {
      // res.redirect('/tsts');
      console.log("登録成功！！");
    });
    io.emit('chat message',score ,name);
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

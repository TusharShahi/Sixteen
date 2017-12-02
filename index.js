var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var fs = require('fs');


app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});


decks = { avengers : ["thor","hulk","captain america","iron man"] , 
          naruto : ["rock lee" , "naruto" , "sasuke", "neji"],
          akatsuki : ["itachi", "pain", "hidan", "kakuzu"],
          dc : ["superman", "batman", "flash", "green lantern"],
          dbz : ["goku", "vegeta", "picollo", "gohan"]
         };


io.on('connection', function(socket) {
    socket.emit('successfuljoin',decks);

   console.log('A user connected');
   //console.log("Socket is " + socket);
  // console.log(socket.id);
   console.log("------------------");

   socket.on('disconnect', function () {
      console.log('user ' + socket.id +  ' disconnected');
   });

   socket.on('buttonclick',function(data)
   {
      console.log('User has clicked button');
      console.log("data is " + data);
   });

    socket.on('join', function(data) {
        
      var numClients = 0;
      
      if(io.sockets.adapter.rooms[data.roomname])
      {
         console.log("ROOM exists");
         
             io.of('/').in(data.roomname).clients(function(error,clients){
         numClients=clients.length;
         console.log(numClients + " is the number of clients");
         
         console.log("all the clients are --- ");
         console.log(io.sockets.clients());
         console.log('rooms are');
        if(numClients < 4)
        {
            console.log("before joining, number of clients are " + numClients);
            socket.join(data.roomname);
          io.to(data.roomname).emit('joinedroom',io.sockets.adapter.rooms[data.roomname].playersname);
         
                                 socket.cards = [];
         socket.seatnumber = numClients;         
        socket.myroomname = data.roomname; 
        socket.username = data.username;
            console.log('-------');
            io.sockets.adapter.rooms[data.roomname].players.push(socket.id);
            io.sockets.adapter.rooms[data.roomname].playersname.push(data.username);
          console.log(io.sockets.adapter.rooms[data.roomname].players);
            console.log("client is currently in --");
            
            socket.decktype = io.sockets.adapter.rooms[data.roomname].owner.decktype;
   
            console.log("SUCCESFULLY JOINED ROOM");
            if(numClients == 3)
            {
               console.log(io.sockets.adapter.rooms[data.roomname].players);
               
               console.log("4 players have joined game is ready");
                       
               io.sockets.in(data.roomname).emit('gameisready', 'the game will start soon');
               var sockets = Object.keys(io.sockets.adapter.rooms[data.roomname].sockets);
               console.log(sockets);        
                 var numbersarray = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3];
                            
               console.log(' broadcast kara h');
                socket.broadcast.to(sockets[0]).emit('takefourpass',{array : numbersarray, socketlist : sockets });

            }

        }
        else
        {
            console.log('limit has exceeded');
            socket.emit('limitexceed','Max no of players reached');
        }
      });

          }

      else
      {

         console.log("ROOM does not exist");
         socket.emit('roomdoesnotexists',{'roomno' : data.roomname, 'text' : 'room does not exist'});
      
      }
 //    console.log("------------------");   
   // console.log("LIST OF ROOMS ");
     // console.log(io.sockets.adapter.rooms);   
    });


   socket.on('create',function(data)
   {
   var x = Math.random().toString(36).substr(2, 5);
   console.log("---------------------");
   console.log("created a room with name " + x);
   console.log(socket.rooms);
   socket.join(x);
   io.sockets.adapter.rooms[x].decktype = data.decktype;
   io.sockets.adapter.rooms[x].owner = socket;
   io.sockets.adapter.rooms[x].players = [];
   io.sockets.adapter.rooms[x].playersname = [];

   socket.seatnumber = 0;   
    socket.cards = [];
    socket.decktype = data.decktype;
    socket.username = data.username;
   
   io.sockets.adapter.rooms[x].players.push(socket.id);
   io.sockets.adapter.rooms[x].playersname.push(data.username);
   
   socket.myroomname = x; 
   socket.emit('createdroom',{roomid : x, decktype : data.decktype} );   
   
   });
  

socket.on('takefourpass',function(data)
{
      var i;
      for(i=0;i<4;i++)
      {
         index = Math.floor((Math.random() * (data.array.length )));
          console.log('index is ' + index);
            console.log(data.array);
         socket.cards.push(decks[socket.decktype][data.array[index]]);
         
         console.log(socket.id + ' has received ' + decks[socket.decktype][data.array[index]]);
      data.array.splice(index,1);
      }
      data.socketlist.splice(0,1);

      if(data.socketlist.length>0)
            socket.broadcast.to(data.socketlist[0]).emit('takefourpass',data);
      else
      {
         io.to(socket.myroomname).emit('gamecanbestarted', 'game can be started now');
      }       
});


socket.on('gamecanbestarted',function()
{
socket.emit('letsgo', socket.cards);
console.log('Less go');
console.log(io.sockets.adapter.rooms[socket.myroomname].owner.id);
socket.broadcast.to(io.sockets.adapter.rooms[socket.myroomname].owner.id).emit('yourchance','it is your chance');
console.log('broadcast has been done');
});


socket.on('next',function(data)
{
  //console.log(data);
  console.log(data + ' has been passed');
  socket.broadcast.to([io.sockets.adapter.rooms[socket.myroomname].players[(socket.seatnumber+1)%4]]).emit('yourchance',{card: data});
//  console.log('has been passed');

});

socket.on('victory',function()
{

         io.to(socket.myroomname).emit('gameover', socket.id);

});


});


http.listen(4000, function() {
   console.log('listening on *:4000');
});
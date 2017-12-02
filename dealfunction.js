 socket.on('deal',function(data)
   {


                     console.log(decks[io.sockets.adapter.rooms[x].decktype]);
               arrayofcards = decks[io.sockets.adapter.rooms[x].decktype];

            console.log('--------------------');
            console.log('--------------------');

              // console.log(io.sockets.adapter.rooms[x].players);
               arrayofclients = io.sockets.adapter.rooms[x].players;
               console.log(arrayofclients);
               console.log('--------------------');

               //var j = 0;
               var array = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3];
               var i = 0;
               //io.sockets.connected[socket.id].emit('privateMsg', 'hello this is a private msg');
   
                  socket.broadcast.to(arrayofclients[1]).emit('yourcards',{arrayofcards : array, totalnoofcards: 16});
                  
               
               //arrayofclients.forEach(function(socket)
               /*{
                  socket.cards = {};
               });

               console.log('--------------------');

               console.log(io.sockets.clients(data));
               for(var i=0;i<16;i++)
               {
    
    
      array.splice(index,1);

      if((i+1)%4==0) j++;

      }

               console.log('--------------------');
               console.log(io.sockets.clients(data));
*/

   });



 /*   socket.on('yourcards',function(data)
   {

      var i;
      for(i=0;i<4;i++)
      {
         index = Math.floor((Math.random() * (data.totalnoofcards - i)));
         //io.sockets.client(data)[j].cards[i%4] = arrayofcards[array[index]];
         socket.cards.push(decks[socket.decktype][data.arrayofcards[index]]);
         
         console.log(socket.id + ' has received ' + decks[socket.decktype][data.arrayofcards[index]]);
      data.arrayofcards.splice(index,1);

      data.totalnoofcards = data.totalnoofcards - 1;
      }
      x = (16 - totalnoofcards)/4 + 1;
      arrayofclients = io.sockets.adapter.rooms[x].players;


      if(data.totalnoofcards!=4)
            socket.broadcast.to(arrayofclients[x]).emit('yourcards',data);
      else
      {
         socket.broadcast.to(io.sockets.adapter.rooms[x].)
      }       
   });
*/

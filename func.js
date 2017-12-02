            console.log(decks[io.sockets.adapter.rooms[x].decktype]);
               arrayofcards = decks[io.sockets.adapter.rooms[x].decktype];

console.log('--------------------');
console.log('--------------------');


               console.log(io.sockets.adapter.rooms[data]);
              arrayofclients = io.sockets.adapter.rooms[data].sockets;
               console.log(arrayofclients);
               io.sockets.adapter.rooms[data].sockets.forEach(function(socket)
               {
                  socket.cards = {};
               });

               console.log('--------------------');

               console.log(io.sockets.clients(data));
               var j = 0;
               var array = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3];
               for(var i=0;i<16;i++)
               {
    
      index = Math.floor((Math.random() * (16 - i)));
      io.sockets.client(data)[j].cards[i%4] = arrayofcards[array[index]];
      array.splice(index,1);

      if((i+1)%4==0) j++;

      }

               console.log('--------------------');

               console.log(io.sockets.clients(data));

   
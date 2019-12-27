var order = require('../api/orders/socketOneMatch');
//var order = require('../api/orders/socket');

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log("Connected to Socket!!"+ socket.id);
        // buy request
        socket.on('order', (data) => {  
            // console.info("----------------",data);
            order.addOrder(data, io);
        });
    });
}
const io = require("socket.io")(8000,{
    cors:"http://localhost:5500"
})

const users = {}

io.on("connection",(socket)=>{
    socket.on("user-joined",(name)=>{
        users[socket.id] = name
        socket.broadcast.emit("new-user-joined",name)
    })

    socket.on("send",(msg)=>{
        socket.broadcast.emit("receive",{message:msg,name:users[socket.id]})
    })

    socket.on("disconnect", (name) =>{
        let name = users[socket.id]
    delete users[socket.id]
    socket.broadcast.emit("user-left","name")
})
})
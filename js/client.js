const socket = io("http://localhost:8000")

const first = document.querySelector(".first")
const messageInput = document.querySelector("#message")

const name = prompt("Enter Your Name :")

socket.emit("user-joined",name)

function generateMessage(message,side){
    let div = document.createElement("div")
    div.classList.add("alert")

    if(side==="left"){
        div.classList.add("alert-secondary")
        div.classList.add("left")
    }
    else if(side==="right"){
        div.classList.add("alert-primary")
        div.classList.add("right")
}
else{
        div.classList.add("alert-danger")
        div.classList.add("center")
}
div.innerHTML = message
first.appendChild(div)
}

socket.on("new-user-joined", (name) =>{
    if(name)
    generateMessage(`${name} joined the chat`,"center")
})

socket.on("user-left", (name) =>{
    if(name)
    generateMessage(`${name} left the chat`,"center")
})

socket.on("receive", (message,name) =>{
    generateMessage(`${name} : ${message}`,"left" )
})

function postData(){
    let msg = messageInput.value
    messageInput.value = ""

    generateMessage(`${msg}:You`,"right")
    socket.emit("send",msg)
}
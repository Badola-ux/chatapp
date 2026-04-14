const socket = io("http://localhost:8000")

const first = document.querySelector(".first")
const messageInput = document.querySelector("#message")

const name = prompt("Enter Your Name :")

if(name){
    socket.emit("user-joined", name)
}

// Generate message UI
function generateMessage(message, side){
    let div = document.createElement("div")

    if(side === "left"){
        div.classList.add("left")
    }
    else if(side === "right"){
        div.classList.add("right")
    }
    else{
        div.classList.add("center")
    }

    div.innerText = message
    first.appendChild(div)

    // auto scroll
    first.scrollTop = first.scrollHeight
}

// New user joined
socket.on("new-user-joined", (name) =>{
    generateMessage(`${name} joined the chat`, "center")
})

// User left
socket.on("user-left", (name) =>{
    generateMessage(`${name} left the chat`, "center")
})

// Receive message
socket.on("receive", (data) =>{
    generateMessage(`${data.name} : ${data.message}`, "left")
})

// Send message
function postData(){
    let msg = messageInput.value.trim()

    if(msg === "") return

    generateMessage(`You : ${msg}`, "right")

    socket.emit("send", msg)

    messageInput.value = ""
}
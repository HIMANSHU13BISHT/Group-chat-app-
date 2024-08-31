const socket = io();

document.querySelectorAll('.chat-container')[1].style.display = 'none';
const inputBox  = document.querySelector('.input-box');
const sendButton = document.querySelector('.send-btn');
const chat = document.querySelector('.chat');

sendButton.addEventListener('click',()=> {
    const TxtMsg = inputBox.value;
    inputBox.value ='';
    // console.log(TxtMsg);
    socket.emit('send-msg',{msg:TxtMsg});
    
})

socket.on('recieved-msg',(data)=> {
    const div = document.createElement('div')

    if(data.id === socket.id){
        div.classList.add('message','sender');
    }
    else{
        div.classList.add('message','receiver');
    }
    div.innerHTML = `<strong>${data.username}</strong> - <span>${data.msg}</span>`
    chat.append(div);
})

const LoginName = document.querySelector('#login-name');
const LoginBtn = document.querySelector('#login-btn');


LoginBtn.addEventListener('click',()=>{
    const username = LoginName.value;
    LoginName.value ='';
    if(username === ''){
        return;
    }

    socket.emit('login',{username});
    document.querySelectorAll('.chat-container')[0].style.display = 'none';
    document.querySelectorAll('.chat-container')[1].style.display = 'block';
})
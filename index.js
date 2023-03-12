
const openButton= document.querySelector('.chatbox__button');
const chatBox= document.querySelector('.chatbox__support');
const sendButton= document.querySelector('.send__button');
let state = false;
pickItem();

openButton.addEventListener('click', () => toggleState(chatBox))

function toggleState(chatbox) {
  state = !state;  

  // show or hides the box
  if(state) { 
      chatbox.classList.add('chatbox--active')
  } else {
      chatbox.classList.remove('chatbox--active')
  }
}

sendButton.addEventListener('click', () => onSendButton())

function onSendButton() {
  const inputField = document.getElementById("input");
  let input = inputField.value;
  inputField.value = "";
  if (input === "") {
    return;
}

fetch('./intents.json')
.then(result=>result.json())
.then(data => showInfo(data,input));
}


document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    let input = inputField.value;
    if (e.code === "Enter") {
      if(input != ""){
       
      inputField.value = "";
      fetch('./intents.json')
      .then(result=>result.json())
      .then(data => showInfo(data,input));
      }
    }
  });
});

function pickItem(){
  var items = document.querySelectorAll("#list li"),
  tab = [], index;
  console.log(items)

// add values to the array
for(var i = 0; i < items.length; i++){
tab.push(items[i].innerHTML);
}

// get selected element index
for(var i = 0; i < items.length; i++)
{
items[i].onclick = function(){
 
 index = tab.indexOf(this.innerHTML);
 console.log(this.innerHTML + " Index = " + index);
 console.log(this.innerHTML)
 fetch('./intents.json')
    .then(result=>result.json())
    .then(data => showInfo(data,this.innerHTML));


};
}
}


function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<div class="messages__item messages__item--visitor">${input}</div>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("div");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.className = "bot1 messages__item messages__item--operator"
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 1000
  )

}

function addChatList(input,product){
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<div class="messages__item messages__item--visitor">${input}</div>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("div");
  botDiv.id = "bot";
  // botText
  botDiv.className = "bot response";
  botText.className = "bot1 messages__item messages__item--operator"
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
  let textUl = document.createElement("ul")
  textUl.id = "list"
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = "";
    product.forEach(ele => {
      let textDiv = document.createElement("li");
      
      textDiv.innerHTML = ele;
      textUl.append(textDiv);
      // botText.innerText = `<div>${product}</div>`;
    textToSpeech(ele)
    });
    botText.append(textUl);
    pickItem();
  }, 1000
  )
  

  function pickItem(){
    var items = document.querySelectorAll("#list li"),
    tab = [], index;
    console.log(items)

// add values to the array
for(var i = 0; i < items.length; i++){
tab.push(items[i].innerHTML);
}

// get selected element index
for(var i = 0; i < items.length; i++)
{
items[i].onclick = function(){
   
   index = tab.indexOf(this.innerHTML);
   console.log(this.innerHTML + " Index = " + index);
   console.log(this.innerHTML)
   fetch('./intents.json')
      .then(result=>result.json())
      .then(data => showInfo(data,this.innerHTML));


};
}
}
}

// Including some new features



function showInfo(data,input){
var product,key;
for(let i= 0 ;i < data.intents.length; i++){

  product = compareRandom(data.intents[i].tag,data.intents[i].patterns,data.intents[i].responses,input);

  if (product) {
    console.log(product)
    key = "seccuss"
  }

}
console.log(key)
}

function compareRandom(tag,promptsArray, repliesArray, string) {
   
  let text = string.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
  .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
  .replace(/i feel /g, "")
  .replace(/whats/g, "what is")
  .replace(/please /g, "")
  .replace(/ please/g, "")
  .replace(/r u/g, "are you");

if (tag == "single") {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      if (promptsArray[x] === text) {
        let replies = repliesArray[Math.floor(Math.random() * repliesArray.length)];
        let tag = repliesArray[Math.floor(Math.random() * repliesArray.length)];
        reply = replies;
        console.log(reply)
        addChat(text, reply);
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
      if (replyFound) {
        
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply
  }else if(tag == "all"){
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      if (promptsArray[x] === text) {
        let replies = repliesArray;
        reply = replies;
        addChatList(text,reply)
        console.log(reply);
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }return reply
   }
    
  }


  // function for get started
 

const openButton= document.querySelector('.chatbox__button');
const chatBox= document.querySelector('.chatbox__support');
const sendButton= document.querySelector('.send__button');
let state = false;

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


document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});




function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span class="messages__item messages__item--visitor">${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botText.setAttribute("onclick", "move();");
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.className = "bot1 messages__item messages__item--operator"
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )

}

// Connecting to json server

fetch('./intents.json')
.then(result=>result.json())
.then(data => showInfo(data));

function showInfo(data){
console.log(data)

for(let i= 0 ;i < data.intents.length; i++){

  let product = compareRandom(data.intents[i].tag,data.intents[i].patterns,data.intents[i].responses,"social media");
  // console.log(data.intents[i].patterns)
  // console.log(data.intents[i].responses)
  if (product) {
  console.log(product)
  console.log(data.intents[i].tag)
  }

}

}

// test for compare request and responses
function compareRandom(tag,promptsArray, repliesArray, string) {
  if (["funny","emotions","name","faq","thanks","goodbye","greeting"].includes(tag)) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      // console.log(x)
      // console.log(promptsArray[x])
      if (promptsArray[x] === string) {
        let replies = repliesArray[Math.floor(Math.random() * repliesArray.length)];
        let tag = repliesArray[Math.floor(Math.random() * repliesArray.length)];
        reply = replies;
        // console.log(reply);
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply;
  }else{
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      // console.log(x)
      // console.log(promptsArray[x])
      if (promptsArray[x] === string) {
        let replies = repliesArray;
        reply = replies;
        // console.log(reply);
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply;
  }
    
  }



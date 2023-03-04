fetch('./intents.json')
.then(result=>result.json())
.then(data => showInfo(data));

function showInfo(data){
console.log(data)
console.log(data.intents.length)
console.log(data.intents[8].tag)
console.log(["funny","emotions","name","faq","thanks","goodbye","greeting"].includes(data.intents[8].tag));
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

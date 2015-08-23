var wsocket = new WebSocket('ws://localhost:8000/', 'echo-protocol');

wsocket.onmessage = function(event){
  var div = document.getElementById("output");
  var msg = JSON.parse( event.data );
  console.log(event);
  div.innerHTML = makeItReadable(msg.date) + '<br/><code>' + msg.text + '</code><br/>' + div.innerHTML ;
};

function makeItReadable(timestamp) {
  var date = new Date(timestamp);
  return date.toString();
};

// Send text to all users through the server
function sendText() {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
  var msg = {
    type: "message",
    text: document.getElementById("text").value,
    id:   '',
    date: Date.now()
  };

  // Send the msg object as a JSON-formatted string.
  wsocket.send(JSON.stringify(msg));

  // Blank the text input element, ready to receive the next line of text from the user.
  document.getElementById("text").value = "";
}

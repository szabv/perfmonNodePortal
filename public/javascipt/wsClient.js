var wsocket = new WebSocket('ws://localhost:8000/', 'echo-protocol');

wsocket.onmessage = function(event){
  console.log(event);
  var div = document.getElementById("output");
  var msg = JSON.parse( event.data );
  var counterInfo = msg.text;
  console.log(counterInfo);
  div.innerHTML = div.innerHTML + '<br/><h3>From Server:</h3><code>' + counterInfo.host + '</code>';
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

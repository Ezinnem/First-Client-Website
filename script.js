// when the using presses the submit button, change the greeting to include their name

//get access to the button and set up an event handler
alert("Hello and Welcome");

let button = document.getElementById("submit");
button.onclick = changeGreeting;


function changeGreeting(){
  let greeting = document.getElementsByTagName("h1")[0];
  let name = document.getElementById("name").value;
  greeting.innerHTML = "Hello, "+ name;
}
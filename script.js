function sendData(){

alert("Button working")

const name = document.getElementById("name").value
const email = document.getElementById("email").value
const message = document.getElementById("message").value

fetch("http://localhost:3000/contact", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name,
email,
message
})

})
.then(res => res.text())
.then(data => alert(data))

}
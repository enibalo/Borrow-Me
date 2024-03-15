function addTextMessage(message ){
    
    console.log(message);
    let  text = "Title:" + message.title + "<br />";
    text += "Author:" + message.author + "<br />";
    for (let i = 0; i < message.wait.length; i ++){
        text += "---------- <br />"
        text += "Wait time: " + message.wait[i].wait + " days <br />";
        text += "Type: " + message.wait[i].type + "<br />";
    }
    
    const p = document.createElement("p");

    const tick = document.createElement("div");
    tick.classList.add("tick");

    const div = document.createElement("div");
    div.appendChild(p);
    div.appendChild(tick);
    p.innerHTML = text;  
    document.querySelector(".main").appendChild(div);
};

//will onyl run when open so it must message broswer
//id thing is broken lol again 
//execute script instead for overdrive


chrome.tabs.query({active: true, lastFocusedWindow: true})
.then(function(tabs){
    let tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {type: "book-description"}, addTextMessage);
})
.catch( (error) => console.log("Popup failed to get current book description from active tab", error));
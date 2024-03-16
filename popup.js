function getWaitTime(wait){
    let result = "Wait time: ";
    let years = Math.floor(wait/365);
    wait = wait - (years * 365); 
    let months = Math.floor(wait/30); 
    wait = wait - (months * 30);
    let weeks = Math.floor(wait / 7);
    wait = wait - (weeks * 7);
    let days = wait; 

    if (years > 0){
        if ( years == 1){
            result += years + " year ";
        }else{
            result += years + " years ";
        }

    }

    if (months > 0){
        if ( months == 1 ){
            result += months + " month ";
        }else{
            result += months + " months ";
        }
    }

    if (weeks > 0){
        if (weeks == 1){
            result += weeks + " week ";
        }else{
            result += weeks + " weeks ";
        }
    }

    if (days > 0){
        if (days == 1){
            result += days + " day"; 
        }else{
            result += days + " days";
        }
    }

    return result;
}

function addTextMessage(message ){
    if (message == "") return;
    let  text = "Title: " + message.title + "<br />";
    text += "Author: " + message.author + "<br />";
    for (let i = 0; i < message.wait.length; i ++){
        text += "---------- <br />"
        text += getWaitTime(message.wait[i].wait) + "<br />";
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


chrome.tabs.query({active: true, lastFocusedWindow: true})
.then(function(tabs){
    let tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {type: "book-description"}, addTextMessage);
})
.catch( (error) => console.log("Popup failed to get current book description from active tab", error));
async function sendData(myAuthor, myTitle) {
    let myUrl = "https://calgary.overdrive.com/search/title?query=";
    myAuthor = myAuthor.toLowerCase();
    myTitle = myTitle.toLowerCase();

    myTitle.split().forEach( (word, index) =>{ 
        if (word == "&"){
            word = "%26";
        }
        myUrl += (word + "+")});
    
    myUrl = myUrl.slice(0,myUrl.length - 1);
    myUrl += "&creator="
    myAuthor.split().forEach( (word, index) => myUrl += (word + "+"));
    myUrl = myUrl.slice(0,myUrl.length - 1);
    myUrl += "&sortBy=newlyadded";
    
    
    await chrome.tabs.create({active: false, url: myUrl})
}

let availability = false; 

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse ){
    if (message.type == "query-overdrive"){
            sendData(message.author, message.title).catch( (error) => console.error("Error in creating tab", error));
    }
    else if (message.type == "send-query-results"){
        chrome.tabs.query({active:true, currentWindow: true })
        .then( (tabs) =>{
            chrome.tabs.sendMessage(tabs[0].id, {type: "update-goodreads", available: message.available})
        })
        .catch( (error) => console.error("Error in updating goodreads", error));
    }
});
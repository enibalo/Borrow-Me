async function sendData(myAuthor, myTitle) {
    const url = new URL("https://calgary.overdrive.com/search/title?");
    myAuthor = myAuthor.toLowerCase();
    myTitle = myTitle.toLowerCase();
    const params = new URLSearchParams(url.search);
    params.append("query", myTitle);
    params.append("creator", myAuthor);
    const newUrl = new URL(`${url.origin}${url.pathname}?${params}`).toString();
 
    //next step: check if overdrive already in page if so, re-use. 
    //set up ticket system, and alert tab when its their turn
    //also correct the URL, why %20 and not + showing up =( bot-like)
    console.log(newUrl);
    await chrome.tabs.create({active: false, url: newUrl})
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
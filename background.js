async function sendData(myAuthor, myTitle, tabID) {
    const url = new URL("https://calgary.overdrive.com/search/title?");
    myAuthor = myAuthor.toLowerCase();
    myTitle = myTitle.toLowerCase();
    const params = new URLSearchParams(url.search);
    params.append("query", myTitle);
    params.append("creator", myAuthor);
    const newUrl = new URL(`${url.origin}${url.pathname}?${params}`).toString();
    
    //next step: check if overdrive already in page if so, re-use. 
    //set up ticket system, and alert tab when its their turn;
    chrome.storage.session.get(["overdriveID"]).then( (items) => {
        chrome.tabs.update(parseInt(items.overdriveID), {url: newUrl, openerTabId: tabID});
    }).catch( (error) => {
        chrome.tabs.create({active: false, url: newUrl, openerTabId: tabID })
        .then( (tab) => {
            chrome.storage.session.set({"overdriveID": tab.id});
        })
        .catch((error) => { console.log("Creating overdrive tab failed", error)});
    });
}
//on tab deleted event  of overdriveID, then set overdriveID to nulll 

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse ){
    if (message.type == "query-overdrive"){
            sendData(message.author, message.title, sender.tab.id).catch( (error) => console.error("Error in creating tab", error));
    }
    else if (message.type == "send-query-results"){  
        chrome.tabs.sendMessage(sender.tab.openerTabId, {type: "update-goodreads", available: message.available}); 
    }
});
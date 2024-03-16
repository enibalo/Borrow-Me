async function sendData(myAuthor, myTitle, tabID) {
    const url = new URL("https://calgary.overdrive.com/search/title?");
    myAuthor = myAuthor.toLowerCase();
    myTitle = myTitle.toLowerCase();
    const params = new URLSearchParams(url.search);
    params.append("query", myTitle);
    params.append("creator", myAuthor);
    const newUrl = new URL(`${url.origin}${url.pathname}?${params}`).toString();
    
    chrome.storage.session.get(["overdriveID"]).then( (items) => {
        let id = parseInt(items.overdriveID);
        chrome.tabs.update(id, {url: newUrl, openerTabId: tabID}).catch((error) => {console.log("Messaging Overdrive tab failed" + myTitle, error) }); 
    })
    .catch((error) => {
        chrome.tabs.create({active: false, url: newUrl, openerTabId: tabID })
        .then( (tab) => {
            function listener(tabId, changeInfo, tab) {
                // make sure the status is 'complete' and it's the right tab
                if (tabId === tab.id && changeInfo.status == 'complete') {
                     chrome.scripting.executeScript({ target : {tabId : tab.id}, files : [ "overdrive.js" ] , injectImmediately: false});
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
            chrome.storage.session.set({"overdriveID": tab.id});
        })
        .catch((error) => { console.log("Creating overdrive tab failed", error)});
    });
}



/*
myTab => {
    function listener(tabId, changeInfo, tab) {
        // make sure the status is 'complete' and it's the right tab
        if (tabId === myTab.id && changeInfo.status == 'complete') {
             chrome.scripting.executeScript({ target : {tabId : tab.id}, files : [ "overdrive.js" ] , injectImmediately: false});
        }
    };
    chrome.tabs.onUpdated.addListener(listener);
}); */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse ){
    if (message.type == "query-overdrive"){
            sendData(message.author, message.title, sender.tab.id).catch( (error) => console.error("Error in creating tab", error));
    }
    else if (message.type == "send-query-results"){  
        chrome.tabs.sendMessage(sender.tab.openerTabId, {type: "update-goodreads", available: message.available, wait: message.wait, author: message.author, title: message.title})
        .catch((error) => {console.log("Messaging Goodreads failed", error) }); 
    }
});


chrome.tabs.onRemoved.addListener( function(tabId, removeInfo){
    chrome.storage.session.get(["overdriveID"]).then( (items) =>{
        if ( parseInt(items.overdriveID) == tabId ){
            chrome.storage.session.remove(["overdriveID"]);
        }
        });
    }
  )
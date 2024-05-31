// Creates a an overdrive tab which is used to check the availability of books. 
async function sendData(myAuthor, myTitle, tabID) {
    const url = new URL("https://calgary.overdrive.com/search/title?");
    myAuthor = myAuthor.toLowerCase();
    myTitle = myTitle.toLowerCase();
    const params = new URLSearchParams(url.search);
    params.append("query", myTitle);
    params.append("creator", myAuthor);
    const newUrl = new URL(`${url.origin}${url.pathname}?${params}`).toString();
    
    //Query the overdrive tab for the book's availability. 
    chrome.storage.session.get(["overdriveID"]).then( (items) => {
        let id = parseInt(items.overdriveID);
        chrome.tabs.update(id, {url: newUrl, openerTabId: tabID}).catch((error) => {console.log("Messaging Overdrive tab failed" + myTitle, error) }); 
    })
    .catch((error) => {
        //If the overdrive tab no longer exists, create a new one.
        chrome.tabs.create({active: false, url: newUrl, openerTabId: tabID })
        .then( (tab) => {
            //Attach a script, which checks the availaiblity of a book each time the overdrive tab is updated. 
            function listener(tabId, changeInfo, tab) {
                // Make sure the status is 'complete' and it's the right tab before executing a new search request.
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


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse ){
    //Handles an availability request from Goodreads    . 
    if (message.type == "query-overdrive"){
            sendData(message.author, message.title, sender.tab.id).catch( (error) => console.error("Error in creating tab", error));
    }
    //Handles returning a result of an availabilty request to Goodreads.  
    else if (message.type == "send-query-results"){  
        chrome.tabs.sendMessage(sender.tab.openerTabId, {type: "update-goodreads", available: message.available, wait: message.wait, author: message.author, title: message.title})
        .catch((error) => {console.log("Messaging Goodreads failed", error) }); 
    }
});

//Checks if the overdrive tab has been deleted, if so delete the saved tab id for overdrive. 
chrome.tabs.onRemoved.addListener( function(tabId, removeInfo){
    chrome.storage.session.get(["overdriveID"]).then( (items) =>{
        if ( parseInt(items.overdriveID) == tabId ){
            chrome.storage.session.remove(["overdriveID"]);
        }
        });
    }
  )
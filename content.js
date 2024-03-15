

//loads before the tab does if u dont ype quick enough! bug found 
//loads on every goodreadds and overdrive tab, so check for an element before messaging 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.type == "update-goodreads"){
        messagePopup = {wait : message.wait, author: message.author, title: message.title};
        if ( message.available == true){
            book_image.style.border = "5px solid #377458";
        }
        else{
            book_image.style.border = "5px solid red";
        }
    }

    if (message.type == "book-description"){
        sendResponse(messagePopup);
    }
    
});

/*chrome.scripting
    .insertCSS({
      target : {tabId : getTabId()},
      css : css,
    })
    .then(() => console.log("CSS injected")); */

//Start Goodreads. 

const web_title = document.querySelector("title");
const book_image = document.querySelector("img.ResponsiveImage");
let messagePopup = "";



if (web_title.textContent.search(/Goodreads/) !=  -1){ 
    const book_title = document.querySelector(".Text.Text__title1");
    const title = book_title.textContent;

    const book_author = document.querySelector(".ContributorLink__name");
    const author = book_author.textContent;
    let message = {type: "query-overdrive", author: author, title: title};
    chrome.runtime.sendMessage(message);
}



if (web_title.textContent.search(/OverDrive/) !=  -1){
    //next step (trivial): show the wait time for the book as well, add it to popup.html as a text message!
    const head = document.querySelector("head");
    const scripts = head.querySelectorAll("script");
    let [text] = scripts[7].textContent.match(/\[.*(?=;\n)/);
   
    
    let results = JSON.parse(text);
    let answer = false; 
    let wait = [];
    let author = results[0].firstCreatorName;
    let title = results[0].title;

    for (let i = 0; i < results.length; i ++ ){
        if( results[i].isAvailable == true){
                answer = true; 
                wait[i] = {"wait": 0, "type": results[i].type.name};        
        }
        else{
            wait[i] = {"wait": results[i].estimatedWaitDays , "type" : results[i].type.name};
        }
    } 
    let message = {type: "send-query-results", available: answer, wait: wait, author: author, title: title};
    chrome.runtime.sendMessage(message);
}

//End Goodreads




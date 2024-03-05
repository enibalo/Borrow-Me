
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.type == "update-goodreads"){
        console.log(message);
        if ( message.available == true){
            book_image.style.border = "5px solid #377458";
        }
        else{
            book_image.style.border = "5px solid red";
        }
    }
    
});

/*chrome.scripting
    .insertCSS({
      target : {tabId : getTabId()},
      css : css,
    })
    .then(() => console.log("CSS injected")); */

//Start Goodreads. 

const title = document.querySelector("title");
const book_image = document.querySelector("img.ResponsiveImage");

if (title.textContent.search(/Goodreads/) !=  -1){
    //next step (trivial): insert css to have more permanent changes. 
    const book_title = document.querySelector(".Text.Text__title1");
    const title = book_title.textContent;

    const book_author = document.querySelector(".ContributorLink__name");
    const author = book_author.textContent;

    let message = {type: "query-overdrive", author: author, title: title};
    chrome.runtime.sendMessage(message);
}
// try one minute cooling period?
// add catch blocks to error stuff 

if (title.textContent.search(/OverDrive/) !=  -1){
    //next step (trivial): show the wait time for the book as well, add it to popup.html as a text message!
    const head = document.querySelector("head");
    const scripts = head.querySelectorAll("script");
    let [text] = scripts[8].textContent.match(/\[.*(?=;\n)/);
    console.log(text);
    
    let results = JSON.parse(text);
   
    let answer = false; 
    for (let i = 0; i < results.length; i ++ ){
        console.log("traversal of json");
        console.log(results[i]);
    if( results[i].isAvailable == true){
            answer = true;
            break;         
    }
    } 
    let message = {type: "send-query-results", available: answer};
    chrome.runtime.sendMessage(message);

}

//End Goodreads




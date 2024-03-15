
 
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







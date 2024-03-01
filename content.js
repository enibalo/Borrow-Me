


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
    const book_title = document.querySelector(".Text.Text__title1");
    const title = book_title.textContent;

    const book_author = document.querySelector(".ContributorLink__name");
    const author = book_author.textContent;

    let message = {type: "query-overdrive", author: author, title: title, }
    chrome.runtime.sendMessage(message);
}


if (title.textContent.search(/OverDrive/) !=  -1){
    const head = document.querySelector("head");
    const scripts = head.querySelectorAll("script");
    const [text] = scripts[7].textContent.match(/\[.[^;]*/);
    const results = JSON.parse(text);

    let answer = false; 
    for (let i = 0; i < results.length; i ++ ){
    if( results[i].isAvailable == true){
            answer = true;
            break;
    }
    } 
    let message = {type: "send-query-results", available: answer };
    chrome.runtime.sendMessage(message);

}

//End Goodreads
 


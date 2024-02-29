//Send author and title to server
//The server will respond with the books availibility 
function sendData(author, title, book_image) {
    let url = "https://calgary.overdrive.com/search/title?query=";

    title.split().forEach( (word, index) => url += (word + "+"));
        
    url += "&creator="
    author.split().forEach( (word, index) => url += (word + "+"));
    url = url.slice(0,url.length - 1);
    
    let params = {selected: false, url: url};
    const tab = await(chrome.tabs.create(params));
    let message = {"author" : author, "title" : title};
    params = {tabId : tab.id, message : message};
    chrome.tabs.sendMessage(params)
    .then(function(response){
        if (response == null){
            throw new Error("MESSAGE FAILED: Response was null");
        }
        else{
            if ( data.available == "1"){
                book_image.style.border = "5px solid #377458";
            }
            else{
                book_image.style.border = "5px solid red";
            }
         }
    }).catch(function(error ){
        console.error("Error:", error )});

}
//div.title-container title - for card containing titleactionbutton
//script 6 
//script 8 : window.OverDrive.titleCollection
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse ){
    let head = document.querySelector("head");
    let scripts = head.querySelectorAll("script");
    let script = scripts[7];
    let text = script.textContent;
    
    let available = false; 
    
        if (buttons.textContent == "Borrow"){
            available = true; 
        }
    
});
//Collect necessary data from Goodreads page
const book_image = document.querySelector("img.ResponsiveImage");

const book_title = document.querySelector(".Text.Text__title1");
const title = book_title.textContent;

const book_author = document.querySelector(".ContributorLink__name");
const author = book_author.textContent;

sendData(author, title, book_image);

requestData(author, title, book_image);





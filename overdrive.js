    //Checks for a  book's avaialbilty on Overdrive. 
    const head = document.querySelector("head");
    const scripts = head.querySelectorAll("script");
    let [text] = scripts[5].textContent.match(/\[.*(?=;\n)/);
   
    
    let results = JSON.parse(text);
    let answer = false; 
    let wait = [];

    //By default if the book is not in the library directory the book details will be the following.
    wait[0] = {"wait": -1, "type": "The library doesn't have this book."};        ; 

    let author = "Error";
    let title = "Error";

    for (let i = 0; i < results.length; i ++ ){
        if( results[i].isAvailable == true){
            //To handle times when Overdrive returns some incorrect books after it returns the correct one. 
            if (results[0].title == results[i].title){
                answer = true; 
                wait[i] = {"wait": 0, "type": results[i].type.name};        
            }
        }
        else{
            wait[i] = {"wait": results[i].estimatedWaitDays , "type" : results[i].type.name};
        }
    } 

    if (results.length > 0){
        author = results[0].firstCreatorName;
        title = results[0].title;
    }

    let message = {type: "send-query-results", available: answer, wait: wait, author: author, title: title};
    chrome.runtime.sendMessage(message);

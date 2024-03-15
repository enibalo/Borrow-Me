
    
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

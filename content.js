


fetch("https://calgary.overdrive.com/search?query=A+Bigger+Prize+margaret+heffernan") 
    .then(function(response) {
       
        return response.text();

    })
    .then( function(html){
        
        let parser = new DOMParser();
       
        const doc = parser.parseFromString(html, "text/html");
        const loan_status = doc.querySelector("section#search");
        console.log(loan_status);
        return 1;
    });

const book_image = document.querySelector("img.ResponsiveImage");

book_image.style.border = "2px solid red";

const book_title = document.querySelector(".Text.Text__title1");

book_title.style.color = "red";

let text = book_title.textContent;




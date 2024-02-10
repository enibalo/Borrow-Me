//Send author and title to server
//The server will respond with the books availibility 
function sendData(author, title, book_image) { 
    let data = title + " " + author;
    fetch('http://127.0.0.1:5000/available', {
        method: 'POST',
        body: JSON.stringify({ "data": data }),
        headers: {
        'Content-Type': 'application/json'
        }
        })
        .then(function(response){
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text()})
        .then(function(text){ 
            //If book is available make the border green, if not make it red  
            if ( text == "1"){
                book_image.style.border = "2px solid green";
            }
            else{
                book_image.style.border = "2px solid red";
            }
            })
        .catch(error => {
        console.error('Error:', error);
        });
    }


//Collect necessary data from Goodreads page
const book_image = document.querySelector("img.ResponsiveImage");

const book_title = document.querySelector(".Text.Text__title1");
const title = book_title.textContent;

const book_author = document.querySelector(".ContributorLink__name");
const author = book_author.textContent;

sendData(author, title, book_image);



//Send author and title to server
function sendData(author, title, book_image) { 
    let data = title + " " + author
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
            console.log(response)
            return response.text()})
        .then(function(text){  
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


const book_image = document.querySelector("img.ResponsiveImage");
//book_image.style.border = "2px solid red";

const book_title = document.querySelector(".Text.Text__title1");
const title = book_title.textContent;

const book_author = document.querySelector(".ContributorLink__name");
const author = book_author.textContent;

sendData(author, title, book_image);




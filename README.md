This is Borrow Me! 

A Chrome extension which automatically checks the availability of Goodreads books at the Calgary Public Library (CPL). 
Spoiler! Most of the time they are unavailable, but this extension is meant to make the treasure hunt for your next book easier. 

Motivation
I created this extension because all the books I was interested in on Goodreads were always unavailable ( like  a 4-month wait unavailable) once I switched tabs to check the Calgary Public Library Overdrive.
To reduce the time spent looking for a book, and increase the time I spent actually reading it I created Borrow Me. 

QuickStart
This extension uses the following Python packages, so you have to download them if you don't have them using pip: 
Flask, Selenium, Beautiful Soup, and lxml

1. Download a zip package from Git and unzip it.
2. Remove the app.py file and place it outside of the borrow-me folder you unzipped. (Chrome extensions can not have py files in them).
3. Open the path file of app.py inside your terminal.
4. Execute the following tasks to turn on the Flask Server:
  export FLASK_APP=app.py 
  export FLASK_ENV=development 
  flask run
  (If you are on Windows use set instead of export)
5. Go to: chrome://extensions/ and turn on Developer mode.
6.  Click on load unpacked, and select the borrow-me folder you unzipped. You've added Borrow Me to your extensions!
7.  Go to a Goodreads page that contains /book/show in the URL. Finally, Borrow-Me! might be in allow-access in your extension so click on it to give it full-access.
8.  Wait around 8s, the book will be highlighted red (unavailable)  or green (available). 

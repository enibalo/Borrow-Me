# This is Borrow Me! 

A Chrome extension which checks the availability of Goodreads books at the Calgary Public Library. 
Spoiler! Most of the time they are unavailable, but this extension is meant to make the treasure hunt for your next book easier. 

# 🌟 Motivation
I created this extension because I wanted to reduce the time I spent looking for a book ( and switching tabs), and increase the time I spent reading.

# 🚀 QuickStart
This extension uses the following Python packages, download them if you don't have them using pip: 
Flask, Selenium, Beautiful Soup, and lxml

1. Download a zip package from Git and unzip it.
2. Remove the app.py file and place it outside of the borrow-me folder you unzipped. (Chrome extensions can not have py files in them).
3. Execute the following command in the terminal: cd C:/{your_path_file_to_folder_which_has_app.py} inside your terminal.
4. Once you're in the same directory of app.py in the terminal. Execute the following commands to turn on the Flask Server:
  * export FLASK_APP=app.py (If you are on Windows use set instead of export)
  * python -m flask run 
5. Go to: chrome://extensions and turn on Developer mode.
6. Click on the "load unpacked" button, and select the borrow-me folder you unzipped. Done! You've added Borrow Me to your extensions.
7. Go to a Goodreads page that contains "/book/show" in the URL. Finally, Borrow-Me! might be in allow-access in your extension ( check by clicking the puzzle piece button on Chrome) so click on it to give it full access.
9. Wait around 8s, the book will be highlighted red (unavailable)  or green (available).
*The Flask Server is responsible for searching the Overdrive website, it must be turned on for the extension to work*

![image](https://github.com/enibalo/Borrow-Me/assets/49178664/bd8c99a8-16f0-44ae-92e4-81625b905fcd)




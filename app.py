from flask import Flask, render_template, request, jsonify
from selenium import webdriver
from selenium.webdriver import ChromeOptions
from bs4 import BeautifulSoup
from flask_cors import cross_origin
import lxml


app = Flask(__name__, template_folder="templates")

@app.route("/") 
def hello(): 
    return render_template('index.html') 

@app.route("/available", methods=['POST'])
@cross_origin()
def get_availability():
    data = request.json
    available = str(is_available( data["author"], data["title"]))
    response = jsonify({"available" : available})
    return response

def is_available(author, title):
    chrome_options = ChromeOptions()
    chrome_options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=chrome_options)

    url = "https://calgary.overdrive.com/search/title?query="
    for word in title.split():
        url += (word + "+")
    url += "&creator="
    for word in author.split():
        url += (word + "+")

    #Drop the extra/uneccesary '+' at the end of generated keyword 
    url = url[:len(url) - 1]

    driver.get(url)
    soup = BeautifulSoup(driver.page_source, "lxml")

    #Check whether the book is owned by the library by searching for a TitleActionButton in web page
    buttons =  soup.find_all("button", class_="TitleActionButton")
    available = False 
    for button in buttons:
        #If a book is found, see if the action buttion is set to Borrow 
        if (button.string[0] == "B"):
            available = True 
            break

    driver.quit()

    return int(available)

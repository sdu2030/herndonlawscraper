from flask import Flask
from article_finder import *

app = Flask(__name__)

@app.route('/')
def index():
  return('Elder Law Answers Article Finder')


@app.route(/'postarticle', methods=['GET', 'POST'])
def post_article():
  if request.method == 'POST':
    data = request.get_json()
    username = data['username']
    password = data['password']
    article_finder = Article_Finder(username, password)

    try:
      article_finder.sign_in()
      article_finder.find_article()
    except:
      return "An error occurred. Please try again."
    
    return "Article posted."

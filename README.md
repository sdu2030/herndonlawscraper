# Herndon Law Web Scraper

**Description**

Herndon Law, P.C. is subscribed to Elder Law Answers, a service that writes articles for the blogs of law firms. This project automates the process of posting an article from Elder Law Answers using Python and Javascript. The project contains a script written in Python using the Selenium library, which logs into Elder Law Answers, pulls the most recent article written, and posts it to the website. The script is used within a Flask app as an API. The Chrome extension stores the login information of the user, and every Monday, sends a POST request to the API telling it to post an article. The extension was created using HTML and Javascript.

**Features**

* Logs into Elder Law Answers with the supplied user information
* Finds the most recent article written
* Posts to the attorney blog
* Stores login information for the user
* Finds a new article every Monday, if the article exists on Elder Law Anwers

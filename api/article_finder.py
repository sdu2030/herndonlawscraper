#imports
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait 

class Article_Finder:
  WEBSITE = 'https://attorney.elderlawanswers.com/login'

  def __init__(self, username, password):
    chrome_options = Options();
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    self.driver = webdriver.Chrome('chromedriver', options=chrome_options)

    #Login details for Elder Law Answers
    self.username = username
    self.password = password


  def gen_xpath(self, tagname, attribute, value):
    return f"//{tagname}[@{attribute}='{value}']"
    
  def sign_in(self):
    self.driver.get(self.WEBSITE)
    self.driver.save_screenshot("screenshot.png")
    self.driver.add_cookie({"name": "dashboardNewFeatureModal", "value": "true"})
    self.driver.add_cookie({"name": "seen_overlay", "value": "true"})
   

    #Enter username
    user_field = self.driver.find_element_by_id("id")
    user_field.send_keys(self.username)

    #Enter password
    pass_field = self.driver.find_element_by_id("password")
    pass_field.send_keys(self.password)

    #Click submit
    self.driver.find_element_by_xpath(self.gen_xpath('button', 'type', 'submit')).click()
    

  def find_article(self):
    #Scroll to article box
    time.sleep(2)
    self.driver.execute_script("window.scrollTo(0,800);")
    
    #Find avaliable articles
    article_xpath = self.gen_xpath('a', 'target', '_blank')
    articles = self.driver.find_elements_by_class_name('article')
    self.driver.save_screenshot("screenshot.png")

    #Get article title
    article_name = articles[0].text.split(' ')

    #Find article link
    link = self.driver.find_element_by_partial_link_text(article_name[0])
    source = link.get_attribute('href')
    self.driver.get(source)

    wordpress = self.driver.find_elements_by_xpath("//div[@class='article-toolbar']/a")
    wordpress[4].click()

 

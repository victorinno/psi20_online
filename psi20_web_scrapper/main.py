import schedule
import time
import requests
from bs4 import BeautifulSoup
import pymongo

myclient = pymongo.MongoClient("mongodb://mongo:27017/")
mydb = myclient["psi20_online"]
stocks = mydb["stocks"]


def get_stocks():
    website = requests.get("https://finance.yahoo.com/quote/PSI20.LS/components?p=PSI20.LS").text
    soup = BeautifulSoup(website, 'lxml')
    table = soup.find('table', {'class': 'W(100%) M(0) BdB Bdc($finLightGray)'})
    tbody = table.find('tbody')
    for line in tbody.find_all('tr'):
        columns = line.find_all('td')
        f = float(columns[2].text)
        name = columns[0].text
        find_by_name = {"name": name}
        stock = stocks.find_one(find_by_name)
        # pprint(stock)
        print(stock)
        if stock is None:
            stocks.insert_one({'name': name, 'currPrice': f, 'histPrices': [], 'v': 1})
            print("{} -> {}: V{}".format(name, f, 1))
        else:
            if 'v' not in stock:
                stock['v'] = 0
            update_query = {"$set": {"currPrice": f, 'v': stock['v'] + 1}}
            stocks.update_one(find_by_name, update_query)
            print("{} -> {}: V{}".format(name, f, stock['v'] + 1))


schedule.every(15).seconds.do(get_stocks)

while True:
    # Checks whether a scheduled task
    # is pending to run or not
    schedule.run_pending()
    time.sleep(1)

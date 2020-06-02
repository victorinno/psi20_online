FROM python:3.8-slim

COPY main.py main.py

# RUN apt-get update
# RUN apt-get install idle3 -y
# RUN apt-get install idle-python3.7 -y

# RUN pip install backports.functools-lru-cache
RUN pip install beautifulsoup4
RUN pip install bs4
RUN pip install certifi
RUN pip install chardet
RUN pip install idna
RUN pip install lxml
RUN pip install pymongo
RUN pip install requests
RUN pip install schedule
RUN pip install soupsieve
RUN pip install urllib3

CMD python ./main.py
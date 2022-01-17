import requests
import csv
from bs4 import BeautifulSoup


def get_soup(url):
    response = requests.get(url)
    if response.status_code != 200:
        return None
    return BeautifulSoup(response.content, 'html.parser')


def import_csv(file_name):
    with open(file_name, 'r', encoding='UTF-8') as f:
        lines = csv.reader(f)
        ret = []
        for line in lines:
            ret.append(line)
        return ret


def export_csv(data, file_name):
    with open(file_name, 'w', encoding='UTF-8') as f:
        writer = csv.writer(f)
        writer.writerows(data)

import os

import log
from const import SUBJECTS_DATA, BASE_URL
from utils import import_csv, export_csv, get_soup


def start(url, id, subjects):
    soup = get_soup(url)
    if soup is None:
        return

    table = soup.find(id='planTable')
    body = table.find('tbody')
    tr_tags = body.find_all('tr')
    year = None
    semester = None
    for tag in tr_tags:
        tds = tag.find_all('td')
        if len(tds) > 3:

            name = tds[0].text
            pre = tds[1].text
            aud = tds[2].text
            don = tds[3].text
            ost = tds[4].text
            espb = tds[5].text
            subjects.append([len(subjects) + 1, name, pre, aud, don, ost, espb, year, semester, id])
        elif len(tds) == 1:
            spans = tds[0].find_all('span')
            year = spans[0].text
            semester = spans[1].text



def scrap(programs):
    subjects = []
    for index, program in enumerate(programs):
        if program[3] != '' and program[3] is not None:
            start(BASE_URL + str(program[3]), program[1], subjects)
        log.loading(index + 1, len(programs))
    export_csv(subjects, SUBJECTS_DATA)
    return subjects


def scrap_subjects(programs):
    file_subjects_exists = os.path.exists(SUBJECTS_DATA)

    if file_subjects_exists:
        subjects = import_csv(SUBJECTS_DATA)
        print("File loaded...")
    else:
        subjects = scrap(programs)
    return subjects
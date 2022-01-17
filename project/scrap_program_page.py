import os

import log
from const import PERSONS_DATA, BASE_URL, SUBJECTS_DATA
from utils import get_soup, export_csv, import_csv


def scrap_program_main_page(url, program_id, persons):
    soup = get_soup(url)
    if soup is None:
        return

    div = soup.find(id='odgovorniTab-1')
    td_tags = div.find_all('td')
    img_url = td_tags[0].find('img')['src']
    role = td_tags[1].string
    name = td_tags[2].find('a').string
    professor_type = td_tags[2].find('small').string
    button_tags = td_tags[3].find_all('button')
    number = ''
    email = ''
    for btn in button_tags:
        if "glyphicon-earphone" in btn.span["class"]:
            number = btn.text
        elif "glyphicon-envelope" in btn.span["class"]:
            email = btn.string

    persons.append([len(persons) + 1, name, img_url, role, professor_type, number, email, program_id])


def scrap_programs(programs):
    persons = []
    for index, program in enumerate(programs):
        if program[3] != '' and program[3] is not None:
            scrap_program_main_page(BASE_URL + str(program[3]), program[1], persons)
        log.loading(index + 1, len(programs))
    export_csv(persons, PERSONS_DATA)
    return persons


def scrap_program_page(programs):
    file_persons_exists = os.path.exists(PERSONS_DATA)

    if file_persons_exists:
        persons = import_csv(PERSONS_DATA)
        print("File loaded...")
    else:
        persons = scrap_programs(programs)


    return persons

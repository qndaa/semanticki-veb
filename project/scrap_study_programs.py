import os

import log
from const import STUDY_PROGRAMS_DATA, BASE_URL, START_URL
from utils import import_csv, export_csv, get_soup


def get_basic_info_ulr(url):
    soup = get_soup(url)
    if soup is None:
        return None
    string = soup.find(string='Osnovne informacije')
    a = string.find_parent('a')
    return a['href']


def update_programs_with_url(programs):
    for index, program in enumerate(programs):
        program.append(get_basic_info_ulr(BASE_URL + program[2]))
        log.loading(index + 1, len(programs))


def get_study_programs(url):
    soup = get_soup(url)
    td_tag = soup.find(id='conv_links_sp')
    td_tag = td_tag.find_next_sibling('div')
    a_links = list(td_tag.find_all('a'))
    return [[index + 1, a.string, a['href']] for index, a in enumerate(a_links)]


def scrap_study_programs():
    file_study_programs_exists = os.path.exists(STUDY_PROGRAMS_DATA)
    if file_study_programs_exists:
        study_programs = import_csv(STUDY_PROGRAMS_DATA)
        print("File loaded...")
    else:
        study_programs = get_study_programs(BASE_URL + START_URL)
        update_programs_with_url(study_programs)
        export_csv(study_programs, STUDY_PROGRAMS_DATA)

    return study_programs

import os.path

from scrap_program_page import scrap_program_page
from scrap_study_programs import scrap_study_programs
from scrap_subjects import scrap_subjects
import jinja2

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir), autoescape=True)


def scrap():
    programs = scrap_study_programs()
    persons = scrap_program_page(programs)
    subjects = scrap_subjects(programs)

    template = jinja_env.get_template('Module.xml')

    with open('1.5.txt', 'w', encoding='UTF-8') as f:
        f.write(template.render(persons=persons, subjects=subjects, programs=programs))

    print(programs)
    print("\n\n")
    print(persons)
    print("\n\n")
    print(subjects)
    print("\n\n")

    return 0

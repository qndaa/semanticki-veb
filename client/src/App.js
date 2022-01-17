import Buttons from "./Buttons";
import Content from "./Content";
import {useState} from "react";
import api from "./virtuoso/api";


function App() {

    const [response, setResponse] = useState('');
    const [selectedButton, setSelectedButton] = useState(-1);

    const queries = [
        {
            title: "Imena svih rukovodioca:",
            query: "prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#> prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n" +
                "prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "\n" +
                "select ?e as ?professors\n" +
                "where {\n" +
                "  ?s ?p owl:Person .\n" +
                "  ?s rdf:label ?e\n" +
                "}",
            htmlQuery: (`<p class="text-danger" xmlns="http://www.w3.org/1999/html">prefix owl: http://www.w3.org/2000/10/swap/pim/contact# <br/>
                prefix aiiso: http://purl.org/vocab/aiiso/schema# </br>
                prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br> </br>
                select ?e as ?professors</br>
                where {</br>
                &nbsp; ?s ?p owl:Person .</br>
                &nbsp; ?s rdf:label ?e</br>  
                }</p>`)
        },

        {
            title: "Svi predmeti koji imaju font casova 1:",
            query: 'select ?lecture_font where { ?lecture_font <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#lecture_font> 1}',
            htmlQuery: ('<p class="text-danger"> select ?lecture_font <br/>where { <br/> &nbsp; ?lecture_font <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#lecture_font> 1 <br/>}</p>')
        }, {
            title: "Prikaz svih rukovodioca koji su 'Vanredni profesori':",
            query: 'prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n' +
                'prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n' +
                'prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n' +
                'prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n' +
                '\n' +
                'select ?e as ?professors\n' +
                'where {\n' +
                '  ?s ?p owl:Person .\n' +
                '  ?s rdf:label ?e .\n' +
                '  ?s ont:professor_type "Vanredni profesor"^^<http://www.w3.org/2001/XMLSchema#string>\n' +
                '}',
            htmlQuery: `<p class="text-danger"> prefix owl: http://www.w3.org/2000/10/swap/pim/contact# <br/>
                        prefix aiiso: http://purl.org/vocab/aiiso/schema# <br/>
                        prefix rdf: http://www.w3.org/2000/01/rdf-schema# <br/>
                        prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# <br/> <br/>
                        select ?e as ?professors <br/>
                        where { <br/>
                        &nbsp;  ?s ?p owl:Person . <br/>
                        &nbsp;  ?s rdf:label ?e . <br/>
                        &nbsp;  ?s ont:professor_type "Vanredni profesor"^^ http://www.w3.org/2001/XMLSchema#string <br/>
                        } </p>`

        }, {
            title: "Svi predmeti koji imaju broj auditornih vjezbi 3 ili 4 casa:",
            query: 'prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n' +
                'prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n' +
                'prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n' +
                'prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n' +
                '\n' +
                'select ?y as ?Subjects\n' +
                'where {\n' +
                '  ?s ont:font_auditing_exercises ?o .\n' +
                '  ?s aiiso:name ?y FILTER(?o = 3 || ?o = 4)\n' +
                '}',
            htmlQuery: '<p class="text-danger"> prefix owl: http://www.w3.org/2000/10/swap/pim/contact#\n </br>' +
                'prefix aiiso: http://purl.org/vocab/aiiso/schema# </br>\n' +
                'prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br>\n' +
                'prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# </br> </br>\n' +
                '\n' +
                'select ?y as ?Subjects\n </br>' +
                'where { </br>\n' +
                '&nbsp;  ?s ont:font_auditing_exercises ?o . </br>\n' +
                '&nbsp;  ?s aiiso:name ?y FILTER(?o = 3 || ?o = 4) </br>\n' +
                '} </p>'
        }, {
            title: 'Prikaz svih predmeta koji imaju dva ili vise testova:',
            query: 'prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n' +
                'prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n' +
                'prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n' +
                'prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n' +
                '\n' +
                'select ?e as ?subject_name, count(*) as ?number_of_tests\n' +
                'where {\n' +
                '  ?s ?p ont:Test .\n' +
                '  ?s aiiso:part_of ?y .\n' +
                '  ?y aiiso:name ?e\n' +
                '}\n' +
                '\n' +
                'GROUP BY ?e\n' +
                'HAVING count(?e) >= 2',
            htmlQuery: '<p class="text-danger"> prefix owl: http://www.w3.org/2000/10/swap/pim/contact# </br>\n' +
                'prefix aiiso: http://purl.org/vocab/aiiso/schema# </br>\n' +
                'prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br>\n' +
                'prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# </br> </br>\n' +
                '\n' +
                'select ?e as ?subject_name, count(*) as ?number_of_tests </br>\n' +
                'where { </br>\n' +
                '&nbsp;  ?s ?p ont:Test . </br>\n' +
                '&nbsp;  ?s aiiso:part_of ?y . </br>\n' +
                '&nbsp;  ?y aiiso:name ?e </br>\n' +
                '} </br>\n' +
                '\n' +
                'GROUP BY ?e </br>\n' +
                'HAVING count(?e) >= 2 </br> </p>'
        }, {
            title: "Prikaz broja odgovora za svako pitanje: ",
            query: "prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n" +
                "prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n" +
                "prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n" +
                "\n" +
                "select ?t as ?question, count(?t) as ?number_of_answers\n" +
                "where {\n" +
                "  ?s ?p ont:00023 .\n" +
                "  ?s aiiso:part_of ?y .\n" +
                "  ?y foaf:title ?t\n" +
                "}\n" +
                "\n" +
                "GROUP BY ?t",
            htmlQuery: "<p class='text-danger'> prefix owl: http://www.w3.org/2000/10/swap/pim/contact#\n </br>" +
                "prefix aiiso: http://purl.org/vocab/aiiso/schema#  </br>\n" +
                "prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br>\n" +
                "prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# </br> </br>\n" +
                "\n" +
                "select ?t as ?question, count(?t) as ?number_of_answers </br>\n" +
                "where {\n" +
                "&nbsp;  ?s ?p ont:00023 . </br>\n" +
                "&nbsp;  ?s aiiso:part_of ?y . </br>\n" +
                "&nbsp;  ?y foaf:title ?t </br>\n" +
                "} </br>\n" +
                "\n" +
                "GROUP BY ?t </p>"
        }, {
            title: "Prikaz broja studenata koji su polagali testove:",
            query: "prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n" +
                "prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n" +
                "prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n" +
                "prefix foaf: <http://xmlns.com/foaf/0.1/>\n" +
                "\n" +
                "select ?l as ?Test, count(?l) as ?number_of_exams\n" +
                "where {\n" +
                "  ?s ?p ont:TestHistory .\n" +
                "  ?s aiiso:part_of ?w .\n" +
                "  ?w rdf:label ?l .\n" +
                "  ?s foaf:member ?n\n" +
                "}\n" +
                "\n" +
                "GROUP BY (?l)\n",
            htmlQuery: "<p class='text-danger'> prefix owl: http://www.w3.org/2000/10/swap/pim/contact# </br>\n" +
                "prefix aiiso: http://purl.org/vocab/aiiso/schema# </br>\n" +
                "prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br>\n" +
                "prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# </br>\n" +
                "prefix foaf: http://xmlns.com/foaf/0.1/ </br> </br>\n" +
                "\n" +
                "select ?l as ?Test, count(?l) as ?number_of_exams </br>\n" +
                "where { </br>\n" +
                "\"&nbsp;  ?s ?p ont:TestHistory . </br>\n" +
                "\"&nbsp;  ?s aiiso:part_of ?w . </br>\n" +
                "\"&nbsp;  ?w rdf:label ?l . </br>\n" +
                "\"&nbsp;  ?s foaf:member ?n </br>\n" +
                "} </br>\n" +
                "\n" +
                "GROUP BY (?l) </br>\n </p>",
        }, {
            title: "Prosjecan, maksimalan i minimalan broj bodova po svim testovima:",
            query: "prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n" +
                "prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n" +
                "prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n" +
                "prefix foaf: <http://xmlns.com/foaf/0.1/>\n" +
                "\n" +
                "select ?t as ?test, avg(?o) as ?avg_point, max(?o) as ?max_points, min(?o) as ?min_points\n" +
                "where {\n" +
                "  ?s ont:points ?o .\n" +
                "  ?s aiiso:part_of ?q .\n" +
                "  ?q rdf:label ?t\n" +
                "}\n" +
                "\n" +
                "GROUP BY ?t",
            htmlQuery: "<p class='text-danger'> prefix owl: http://www.w3.org/2000/10/swap/pim/contact# </br>\n" +
                "prefix aiiso: http://purl.org/vocab/aiiso/schema# </br>\n" +
                "prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br>\n" +
                "prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# </br>\n" +
                "prefix foaf: http://xmlns.com/foaf/0.1/ </br>\n" +
                "\n" +
                "select ?t as ?test, avg(?o) as ?avg_point, max(?o) as ?max_points, min(?o) as ?min_points </br>\n" +
                "where { </br>\n" +
                "&nbsp;  ?s ont:points ?o . </br>\n" +
                "&nbsp;  ?s aiiso:part_of ?q . </br>\n" +
                "&nbsp;  ?q rdf:label ?t </br>\n" +
                "} </br>\n" +
                "\n" +
                "GROUP BY ?t </p>",
        } , {
            title: "Ukupno polozenih i nepolozenih izlazaka po testu:",
            query: "prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n" +
                "prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n" +
                "prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n" +
                "prefix foaf: <http://xmlns.com/foaf/0.1/>\n" +
                "\n" +
                "select ?t as ?test, sum(?o > 50) as ?failed, sum(?o < 50) as ?passed\n" +
                "where {\n" +
                "  ?s ont:points ?o .\n" +
                "  ?s aiiso:part_of ?q .\n" +
                "  ?q rdf:label ?t\n" +
                "}\n" +
                "\n" +
                "GROUP BY ?t",
            htmlQuery: "<p class='text-danger'> prefix owl: http://www.w3.org/2000/10/swap/pim/contact# </br>\n" +
                "prefix aiiso: http://purl.org/vocab/aiiso/schema# </br>\n" +
                "prefix rdf: http://www.w3.org/2000/01/rdf-schema# </br>\n" +
                "prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11# </br>\n" +
                "prefix foaf: http://xmlns.com/foaf/0.1/</br> </br>\n" +
                "\n" +
                "select ?t as ?test, sum(?o > 50) as ?failed, sum(?o < 50) as ?passed</br>\n" +
                "where  </br>{\n" +
                "&nbsp;  ?s ont:points ?o . </br>\n" +
                " &nbsp; ?s aiiso:part_of ?q . </br>\n" +
                " &nbsp; ?q rdf:label ?t </br>\n" +
                "} </br>\n" +
                "\n" +
                "GROUP BY ?t </p>",
        }, {
            title: "Prikaz za svakog studenta maksimalan broj bodova od svih testova i broj testova na kojima je ostvaren taj broj bodova:",
            query: "prefix owl: <http://www.w3.org/2000/10/swap/pim/contact#>\n" +
                "prefix aiiso: <http://purl.org/vocab/aiiso/schema#>\n" +
                "prefix rdf: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "prefix ont: <http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#>\n" +
                "prefix foaf: <http://xmlns.com/foaf/0.1/>\n" +
                "\n" +
                "select ?q, ?max_point, count(?q) as ?number_of_test\n" +
                "where {\n" +
                "\n" +
                " ?s foaf:member ?o .\n" +
                "      ?s ont:points ?i .\n" +
                "      ?s aiiso:part_of ?y .\n" +
                "      ?y foaf:title ?e .\n" +
                "      ?o rdf:label ?q . filter(?i = ?max_point)\n" +
                "\n" +
                "\n" +
                " {\n" +
                "    select ?q as ?sub, max(?i) as ?max_point\n" +
                "    where {\n" +
                "      ?s foaf:member ?o .\n" +
                "      ?s ont:points ?i .\n" +
                "      ?s aiiso:part_of ?y .\n" +
                "      ?y foaf:title ?e .\n" +
                "      ?o rdf:label ?q .\n" +
                "    }\n" +
                "\n" +
                "    GROUP BY ?q\n" +
                "  } \n" +
                "\n" +
                "}\n" +
                "\n" +
                "group by ?q ?max_point",
            htmlQuery: "<p class='text-danger'> prefix owl: http://www.w3.org/2000/10/swap/pim/contact# </br>\n" +
                "prefix aiiso: http://purl.org/vocab/aiiso/schema#</br>\n" +
                "prefix rdf: http://www.w3.org/2000/01/rdf-schema#</br>\n" +
                "prefix ont: http://www.semanticweb.org/qndaa/ontologies/2021/11/my-ontology-11#</br>\n" +
                "prefix foaf: http://xmlns.com/foaf/0.1/</br></br>\n" +
                "\n" +
                "select ?q, ?max_point, count(?q) as ?number_of_test</br>\n" +
                "where {</br>\n" +
                "\n" +
                " &nbsp; ?s foaf:member ?o .</br>\n" +
                " &nbsp;      ?s ont:points ?i .</br>\n" +
                " &nbsp;      ?s aiiso:part_of ?y .</br>\n" +
                " &nbsp;      ?y foaf:title ?e .</br>\n" +
                " &nbsp;      ?o rdf:label ?q . filter(?i = ?max_point)</br>\n" +
                "\n" +
                "\n" +
                " &nbsp;&nbsp; {</br>\n" +
                " &nbsp;&nbsp; &nbsp; select ?q as ?sub, max(?i) as ?max_point</br>\n" +
                " &nbsp; &nbsp; &nbsp;  where {</br>\n" +
                " &nbsp; &nbsp; &nbsp;  &nbsp;   ?s foaf:member ?o .</br>\n" +
                " &nbsp; &nbsp; &nbsp; &nbsp;    ?s ont:points ?i .</br>\n" +
                " &nbsp; &nbsp; &nbsp; &nbsp;    ?s aiiso:part_of ?y .</br>\n" +
                " &nbsp; &nbsp; &nbsp; &nbsp;    ?y foaf:title ?e .</br>\n" +
                " &nbsp; &nbsp; &nbsp; &nbsp;    ?o rdf:label ?q .</br>\n" +
                " &nbsp; &nbsp;  &nbsp; }</br>\n" +
                "\n" +
                " &nbsp; &nbsp;   GROUP BY ?q</br>\n" +
                " &nbsp; } </br>\n" +
                "\n" +
                "}</br>\n" +
                "\n" +
                "group by ?q ?max_point</br> </p>",
        }


    ]


    const onClickButton = ($event) => {
        setSelectedButton($event - 1)
        api.get('', {
            params: {
                query: queries[$event - 1].query,
                format: 'html'
            }
        }).then(response => {
            setResponse(response.data)
        });
    }

    return (
        <div className={`container`}>
            <div className={`d-flex justify-content-center`}>
                <h3 className={`text-primary my-4`}>Queries:</h3>
            </div>

            <div className="row">
                <div className={`col-2`}>
                    <Buttons onClickButton={onClickButton}/>
                </div>

                <div className={`col-10`}>
                    <Content response={response} query={queries[selectedButton]}/>
                </div>
            </div>
        </div>
    );
}

export default App;

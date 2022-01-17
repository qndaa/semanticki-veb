import React from "react";


const Content = (props) => {


    const renderContent = () => {
        if (document.getElementById('response')) {
            if (props.response == null) {
                return <div></div>;
            } else {
                document.getElementById('response').innerHTML = props.response;

            }
        }
    }

    const renderQuery = () => {
        if (document.getElementById('query')) {
            if (props.query.htmlQuery) {
                document.getElementById('query').innerHTML = props.query.htmlQuery;
            }
        }
    }

    if (props.query) {

        return (

            <div className={`row`}>
                <div className={`col-12`}>
                    <h3 className={`h3 text-primary`}>{props.query.title}</h3>
                </div>
                <div className={`col-12`}>
                    <h5 className={`text-primary`}>Query:</h5>
                    <div id={`query`}>
                        {renderQuery()}
                    </div>
                </div>
                <div className={`col-12`}>
                    <div id='response'>
                        {renderContent()}
                    </div>
                </div>


            </div>

        );


    } else {
        return (
            <div>
                <h3 className={`h3 text-primary`}>Select query!</h3>
            </div>
        )
    }

}

export default Content;

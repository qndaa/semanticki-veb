import React from "react";


const Buttons = (props) => {

    const setActiveButton = ($event) => {
        props.onClickButton($event)
    }


    return (
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist"
             aria-orientation="vertical">

            <button className="nav-link" id="v-pills-home-tab" data-bs-toggle="pill"
                    data-bs-target="#query1" type="button" role="tab" aria-controls="query1"
                    aria-selected="true" onClick={() => setActiveButton(1)}>Query 1
            </button>
            <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"
                    aria-selected="false" onClick={() => setActiveButton(2)}>Query 2
            </button>
            <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages"
                    aria-selected="false" onClick={() => setActiveButton(3)}>Query 3
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(4)}>Query 4
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(5)}>Query 5
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(6)}>Query 6
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(7)}>Query 7
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(8)}>Query 8
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(9)}>Query 9
            </button>
            <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false" onClick={() => setActiveButton(10)}>Query 10
            </button>
        </div>
    );
}


export default Buttons;

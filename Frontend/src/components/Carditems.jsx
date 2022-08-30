import React from "react";

function Carditems(props) {
    return (<div className="grievance">
        <h1>
            {props.title}
        </h1>
        {props.desc}
    </div>);
}

export default Carditems;
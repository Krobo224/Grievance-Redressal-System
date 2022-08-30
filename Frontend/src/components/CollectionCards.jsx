import React from "react";
import Card from "./Card";


function Cards() {
    return (
        <div className="row">
            <Card title="New Grievances" column="col-4"/>
            <Card title="Fastrack" column="col-4" />
            <Card title="Pending Acknowledgement" column="col-4" />
        </div>);
}

export default Cards;
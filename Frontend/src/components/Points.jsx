import React from "react";

function Points(props) {
    return (

        <div className="card pointsBackground" style={{ 'width': '15rem' }}>
            <div className="card-body">
                <h5 className="card-title">Your Earnings: {props.points}</h5>
            </div>
        </div>

    )
}

export default Points;
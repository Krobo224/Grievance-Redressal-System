import React from "react";
import Carditems from "./Carditems";

function NewGrievancesCard(props){
    return(<div className={props.column}>
        <div className="card card_class">
            <div className="card-body">
                <h5 className="card-title ">{props.title}</h5>
                <div id="cardItemCenter">
                    <Carditems desc="Grievance 1" title="" />
                    <Carditems desc="Grievance 2" title="" />
                    <Carditems desc="Grievance 3" title="" />
                </div>
                <div className="btn_ugc_info">
                    <a href="https://www.ugc.ac.in/page/Genesis.aspx">
                        <button type="button" className="btn btn-primary btn_more_cards">More</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NewGrievancesCard;
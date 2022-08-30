import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

// const sendThis = [{
//     "_id": "ABC123",
//   "title": "Transport availability",
//   "desc": "Since our college is located in the outskirts of the city; public transport is not avaiable. Students have to walk around 3-4 km before they can get any bus or auto which hinders their safety. Therefore we need some sort of transport for our college.",
//   "date": "20/08/2022",
//   "iid": "ABC123xyz",
//   "status": "pending",
//   "docs": {
//     "doc1": null,
//     "doc2": null,
//     "doc3": null
//   }
// },
// {
//     "_id": "KNA123",
//   "title": "Funds for underpriviliged students",
//   "desc": "There are lot of students who wish to take admissions but are not able to due to their financial issues. Its impossible to provide help to with limited funds. Hence we request you to provide some funds for this.",
//   "date": "20/08/2022",
//   "iid": "ABC123xyz",
//   "status": "pending",
//   "docs": {
//     "doc1": null,
//     "doc2": null,
//     "doc3": null
//   }
// },
// {
//     "_id": "MAJ123",
//   "title": "Foreign Students Accomodation",
//   "desc": "Nibh praesent tristique magna sit amet purus gravida. Nisl nunc mi ipsum faucibus vitae aliquet nec. Eget mauris pharetra et ultrices. Et ultrices neque ornare aenean euismod. Felis bibendum ut tristique et egestas quis ipsum suspendisse. ",
//   "date": "20/08/2022",
//   "iid": "MKA123xyz",
//   "status": "pending",
//   "docs": {
//     "doc1": null,
//     "doc2": null,
//     "doc3": null
//   }
// }
// ];

// let sendThisToo = [{
//     "_id": "BAJ717",
//   "title": "Request for postponing exams",
//   "desc": "There is a District level football tournament which is being conducted next month and at the same time, UGC semester exams are also there. Many of our students are going to participate in that tournament. Due to the clash between tournament and exams, it's hard for students to give attention to both. Hence we request you to postpone the exams for 10 days so the students can perform in both tournament and exams.",
//   "date": "24/07/2022",
//   "iid": "BAJ151kjz",
//   "status": "urgent",
//   "docs": {
//     "doc1": null,
//     "doc2": null,
//     "doc3": null
//   }
// },
// {
//     "_id": "KVA186",
//   "title": "Need of funds for conducting an event",
//   "desc": "Our college is selected as one of 75 nodal centres across India to host the grand finale of SIH'22. The amount sent to us for event is not sufficient to conduct the event as our college infrastructure is still in developing phase. We estimated the cost of food, accomodation and many required things and this estimated cost is much more than the money we got. Therefore we request you to provide the needed funds for the successful hosting of event.",
//   "date": "18/08/2022",
//   "iid": "KVA151jha",
//   "status": "urgent",
//   "docs": {
//     "doc1": null,
//     "doc2": null,
//     "doc3": null
//   }
// }
// ];

function SingleGrievance() {
    const { id } = useParams();
    console.log(id);
    const [loader, setLoader] = useState(true);
    const [ useThis, setThis ] = useState([1]);
    const caller = async () => {
        const response = await axios.post("http://localhost:8000/display", id)
        console.log(response);
        setThis(response);
    }

    useEffect(() => {
        caller();
        setLoader(false);
    }, [])

    if (loader === true) {
        return (
            <Loader />
        );
    } else {
        return (
            <div className="placement my-5">
                <div className="card text-center singleCardWidth">
                    <div className="card-header">
                        <strong className="row">
                            <span className="col-4">
                                Status: {useThis.status}
                            </span>
                            <span className="col-4">
                                Date: {useThis.date}
                            </span>
                        </strong>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{useThis.title}</h3>
                        <p className="card-text">{useThis.desc}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleGrievance;
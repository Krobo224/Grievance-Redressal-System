import { Link } from "react-router-dom";

function Complaints(props) {
    let array = props.array;
    console.log(array);

    return (
        <div>
            {array.map((item) => {
                return (
                    <div className="input-group mb-3" key={item._id}>
                        <input type="text" className="form-control" value={item.title} readOnly/>
                        <Link to={'/problem/' + item._id}>
                            <button className="btn btn-outline-secondary"  type="button">{item._id}</button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Complaints;
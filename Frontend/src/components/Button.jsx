import { Link } from "react-router-dom";

function Button(props) {
    return (
        props.route === undefined ?
            <div className="logreg_btn">
                <button type="button" onClick={props.onClick} className="btn btn-primary " style={{ 'width': props.width }}>{props.text}</button>
            </div>
            :
            <div className="logreg_btn">
                <Link to={props.route}>
                    <button type="button" onClick={props.onClick} className="btn btn-primary " style={{ 'width': props.width }}>{props.text}</button>
                </Link>
            </div>
    );
}

export default Button;
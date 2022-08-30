
import { Link } from "react-router-dom";

function NavButton(props){
    return (
        props.view?
        <div>
            <Link to={props.route}>
                    <button type="button" className="btn btn-primary btn-lg">{props.text}</button>
            </Link>
        </div>:
        <div></div>
    );
}

export default NavButton;
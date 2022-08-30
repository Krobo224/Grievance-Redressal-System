
import Button from "./Button";
import { Link } from "react-router-dom";

function Confirmation(props){
    return (
        <div>
            <div className="divConfirm">
                <p>Registration Successful!</p>
            </div>
            <Link to={props.route}>
                <div className="divConfirmLoginButton">
                    <Button text="Login"  width="100%"/>
                </div>
            </Link>
        </div>
    );
}

export default Confirmation;
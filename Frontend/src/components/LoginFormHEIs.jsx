import Button from "./Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginFormHEIs() {
    const [error, setError] = useState(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    async function clickHandler(data) {
        axios.post("http://localhost:8000/loginHEI", data)
            .then((response) => {
                if (response.data) {
                    navigate("/verifiedHEI");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
    async function errorHandler(e) {
        console.log(e);
    }

    return (
        <div>
            <div className="reg_form my-3">
                <h2>Higher Education Institute</h2>
                <div className="form-floating in mb-3">
                    <input {...register("id", { required: true })} type="text" className="form-control" id="floatingid" placeholder="" name="id" />
                    <label htmlFor="floatingid">UID</label>
                </div>

                <div className="form-floating in mb-3">
                    <input {...register("pass", { required: true })} type="password" className="form-control" id="floatingPassword" placeholder="" name="pass" />
                    <label htmlFor="loatingPassword">Password</label>
                    <span style={error ? { 'visibility': 'visible', 'color': 'red' } : { 'visibility': 'hidden', 'color': 'red' }}>Invalid Credentials</span>
                </div>
                <Button onClick={handleSubmit(clickHandler, errorHandler)} text="Login" width="100%" />
            </div>
            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>
                <p>Don't have an account?
                    <Link to="/registerHEI">Register Now</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginFormHEIs;
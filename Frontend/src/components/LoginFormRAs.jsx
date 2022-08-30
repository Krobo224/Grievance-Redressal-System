import Button from "./Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function LoginFormRAs(){
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    async function clickHandler(data){
        axios.post("http://localhost:8000/loginRA", data)
        .then((response)=>{
            if(response.data===true){
                navigate("/verifiedRA");
            } else {
                setError(true);
                //Invalid credentials
            }
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })    
    }
    async function errorHandler(e){
        console.log(e);
    }

    return(
        <div>
            <div className="reg_form my-3">
                <h2>Regulatory Bodies</h2>
                <div className="form-floating in mb-3">
                    <input {...register("id", {required:true})} type="text" className="form-control" id="floatingid" placeholder="" name="id"/>
                    <label htmlFor="floatingid">UID</label>
                </div>

                <div className="form-floating in mb-3">
                    <input {...register("pass", {required: true})} type="password" className="form-control" id="floatingPassword" placeholder="" name="pass" />
                    <label htmlFor="loatingPassword">Password</label>
                    <span style={error ? { 'visibility': 'visible', 'color': 'red' } : { 'visibility': 'hidden', 'color': 'red' }}>Invalid Credentials</span>
                </div>
                <Button onClick={handleSubmit(clickHandler, errorHandler)} text="Login" width="100%"/>
            </div>
            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>
                <p>Don't have an account?
                    <Link to="/registerRA">Register Now</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginFormRAs;
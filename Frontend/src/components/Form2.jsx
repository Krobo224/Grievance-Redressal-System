import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import Confirmation from "./Confirmation"; 

function Form2(){
    const { register, handleSubmit } = useForm();
    const [viewForm, setViewForm] = useState("flex");
    const [ viewConfirm, setViewConfirm ] = useState(true);
    const [error, setError] = useState(false);
    async function clickHandler(data){
        axios.post("http://localhost:8000/registerRA", data)
        .then((response)=>{
            if(response.data === true){
            setViewForm("none");
            setViewConfirm(false);
            console.log("Registration Successful!!");
            } else {
                console.log("Invalid Credentials!!");
                setError(true);
            }
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    async function errorHandler(e){
        console.log(e);
    }

    return (
        <div>
            <div className="reg_form my-5" style={{'display': viewForm}}>
                <h2>Regulatory Bodies</h2>
                <div className="form-floating in mb-3">
                    <input
                    {...register("UID", {required: true})}
                     type="text" className="form-control" id="floatingid2" placeholder="" name="UID" />
                    <label htmlFor="floatingid2">UID</label>
                </div>

                <div className="form-floating in mb-3">
                    <input 
                    {...register("name", {required: true})}
                    type="text" className="form-control" id="floatingname2" placeholder="" name="name"/>
                    <label htmlFor="floatingname2">Regulatory Body name</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("dept", {required: true})}
                    type="text" className="form-control" id="floatingdept" placeholder="" name="dept" />
                    <label htmlFor="floatingdept">Department</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("email", {required: true})}
                    type="email" className="form-control" id="floatingInput2" placeholder="" name="email"/>
                    <label htmlFor="floatingInput2">Regulatory Body Email</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("add", {required: true})}
                    type="text" className="form-control" id="floatingAdd2" placeholder="" name="add"/>
                    <label htmlFor="floatingAdd2">Regulatory Body Address</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("contact", {required: true})}
                    type="Number" className="form-control" id="floatingContact2" placeholder="" name="contact"/>
                    <label htmlFor="floatingContact2">Contact Number</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("pass", {required: true})}
                    type="password" className="form-control" id="floatingPassword2" placeholder="" name="pass" />
                    <label htmlFor="floatingPassword2">Password</label>
                    <span style={error ? { 'visibility': 'visible', 'color': 'red' } : { 'visibility': 'hidden', 'color': 'red' }}>Invalid Credentials</span>
                </div>
                <Button onClick={handleSubmit(clickHandler, errorHandler)} text="Register" width="100%"/>
            </div>    
            <div style={viewConfirm?{'display' : 'none'} : {'display': 'flex', 'flexDirection' : 'column', 'alignItems': 'center'}}>
                <Confirmation route="/choseRA"/>
            </div>
        </div>
    );
}

export default Form2;
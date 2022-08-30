import Button from './Button';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useState } from 'react';
import Confirmation from './Confirmation';

function Form() {
    // const [error, setError] = useState(false);
    const { register, handleSubmit } = useForm();
    const [viewForm, setViewForm] = useState("flex");
    const [ viewConfirm, setViewConfirm ] = useState(true);
    async function clickHandler(data){
        axios.post("http://localhost:8000/registerHEI", data)
        .then((response)=>{
            setViewForm("none");
            setViewConfirm(false);
            console.log("Registratation Successful!");

        console.log(response);
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
                <h2>Higher Education Institute</h2>
                <div className="form-floating in mb-3">
                    <input
                    {...register("UID", {required: true})}
                     type="text" className="form-control" id="floatingid1" placeholder="" name="UID" />
                    <label htmlFor="floatingid1">UID</label>
                </div>

                <div className="form-floating in mb-3">
                    <input 
                    {...register("name", {required: true})}
                    type="text" className="form-control" id="floatingname1" placeholder="" name="name"/>
                    <label htmlFor="floatingname1">Institute name</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("email", {required: true})}
                    type="email" className="form-control" id="floatingInput1" placeholder="" name="email"/>
                    <label htmlFor="floatingInput1">Institute Email address</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("contact", {required: true})}
                    type="text" className="form-control" id="floatingcontact1" placeholder="" name="contact" />
                    <label htmlFor="floatingcontact1">Institute mobile no.</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("add", {required: true})}
                    type="text" className="form-control" id="floatingadd1" placeholder="" name="add"/>
                    <label htmlFor="floatingadd1">Institute address</label>
                </div>

                <div className="form-floating in mb-3">
                    <input
                    {...register("pass", {required: true})}
                    type="password" className="form-control" id="floatingPassword1" placeholder="" name="pass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" minLength={8}/>
                    <label htmlFor="floatingPassword1">Password</label>
                    {/* <span style={error ? { 'visibility': 'visible', 'color': 'red' } : { 'visibility': 'hidden', 'color': 'red' }}>Invalid Credentials</span> */}
                </div>
                <Button onClick={handleSubmit(clickHandler, errorHandler)} text="Register" width="100%"/>
            </div>
            <div style={viewConfirm?{'display' : 'none'} : {'display': 'flex', 'flexDirection' : 'column', 'alignItems': 'center'}}>
                <Confirmation route="/choseHEI"/>
            </div>
        </div>
    );

}

export default Form;
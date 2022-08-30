import { useForm } from 'react-hook-form';
import Button from './Button';
import axios from 'axios';

function Withdraw(){

    const {register, handleSubmit} = useForm();

    const submit = async (data) => {
        //console.log(data);
        axios.post("http://localhost:8000/withdrawGrievance", data)
        .then((response) =>{
            console.log(response.data);
            console.log(data.UID);
            alert("Problem with UID: " + data.UID + "deleted");
        }).catch((error) => {
            console.log(error);
        })

    }

    return(
        <div>
            <div className="reg_form my-5">
                <div className="form-floating in mb-3">
                    <input {...register("UID", { required : true})} type="text" className="form-control" id="floatingid" placeholder="" name="UID" />
                    <label htmlFor="floatingid">UID</label>
                </div>
                <Button text="Withdraw" width = "100%" onClick = {handleSubmit(submit)}/>
            </div>
        </div>
    );
}

export default Withdraw;
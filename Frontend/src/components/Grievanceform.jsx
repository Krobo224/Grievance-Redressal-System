import { useForm } from 'react-hook-form';
import Button from './Button';
import axios from 'axios';

function Gform(){

    const {register, handleSubmit} = useForm();
    
    function submit(data){
        axios.post("http://localhost:8000/addGrievance", data)
        .then((response)=>{
            console.log(response.data);
            alert("Successfully submitted the data");
        })

        
    }

    return(
        <>
            <div className="reg_form my-3">

                <div className="form-floating in mb-3">
                    <input {...register("IID", { required : true})} type="text" className="form-control" id="floatingid" placeholder="" name="IID" />
                    <label htmlFor="floatingid">Institute ID</label>
                </div>

                <div className="form-floating in mb-3">
                    <input {...register("title", { required : true})} type="text" className="form-control" id="floatingtitle" placeholder="" name="title"/>
                    <label htmlFor="floatingtitle">Subject of Grievance</label>
                </div>

                <div className="form-floating in mb-3">
                    <textarea  {...register("des", { required : true})} className="form-control" id="floatingdesInput" placeholder="" name="des"/>
                    <label htmlFor="floatingdes">Grievance Description</label>
                </div>

                <div className="form-floating in mb-3">
                    <input {...register("department", { required : true})} type="text" className="form-control" id="floatingdep" placeholder="" name="department"/>
                    <label htmlFor="floatingdepartment">Department</label>
                </div>

                <div className="form-floating in mb-3">
                    <input {...register("document", { required : true})} type="file" className="form-control my-2" id="floatingdoc" placeholder="" name="document" accept="application/pdf"/>
                    <label htmlFor="floatingdoc">Upload document</label>
                </div>

                <Button text="File Grievance" width = "100%" onClick = {handleSubmit(submit)}/>
            </div>
            

        </>
    );
}

export default Gform;
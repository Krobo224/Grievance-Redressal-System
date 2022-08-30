import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Selection() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    async function clickHandler(data) {
        if (data.option === "1") {
            navigate("/choseHEI");
        } else {
            navigate("/choseRA");
        }
    }
    async function errorHandler(e) {
        console.log(e);
    }

    return (
        <div className="logreg_btn my-5">
            <div className="form-floating in mb-3">
                <select id="floatingopt" {...register("option", { required: true })} className="form-select my-4" aria-label="Default select example">
                    <option defaultValue={"1"}>Choose the type of account</option>
                    <option value="1">Higher Education Institutes</option>
                    <option value="2">Regulatory Bodies</option>
                </select>
                <label htmlFor="floatingopt">Type of account</label>
                <Button onClick={handleSubmit(clickHandler, errorHandler)} text="Next" width="100%" />
            </div>
        </div>
    );
}

export default Selection;
import Loginform from './LoginForm';
//import Toggle from './Toggle';
import {useState } from 'react';
import Form from './Form';
import Form2 from './Form2';
// import { useForm } from "react-hook-form";
 
function Reglog() {

    const [active, setactive] = useState('HEI');
    const display = () => {
        if(active === 'HEI')
        {
            return <Form />
        }
        else
        {
            return <Form2 />
        }
    };

    return (
            <div className="row outer_block">
                <div className="col-5 my-2 applyBorder">
                    <div className="toggle_btn row">
                        <span style={{'visibility': 'hidden'}} className="col-1"></span>
                        <button className="btn btn-lg btn-primary reg_log_btn my-5 col-4" onClick={() => setactive('HEI')} >HEI</button>
                        <span style={{'visibility': 'hidden'}} className="col-2"></span>
                        <button className="btn btn-lg btn-primary reg_log_btn my-5 col-4" onClick={() => setactive('RA')} >RA</button>
                        <span style={{'visibility': 'hidden'}} className="col-1"></span>
                        {/* <button className="move_btn my-3">{active}</button> */}
                    </div>
                    <div>
                        {active==="HEI"
                        ?
                        <div>
                            <hr className="hrForm" style={{'visibility': 'visible'}}/>
                            <hr className="hrForm2" style={{'visibility': 'hidden'}}/>
                        </div>
                        :
                        <div>
                            <hr className="hrForm" style={{'visibility': 'hidden'}}/>
                            <hr className="hrForm2" style={{'visibility': 'visible'}}/>
                        </div>
                        }
                    </div>
                    {display()}
                    
                </div>

                <div className="col-5 applyBorder" style={{'marginTop': '5%', 'paddingTop': '10%'}}>
                    <Loginform />
                </div>
            </div>
    );
}

export default Reglog;
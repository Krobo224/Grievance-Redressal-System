import Button from "./Button";

function LogReg(props) {
    return (
        <div>
            <div className="logreg_btn_text">
                <p style={{ 'color': 'grey', 'marginBottom': '0.1rem' }}>Already have a account?</p>
            </div>
            <Button route="/login" text='Login' width='100%' />
            <br />
            <div className="logreg_btn_text">
                <p style={{ 'color': 'grey', 'marginBottom': '0.1rem' }}>New Here?</p>
            </div>
            <div className="logreg_btn2">
                {props.choice === "hei"?
                <Button route="/registerHei" text='Register' width='100%' />
                :
                <Button route="/registerRa" text='Register' width='100%' />}
            </div>
        </div>
    )
}

export default LogReg;
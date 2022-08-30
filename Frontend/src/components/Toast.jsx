
function Toast(props) {
    return (
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="..." class="rounded me-2" alt="..." />
                <strong class="me-auto">{props.heading}</strong>
                <small>Just Now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {props.msg}
            </div>
        </div>
    );
}

export default Toast;

import NavButton from "./NavButton";

function NavigationBar(props) {
    return (
        <div id="navbar" className="navbarColor">
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid">
                    {/* Yahan UGC ki Website ki link daalni hai */}
                    <a className="navbar-brand" href="/">UGC</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href=" " id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="https://www.ugc.ac.in/ugc_notices.aspx">UGC Notices</a></li>
                                    <li><a className="dropdown-item" href="https://ugcnet.nta.nic.in/">UGC-NET</a></li>
                                    {/* <li>
                                            <hr className="dropdown-divider" />
                                        </li> */}
                                </ul>
                            </li>
                        </ul>
                        <NavButton view={props.view2} text={props.text2} route={props.route2} />
                        <span style={{'visibility': 'hidden', 'width': '20px'}}></span>
                        <NavButton view={props.view} text={props.text} route={props.route} />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;
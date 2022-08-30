import Header from "./Header";
import Carousel from "./Carousel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Form2 from "./Form2";
import About from "./About";
// import LoginForm from "./LoginForm";
import LoginFormHEIs from "./LoginFormHEIs";
import LoginFormRAs from "./LoginFormRAs";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Selection from "./Selection";
import RaIndex from "./RaIndex";
import SingleGrievance from "./SingleGrievance";
import axios from "axios";
import GForm from "./Grievanceform"
// import RegLog from "./Reglog";
import Hei from "./Hei";
import Withdraw from "./Withdraw";


function App() {

    axios.get("http://localhost:8000/")
        .then((response) => {
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        })


    return (
        <div>
            <BrowserRouter forceRefresh>
                <div>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={
                            <div>
                                <NavigationBar view={true} text="Get Started" route="/chose" view2={false} />
                                <Carousel />
                                <About />
                            </div>
                        } />
                        <Route path="/chose" element={
                            <div>
                                <NavigationBar view={false} />
                                <Selection />
                            </div>
                        } />
                        <Route path="/choseHEI" element={
                            <div>
                                <NavigationBar view={false} view2={false} />
                                <LoginFormHEIs />
                            </div>
                        } />
                        <Route path="/choseRA" element={
                            <div>
                                <NavigationBar view={false} view2={false} />
                                <LoginFormRAs/>
                            </div>
                        } />
                        <Route path="/verifiedHEI" element={
                            <div>
                                <NavigationBar view={true} text="Withdraw Grievance" route="/withdrawGrievance" view2={true} text2="New Grievance" route2="/addGrievance" />
                                <Hei />
                            </div>
                        } />
                        <Route path="/verifiedRA" element={
                            <div>
                                <NavigationBar view={true} text="Logout" route="/" view2={true} text2="Net Points" route2="/deptPoints" />
                                <RaIndex />
                            </div>
                        } />
                        <Route path="/registerHEI" element={
                            <div>
                                <NavigationBar view={true} text="Login" route="/choseHEI" view2={false}/>
                                <Form />
                            </div>
                        } />
                        <Route path="/registerRA" element={
                            <div>
                                <NavigationBar view={true} text="Login" route="/choseRA" view2={false}/>
                                <Form2 />
                            </div>
                        } />

                        <Route path="/grievance" element={
                            <div>
                                <NavigationBar view={true} text="logout" route="/" view2={true} text2="Add Grievance" route2="/addGrievance" />
                                <Hei />
                            </div>
                        } />
                        {/* <Route path="/problem/:id" element={
                            <div>
                                <NavigationBar view={false} text="text" route="/verifiedHEI" view2={false} />
                                <SingleGrievance/>
                            </div>
                        }
                        /> */}
                        <Route path="/problem/:id" element={
                            <div>
                                <NavigationBar view={false} text="text" route="/verifiedHEI" view2={false} />
                                <SingleGrievance/>
                            </div>
                        }
                        />
                        
                        <Route path="/addGrievance" element={
                            <div>
                                <NavigationBar view={true} text="logout" route="/" view2={false} />
                                <GForm />
                            </div>
                        } />
                        <Route path="/withdrawGrievance" element={
                            <div>
                                <NavigationBar view={true} text="logout" route="/" view2={false} />
                                <Withdraw />
                            </div>
                        } />

                        {/* <Route path="/choice" element={
                            <div>
                                <NavigationBar view={false} view2={false} />
                                <Selection />
                            </div>
                        } />
                        
                        <Route path="/choseRA" element={
                            <div>
                                <NavigationBar view={false} view2={false}/>
                                <LogReg choice="ra" />
                            </div>
                        } />
                        <Route path="/registerRa" element={
                            <div>
                                <NavigationBar view={true} text="Login" route="/login" view2={false}/>
                                <Form2 />
                            </div>
                        } />
                        <Route path="/login" element={
                            <div>
                                <NavigationBar view={true} text="Register" route="/register" view2={false}/>
                                <LoginForm />
                            </div>
                        } /> */}

                        {/* <Route path="/test" element={
                            <div> 
                                <NavigationBar view={false} />
                                <RegLog />
                            </div>
                        }
                        /> */}
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>


        </div>
    );
}

export default App;

import react, {useContext, useState} from "react";
import "./adminlogin.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
export const Adminlogin = () => {
    const { adminLogin, isLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginAdmins = async () => {
        console.log(await adminLogin(email, password))
    };
    return (

        <div className="mainLoginScreen">
            <div className="innerLoginScreen">
                <h1>Welcome</h1>
                <p className="paraLoginScreen">Login to access Dashboard</p>
                <div className="loginInputs">
                    <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={loginAdmins} className="adminSignInBtn">
                        Continue
                    </button>
                </div>
                <a href="https://siddhikitchenrecipes.web.app" className="visitHome">Visit site</a>
            </div>
        </div>
    )
}
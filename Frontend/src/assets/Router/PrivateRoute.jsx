import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children,role})=>{
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/" />;
    }

    try{
        const decode = jwtDecode(token);

        const userRole = decode?.authorities;

        const allowedRole = Array.isArray(role) ? role : [role];

        if(!allowedRole.includes(userRole)){
            return <Navigate to="/"/>;
        }

        return children; // if role match then we simply render to respective page

    }catch(err){
        console.error("Invalid Token", err);
        return <Navigate to="/"/>;

    }


};

export default PrivateRoute;
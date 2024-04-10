import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                {/* Home */}
                <Route path="/home" element={<Home/>}/>

                {/* Set default page */}
                <Route path="/" element={<Navigate to="/home"/>}/>

                {/* Set error page */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;

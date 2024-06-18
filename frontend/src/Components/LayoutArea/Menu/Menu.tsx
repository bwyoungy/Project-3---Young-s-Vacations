import { NavLink } from "react-router-dom";
import "./Menu.css";
import RoleModel from "../../../Models/RoleModel";
import GetRole from "../../../Utils/AuthCheck";

function Menu(): JSX.Element {

    const role = GetRole();
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span>|</span>
            <NavLink to="/vacations">Vacations</NavLink>
            {role === RoleModel.Admin && (
                <>
                    <span>|</span>
                    <NavLink to="vacations/add">Add Vacation</NavLink>
                </>
                )}
        </div>
    );
}

export default Menu;

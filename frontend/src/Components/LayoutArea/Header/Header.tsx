import GetRole from "../../../Utils/AuthCheck";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
    const role = GetRole();
    return (
        <div className="Header">
			<AuthMenu/>
            {/* Menu is only for logged in users */}
            {role && (<Menu/>)}
        </div>
    );
}

export default Header;

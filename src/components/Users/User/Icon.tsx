import "./Icon.css";
import logo from "../../../assets/logo.png";

interface User {
    id: string;
    name: string;
}

interface IconProps {
    user: User;
}

const Icon = ({ user }: IconProps) => {
    return <div className="icon_container"><img src={logo} alt="logo" className="icon"/></div>;
};

export default Icon;
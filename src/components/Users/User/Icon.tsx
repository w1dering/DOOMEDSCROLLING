import "./Icon.css";

interface User {
    id: string;
    name: string;
}

interface IconProps {
    user: User;
}

const Icon = ({ user }: IconProps) => {
    return <div className="icon">Icon for {user.name}</div>;
};

export default Icon;
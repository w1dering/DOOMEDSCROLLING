import "./CurrentShort.css";

interface User {
    id: string;
    name: string;
}

interface CurrentShortProps {
    user: User;
}

const CurrentShort = ({ user }: CurrentShortProps) => {
    return <div className="current-short">CurrentShort for {user.name} id {user.id}</div>;
};

export default CurrentShort;
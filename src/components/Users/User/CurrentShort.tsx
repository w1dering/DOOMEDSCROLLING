import "./CurrentShort.css";

interface User {
    id: string;
    name: string;
}

interface CurrentShortProps {
    user: User;
}

const CurrentShort = ({ user }: CurrentShortProps) => {
    return <div className="shorts-queue">CurrentShort for {user.name}</div>;
};

export default CurrentShort;
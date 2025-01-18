import "./Preferences.css";

interface User {
    id: string;
    name: string;
}

interface PreferencesProps {
    user: User;
}

const Preferences = ({ user }: PreferencesProps) => {
    return <div className="preferences">Preferences for {user.name}</div>;
};

export default Preferences;
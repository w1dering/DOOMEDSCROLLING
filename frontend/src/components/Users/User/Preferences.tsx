import "./Preferences.css";

interface User {
    id: string;
    name: string;
    occupation: string;
    age: number;
    searchHistory: string[];
}

interface PreferencesProps {
    user: User;
}

const Preferences = ({ user }: PreferencesProps) => {
    return (
        <div className="preferences">
            <h3>{user.name}</h3>
            <p>{user.occupation}, {user.age}</p>
            <p>Recent Searches: {user.searchHistory.join(", ")}</p>
        </div>
    );
};

export default Preferences;
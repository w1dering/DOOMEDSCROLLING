import "./Attention.css";

interface User {
    id: string;
    name: string;
    occupation: string;
    age: number;
    searchHistory: string[];
    likes: string[];
    dislikes: string[];
    attention: number;
}

const Attention = ({user}: {user: User}) => {
    return (
        <div className="attention-container">
            <div className="attention" style={{ width: `${user.attention}%` }}>
            </div>
        </div>
    );
};

export default Attention;
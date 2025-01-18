import "./UsersPanel.css";
import { useState } from "react";
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import CurrentShort from "./User/CurrentShort";
import AddShort from "./User/AddShort";

interface User {
	id: string;
	name: string;
}

const UsersPanel = () => {
	// Initialize users state
	const [users, setUsers] = useState<User[]>([
		// Example data - replace with your actual data or API call
		{ id: "1", name: "User 1" },
		{ id: "2", name: "User 2" },
		{ id: "3", name: "User 3" },
		{ id: "4", name: "User 4" },
	]);

	return (
		<div id="users-panel">
			<div className="users-list">
				{users.map((user) => (
					<div key={user.id} className="user-item">
						<div className="user-info">
							<Icon user={user} />
							<Preferences user={user} />
							<CurrentShort user={user} />
                            <AddShort user={user} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;

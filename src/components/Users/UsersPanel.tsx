import "./UsersPanel.css";
import { useState } from "react";
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import ShortsQueue from "./User/ShortsQueue";

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
		{ id: "5", name: "User 5" },
		{ id: "6", name: "User 6" },
		{ id: "7", name: "User 7" },
		{ id: "8", name: "User 8" },
		{ id: "9", name: "User 9" },
		{ id: "10", name: "User 10" },
	]);

	return (
		<div id="users-panel">
			<div className="users-list">
				{users.map((user) => (
					<div key={user.id} className="user-item">
						<div className="user-info">
							<Icon user={user} />
							<Preferences user={user} />
							<ShortsQueue user={user} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;

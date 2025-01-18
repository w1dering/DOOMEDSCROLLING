import "./UsersPanel.css";
import { useAppSelector } from '../../store/hooks';
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import Short from "../Shorts/Short";

const UsersPanel = () => {
	const users = useAppSelector(state => state.users.users);
	const visibleUserIds = useAppSelector(state => state.users.visibleUsers);
	
	const visibleUsers = users.filter(user => visibleUserIds.includes(user.id));

	return (
		<div id="users-panel">
			<h1>Users Panel</h1>
			<div className="users-list">
				{visibleUsers.map((user) => (
					<div key={user.id} className="user-item">
							<Icon user={user} />
							<Preferences user={user} />
							<Short type="current" content={{imgSrc: "", text: "balls"}} />
                            <Short type="add"/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;

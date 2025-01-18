import "./UsersPanel.css";
import { useAppSelector } from '../../store/hooks';
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import CurrentShort from "./User/CurrentShort";
import AddShort from "./User/AddShort";

const UsersPanel = () => {
	const users = useAppSelector(state => state.users.users);

	return (
		<div id="users-panel">
			<div className="users-list">
				{users.map((user) => (
					<div key={user.id} className="user-item">
							<Icon user={user} />
							<Preferences user={user} />
							<CurrentShort user={user} />
                            <AddShort user={user} />
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;

import "./UsersPanel.css";
import { useState, useEffect } from "react";
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import CurrentShort from "./User/CurrentShort";
import AddShort from "./User/AddShort";

interface User {
	id: string;
	name: string;
	occupation: string;
	age: number;
	searchHistory: string[];
}

const UsersPanel = () => {
	const [users, setUsers] = useState<User[]>([]);

	const generateUsers = async () => {
		try {
			const response = await fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
				},
				body: JSON.stringify({
					model: "gpt-3.5-turbo",
					messages: [{
						role: "user",
						content: "Generate 5 random users with these properties: name, occupation, age (between 18-80), and search history (array of 3-5 recent searches). Return only a valid JSON array with no additional text."
					}],
					temperature: 0.7
				})
			});

			const data = await response.json();
			console.log('API Response:', data);
			
			if (!data.choices?.[0]?.message?.content) {
				throw new Error('Invalid API response structure');
			}

			const content = data.choices[0].message.content;
			console.log('Raw content:', content);
			
			let generatedUsers;
			try {
				generatedUsers = JSON.parse(content);
				console.log('Parsed users:', generatedUsers);
				
				// Validate the structure of each user
				generatedUsers.forEach((user: any, index: number) => {
					if (!user.name || !user.occupation || !user.age || !Array.isArray(user.search_history)) {
						console.error(`Invalid user structure at index ${index}:`, user);
						throw new Error(`User at index ${index} is missing required fields`);
					}
				});

				const usersWithIds = generatedUsers.map((user: any, index: number) => {
					const userWithId = {
						name: user.name,
						occupation: user.occupation,
						age: user.age,
						searchHistory: user.search_history
					};
					console.log('User with ID:', userWithId);
					return userWithId;
				});

				setUsers(usersWithIds);
			} catch (parseError) {
				console.error('JSON Parse Error:', parseError);
				console.log('Failed to parse content:', content);
				return;
			}
		} catch (error) {
			console.error('Error generating users:', error);
		}
	};

	return (
		<div id="users-panel">
			<button 
				className="generate-users-btn" 
				onClick={generateUsers}
			>
				Generate Users
			</button>
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

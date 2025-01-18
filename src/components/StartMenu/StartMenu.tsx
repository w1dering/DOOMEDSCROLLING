import './StartMenu.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers, setIsLoading, addVisibleUser } from '../../store/usersSlice';
import { useState } from 'react';

const StartMenu = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.users.isLoading);
    const [isVisible, setIsVisible] = useState(true);

    const generateUsers = async () => {
        dispatch(setIsLoading(true));
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
                        content: "Generate 5 random users with these properties: id (3 digit numerical), name, occupation, age (between 18 and 80), search history (array of 3 to 5 recent searches), a list of 3 to 5 topics they like to watch on social media, and a list of 3 to 5 topics they do not like to watch on social media. Return only a valid JSON array with no additional text. Give each user a unique personality reflected through their search history, likes, and dislikes. Likes and dislikes may not necessarily be opposites or directly related to the occupation. Please return the JSON in the following format: [{id: '123', name: 'John Doe', occupation: 'Software Engineer', age: 30, searchHistory: ['search1', 'search2', 'search3'], likes: ['topic1', 'topic2', 'topic3'], dislikes: ['topic4', 'topic5', 'topic6'}]. The search history should be a list of 3-5 recent searches that are related to the user's likes or occupation. For example, if the user is a software engineer, they may like topics related to technology, cats, or sports, but dislike topics related to politics or religion. This software engineer may have searched for 'cats' or 'sports' recently, but not 'politics'. The topics should be unique and not repeated. If you choose to include a date in the search history (do not always include a date), note that it is currently January 2025."
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
                
                generatedUsers.forEach((user: any, index: number) => {
                    if (!user.id || 
                        !user.name || 
                        !user.occupation || 
                        !user.age || 
                        !Array.isArray(user.searchHistory) || 
                        !Array.isArray(user.likes) || 
                        !Array.isArray(user.dislikes)) {
                        console.error(`Invalid user structure at index ${index}:`, user);
                        throw new Error(`User at index ${index} is missing required fields`);
                    }
                });

                const usersWithIds = generatedUsers.map((user: any, index: number) => ({
                    id: (index + 1).toString(),
                    name: user.name,
                    occupation: user.occupation,
                    age: user.age,
                    searchHistory: user.searchHistory,
                    likes: user.likes,
                    dislikes: user.dislikes
                }));

                dispatch(setUsers(usersWithIds));
                if (usersWithIds.length > 0) {
                    dispatch(addVisibleUser(usersWithIds[0].id));
                }
                setIsVisible(false);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.log('Failed to parse content:', content);
                return;
            }
        } catch (error) {
            console.error('Error generating users:', error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    if (!isVisible) return null;

    return (
        <div className="start-menu">
            <button 
                className="generate-users-btn" 
                onClick={generateUsers}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Start'}
            </button>
        </div>
    );
};

export default StartMenu;
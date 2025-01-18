import './StartMenu.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers, setIsLoading } from '../../store/usersSlice';
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
                        content: "Generate 5 random users with these properties: name, occupation, age (between 18-80), search history (array of 3-5 recent searches), a list of 3-5 topics they like, and a list of 3-5 topics they dislike. Return only a valid JSON array with no additional text. Give each user a unique personality reflected through their search history, likes, and dislikes. Likes and dislikes may not necessarily be opposites or directly related to the occupation. Please return the JSON in the following format: [{name: 'John Doe', occupation: 'Software Engineer', age: 30, searchHistory: ['search1', 'search2', 'search3'], likes: ['topic1', 'topic2', 'topic3'], dislikes: ['topic4', 'topic5', 'topic6'}]. The search history should be a list of 3-5 recent searches. The likes and dislikes should be a list of 3-5 topics that the user enjoys or does not enjoy watching on social media. For example, if the user is a software engineer, they may like topics related to technology, cats, or sports, but dislike topics related to politics or religion. The topics should be unique and not repeated. If you choose to include a date in the search history (do not always include a date), note that it is currently January 2025."
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
                    if (!user.name || 
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
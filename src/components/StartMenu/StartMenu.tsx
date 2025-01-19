import './StartMenu.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers, setIsLoading, addVisibleUser, setShorts } from '../../store/usersSlice';
import { useState } from 'react';
import { thumbnails, thumbnailsSrc } from '../../assets/thumbnails/thumbnails.json';

interface Properties {
    loaded: () => void;
}

const StartMenu = ({loaded}: Properties) => {
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
                        content: "Generate 10 random users with these properties: ID (3 digit numerical identification number), name (please give each user a unique name over different ethnicities), occupation, age (between 18 and 80), search history (array of 5 to 7 recent searches), a list of 5 to 7 topics they like to watch on social media, and a list of 5 to 7 topics they do not like to watch on social media. Return only a valid JSON array with no additional text. Give each user a unique personality reflected through their search history, likes, and dislikes. Likes and dislikes may not necessarily be opposites or directly related to the occupation. Please return the JSON in the following format: {\"id\": \"123\", \"name\": \"John Doe\", \"occupation\": \"Software Engineer\", \"age\": 30, \"searchHistory\": [\"search1\", \"search2\", \"search3\", \"search4\", \"search5\"], \"likes\": [\"topic1\", \"topic2\", \"topic3\", \"topic4\", \"topic5\", \"topic6\"], \"dislikes\": [\"topic7\", \"topic8\", \"topic9\", \"topic10\", \"topic11\"]}. The search history should be a list of 5 to 7 recent searches that are related to the user's likes, NOT their occupation. For example, if the user is a pilot, they may like topics related to video games or sports, but dislike topics related to politics or religion. This pilot may have searched for 'video games' or 'sports' recently, but not 'politics'. However, the likes and dislikes should be reasonable. No two users should have liked or disliked topics where 2 of the topics are the same. For example, if a user likes cats, dogs, and birds, then another user cannot like cats, dogs, and snakes. Possible likes and dislikes should cover a wide range of subjects, and dislikes should not be something that is universally disliked. For instance, you should not say that a user dislikes violence, a better example would be that a user dislikes architecture. You should try your best to have it so that a topic that one user likes is disliked by a different user. For example, if one user likes dogs, then another user should dislike dogs. Two users must NEVER have the same ID. If you choose to include a date in the search history (do not always include a date), note that it is currently January 2025.",
                    }],
                    temperature: 1
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
                    dislikes: user.dislikes,
                    attention: 100
                }));

                dispatch(setUsers(usersWithIds));
                if (usersWithIds.length > 0) {
                    dispatch(addVisibleUser(usersWithIds[0].id));
                    await generateShorts();
                }
                setIsVisible(false);
                loaded();
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

    const generateShorts = async () => {
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
                        content: `Generate 15 random shorts with these properties: imgSrc (URL to a thumbnail image), text (a 5 to 7 word description of the short, along with exactly 3 tags or 'hashtags' that are relevant to the short and describe the content of the short). Return only a valid JSON array with no additional text. You must choose from the following list of thumbnails: ${thumbnails.map(thumbnail => thumbnailsSrc + thumbnail).join(', ')}. The text should be a short description of the short, and the image should be a URL to a thumbnail image. For example, a video of a dog playing fetch might have the imgSrc "src/assets/thumbnails/puppy.gif" and the text "Playing fetch with Bruno! #dog #cute #sports". Please have the short form videos cover a variety of topics, such as animals, photography, video games, music, sports, challenges, celebrities, science, and more. Ideally, some (but not all) of the topics of the shorts should be absurd, humorous, or somewhat strange. Copy the style of titles in Instagram Reels, TikTok, and YouTube Shorts. If you choose to include a date in the text, note that it is currently January 2025. Do not attempt to format the code using \`\`\`json.`
                    }],
                    temperature: 1
                })
            });

            const data = await response.json();
            console.log('API Response:', data);
            
            if (!data.choices?.[0]?.message?.content) {
                throw new Error('Invalid API response structure');
            }
            const content = data.choices[0].message.content;
            console.log('Raw shorts content:', content);

            try {
                const shorts = JSON.parse(content);
                console.log('Parsed shorts:', shorts);
                
                if (!Array.isArray(shorts)) {
                    throw new Error('Shorts must be an array');
                }

                shorts.forEach((short, index) => {
                    if (!short.imgSrc || !short.text) {
                        throw new Error(`Short at index ${index} is missing required fields`);
                    }
                });

                dispatch(setShorts(shorts));
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.log('Failed to parse content:', content);
                throw parseError;
            }
        } catch (error) {
            console.error('Error generating shorts:', error);
            if (error instanceof SyntaxError) {
                console.error('JSON Syntax Error details:', error.message);
            }
        } finally {
            dispatch(setIsLoading(false));
        }
    }

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
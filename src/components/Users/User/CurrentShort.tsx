import "./CurrentShort.css";

interface User {
    id: string;
    name: string;
    occupation: string;
    age: number;
    searchHistory: string[];
    likes: string[];
    dislikes: string[];
}

interface CurrentShortProps {
    user: User;
}

interface ShortProps {
    tags: string[];
}

const CurrentShort = ({ user }: CurrentShortProps, { tags }: ShortProps) => {
    const judgeShort = async () => {
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
                        content: `You are ${user.name} and you are judging a short. You are a ${user.occupation} and you are ${user.age} years old. You enjoy ${user.likes.join(", ")} and dislike ${user.dislikes.join(", ")}. You are judging the short and you are giving it a score of 1 to 10. The short has tags ${tags.join(", ")}. Give it a score of 1 to 10, where 1 is the lowest possible score and 10 is the highest possible score. Return your score as a JSON object in the following format: {"score": 10}`
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
            
            let score;
            try {
                score = JSON.parse(content);
                console.log('Parsed users:', score);
                
                if (!score) {
                    console.error(`Invalid score`);
                    throw new Error(`Score is invalid`);
                }
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.log('Failed to parse content:', content);
                return;
            }
        } catch (error) {
            console.error('Error judging short:', error);
        }
    };

    return <div className="current-short">CurrentShort for {user.name} id {user.id}</div>;
};

export default CurrentShort;
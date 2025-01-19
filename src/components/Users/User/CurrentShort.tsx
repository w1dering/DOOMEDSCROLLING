import "./CurrentShort.css";

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

interface CurrentShortProps {
    user: User;
    updateAttention: (rating: number) => void;
}

interface ShortProps {
    text: string;
}

const CurrentShort = ({ user, updateAttention }: CurrentShortProps, { text }: ShortProps) => {
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
                        content: `You are ${user.name} and you are judging a short. You are a ${user.occupation} and you are ${user.age} years old. You enjoy ${user.likes.join(", ")} and dislike ${user.dislikes.join(", ")}. You are determining whether or not to give your attention to a short form video represented by giving it a score of 1 to 10. The short has the following title: "${text}". Give it a score of 1 to 10, where a score of 1 is the minimum score, representing an extremely negative reaction to the short, and 10 is the highest possible score, representing an extremely positive reaction to the short. A score of 5 indicates that your reaction to the short is neutral. Return your score as a JSON object in the following format: {"score": 10}. Do not return anything else.`
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

                updateAttention(score);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.log('Failed to parse content:', content);
                return;
            }
        } catch (error) {
            console.error('Error judging short:', error);
        }
    };

    return (
        <div className="current-short">CurrentShort for {user.name} id {user.id}</div>
    );
};

export default CurrentShort;
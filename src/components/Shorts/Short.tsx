import "./Short.css";

interface Props {
    type?: "current" | "add" | "trending" | "random" | "pinned";
    content?: {
        imgSrc: string,
        text: string,
    }
}

const Short = ({type, content} : Props) => {
    if (type == "add") {
        return <div className="short add-short">
            <img src = "src\assets\PlusIcon.png" alt = "plus"/>
        </div>;
    } else if (type == "current") {
        return <div className={`short current-short`}>
            {content && (
                <>
                    <img src={content.imgSrc} alt="short thumbnail"/>
                    <p>{content.text}</p>
                </>
            )}
        </div>;
    } else {
        return <div className={`short ${type}-short`}>{content?.text}</div>;
    }
}

export default Short;
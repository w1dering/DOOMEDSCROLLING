import "./Short.css";

interface Props {
    type?: "current" | "add" | "trending" | "random" | "pinned";
    content?: {
        imgSrc: string,
        text: string,
    }
}

const Short = ({type = "random", content = {imgSrc: "", text: ""}} : Props) => {
    if (type == "add") {
        return <div className="short add-short">+</div>;
    }
    return <div className={`short ${type}-short`}>{content.text}</div>;
}

export default Short;
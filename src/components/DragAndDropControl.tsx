import Short from "./Shorts/Short";

const DragAndDropControl = () => {
    return <div></div>;
}


interface Props {
	content: {
		imgSrc: string;
		text: string;
	};
}


export const ShowDummyShort = ({content} : Props) => {
    return <Short type="dummy" content={content}></Short>
}

export default DragAndDropControl;

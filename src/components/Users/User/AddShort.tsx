import "./AddShort.css";

interface User {
	id: string;
	name: string;
}

interface Props {
	user: User;
}

const AddShort = ({user} : Props) => {
	return (
	<div className="add-short">
		Current add short
	</div>
	)
};

export default AddShort;

import "./DayTimer.css";

interface Props {
	percentTimeUsed: number;
}

const DayTimer = ({ percentTimeUsed }: Props) => {
	return (
		<img
			id="day-timer"
			src="/src/assets/logo.png"
			style={{
				clipPath: `inset(${percentTimeUsed}% 0% 0% 0%)`,
			}}
		></img>
	);
};

export default DayTimer;

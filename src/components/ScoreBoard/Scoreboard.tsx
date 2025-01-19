import { useEffect, useState } from "react";
import "./Scoreboard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// import { setShorts } from "../../store/shortSlice";


const Scoreboard = () => {
    const shorts = useSelector((state: RootState) => state.shorts);
	// const dispatch = useDispatch();

    const [reliability, setReliability] = useState(100);

    useEffect(() => {
        if (shorts.currentShortScore > 0) {
            if (shorts.currentShortScore < 4) {
                setReliability(prev => prev - 10);
            } else if (shorts.currentShortScore >= 7) {
                setReliability(prev => prev + 10);
            }
        }
    }, [shorts.currentShortScore])

    return (
        <div className="scoreboard">
            Reliability: {reliability}
        </div>
    );
};

export default Scoreboard;
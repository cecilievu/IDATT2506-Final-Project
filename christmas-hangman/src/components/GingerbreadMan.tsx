import './GingerbreadMan.css'

interface GingerbreadManProps {
    wrongGuesses: number;
    hasWon: boolean;
}

const GingerbreadMan = ({
    wrongGuesses,
    hasWon,
}: GingerbreadManProps) => {
    let image = '/images/gb-happy.png'; // Default image

    if (hasWon) {
        image = '/images/gb-winner.png';
    } else if (wrongGuesses >= 6) {
        image = '/images/gb-sad.png';
    } else if (wrongGuesses > 0) {
        image = '/images/gb-shocked.png';
    }

    return (
        <div className="gingerbread-man">
            {wrongGuesses >= 2 && (
                <div className="vertical-line"></div>
            )}
            {wrongGuesses >= 3 && (
                <div className="horizontal-line"></div>
            )}
            {wrongGuesses >= 4 && (
                <div className="diagonal-line"></div>
            )}
            {wrongGuesses >= 5 && (
                <div className="half-circle"></div>
            )}
            {wrongGuesses >= 6 && (
                <div className="final-line"></div>
            )}
            <img src={image} alt="Gingerbread Man" />
        </div>
    );
};

export default GingerbreadMan;
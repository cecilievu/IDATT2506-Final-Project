
interface GingerbreadManProps {
    wrongGuesses: number;
    hasWon: boolean;
}

const GingerbreadMan = ({
    wrongGuesses,
    hasWon,
}: GingerbreadManProps) => {
    return (
        <div className="gingerbread-man">
            <p>Gingerbread Man</p>
        </div>
    );
};

export default GingerbreadMan;
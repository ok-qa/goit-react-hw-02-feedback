const Options = ({ updateFeedback, totalFeedback, resetFeedback }) => {
    const updateGood = () => {updateFeedback('good')}
    const updateNeutral = () => {updateFeedback('neutral')}
    const updateBad = () => {updateFeedback('bad')}

    return (
        <>
            <button onClick={updateGood}>Good</button>
            <button onClick={updateNeutral}>Neutral</button>
            <button onClick={updateBad}>Bad</button>
            {!!totalFeedback && <button onClick={resetFeedback}>Reset</button>}
        </>
    )
 }

export default Options

const Feedback = ({ feedbackData, totalFeedback, positiveFeedback }) => {
    return<div>
        <p>{`Good: ${feedbackData.good}`}</p>
        <p>{`Neutral: ${feedbackData.neutral}`}</p>
        <p>{`Bad: ${feedbackData.bad}`}</p>
        <p>{`Total: ${totalFeedback}`}</p>
        <p>{`Positive: ${positiveFeedback}%`}</p>
        </div>
}

export default Feedback
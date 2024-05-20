import { useState, useEffect } from "react";
import FeedbackDescription from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const App = () => {
    const [feedbackValue, setFeedbackValue] = useState(() => {
    const savedFeedback = localStorage.getItem('savedFeedbacks');
    if (savedFeedback) {
      return JSON.parse(savedFeedback);
    } else {
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    }
    });
    
useEffect(() => {
    localStorage.setItem("'savedFeedbacks'", JSON.stringify(feedbackValue));
  }, [feedbackValue]);

    const updateFeedback = feedbackValue => {
        setFeedbackValue((prev) => {
            return {
                ...prev,
                [feedbackValue]: prev[feedbackValue] + 1
            }
        })
    }
    
 const resetFeedback = () => {
    setFeedbackValue({
      good: 0,
      neutral: 0,
      bad: 0,
    });
 };
    
const totalFeedback =
    feedbackValue.good + feedbackValue.neutral + feedbackValue.bad;
  
    const positiveFeedback =
        totalFeedback > 0 ? Math.round(((feedbackValue.good+feedbackValue.neutral) / totalFeedback) * 100) : 0;

    return(
        <>
            <FeedbackDescription />
            <Options updateFeedback={updateFeedback}
                totalFeedback={totalFeedback}
                resetFeedback={resetFeedback}
            />
            {totalFeedback ?
                <Feedback feedbackData={feedbackValue}
                totalFeedback={totalFeedback}
                positiveFeedback={positiveFeedback}/> :
                <Notification />}
        </>
    )
}

export default App; 
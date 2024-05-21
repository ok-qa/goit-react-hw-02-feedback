import { useState, useEffect } from "react";
import FeedbackDescription from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const initialFeedbackValue = {
        good: 0,
        neutral: 0,
        bad: 0,
}
    
const FEEDBACK_LOCALSTORAGE_KEY = 'savedFeedbacks';

const App = () => {
    const [feedbackValue, setFeedbackValue] = useState(initialFeedbackValue);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedFeedbacks = localStorage.getItem(FEEDBACK_LOCALSTORAGE_KEY);
        const startValue = savedFeedbacks ? JSON.parse(savedFeedbacks) :  initialFeedbackValue;
        setFeedbackValue(startValue);
    }, []);
    
    
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(FEEDBACK_LOCALSTORAGE_KEY, JSON.stringify(feedbackValue));
        } else {
            setMounted(true);
        }
    }, [feedbackValue, mounted]);
    

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
     console.log(12);
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
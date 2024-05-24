import { useState, useEffect } from "react";
import FeedbackDescription from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import css from "./App.module.css";

const initialFeedbackValue = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const FEEDBACK_LOCALSTORAGE_KEY = "savedFeedbacks";

const App = () => {
  const [feedbackValue, setFeedbackValue] = useState(() => {
    const savedFeedback = localStorage.getItem(FEEDBACK_LOCALSTORAGE_KEY);
    return savedFeedback ? JSON.parse(savedFeedback) : initialFeedbackValue;
  });

  useEffect(() => {
    localStorage.setItem(
      FEEDBACK_LOCALSTORAGE_KEY,
      JSON.stringify(feedbackValue)
    );
  }, [feedbackValue]);

  const updateFeedback = (feedbackValue) => {
    setFeedbackValue((prev) => {
      return {
        ...prev,
        [feedbackValue]: prev[feedbackValue] + 1,
      };
    });
  };

  const resetFeedback = () => {
    setFeedbackValue(initialFeedbackValue);
  };

  const totalFeedback =
    feedbackValue.good + feedbackValue.neutral + feedbackValue.bad;

  const positiveFeedback =
    totalFeedback > 0
      ? Math.round((feedbackValue.good / totalFeedback) * 100)
      : 0;

  return (
    <div className={css.mainContent}>
      <FeedbackDescription />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback ? (
        <Feedback
          feedbackData={feedbackValue}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;

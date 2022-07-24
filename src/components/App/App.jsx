import React from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';
import css from './App.module.css';
// import { useState } from 'react';
import { useReducer } from 'react';

// ------ Option #1: using useReducer ------

const handleReducer = (state, action) => {
  const { type, payload } = action;

  return { ...state, [type]: state[type] + payload };
};

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [state, dispatch] = useReducer(handleReducer, initialState);
  const { good, neutral, bad } = state;

  const handleClick = event => {
    const normalizedTextContent = event.target.textContent.toLowerCase();
    dispatch({ type: normalizedTextContent, payload: 1 });
  };

  const countTotalFeedbacks = () => {
    return Object.values(state).reduce((acc, item) => acc + item, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedbacks = countTotalFeedbacks();
    const posFeedbPerc = Math.round((good / totalFeedbacks) * 100);
    return posFeedbPerc ? posFeedbPerc : 0;
  };

  const buttonsNames = Object.keys(state);
  return (
    <div className={css.container}>
      <h1 className={css.header__title}>Cafe Espresso (feedbacks)</h1>
      <Section title="Please leave feedback">
        <FeedbackOptions options={buttonsNames} onLeaveFeedback={handleClick} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedbacks() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedbacks()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
};

export default App;

// ------ Option #2: using useState ------

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const handleClick = event => {
//     const normalizedTextContent = event.target.textContent.toLowerCase();

//     switch (normalizedTextContent) {
//       case 'good':
//         setGood(good + 1);
//         break;
//       case 'neutral':
//         setNeutral(neutral + 1);
//         break;
//       case 'bad':
//         setBad(bad + 1);
//         break;
//       default:
//         console.log('Unrecognized value:', normalizedTextContent);
//     }
//   };

//   const countTotalFeedback = () => {
//     return good + neutral + bad;
//   };

//   const countPositiveFeedbackPercentage = () => {
//     const totalFeedbacks = countTotalFeedback();
//     const posFeedbPerc = Math.round((good / totalFeedbacks) * 100);
//     return posFeedbPerc ? posFeedbPerc : 0;
//   };

//   const buttonsNames = ['good', 'neutral', 'bad'];

//   return (
//     <div className={css.container}>
//       <h1 className={css.header__title}>Cafe Espresso (feedbacks)</h1>
//       <Section title="Please leave feedback">
//         <FeedbackOptions options={buttonsNames} onLeaveFeedback={handleClick} />
//       </Section>

//       <Section title="Statistics">
//         {countTotalFeedback() === 0 ? (
//           <Notification message="There is no feedback" />
//         ) : (
//           <Statistics
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={countTotalFeedback()}
//             positivePercentage={countPositiveFeedbackPercentage()}
//           />
//         )}
//       </Section>
//     </div>
//   );
// };

// export default App;

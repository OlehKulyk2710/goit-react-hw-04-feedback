import React, { Component } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';
import css from './App.module.css';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = event => {
    const normalizedTextContent = event.target.textContent.toLowerCase();
    this.setState(prevState => ({
      [normalizedTextContent]: prevState[normalizedTextContent] + 1,
    }));
  };

  countTotalFeedback = () => {
    const feedbacksValues = Object.values(this.state);

    return feedbacksValues.reduce((prev, value) => prev + value, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const totalFeedbacks = this.countTotalFeedback();
    const posFeedbPerc = Math.round((good / totalFeedbacks) * 100);
    return posFeedbPerc ? posFeedbPerc : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const buttonsNames = Object.keys(this.state);

    return (
      <div className={css.container}>
        <h1 className={css.header__title}>Cafe Espresso (feedbacks)</h1>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={buttonsNames}
            onLeaveFeedback={this.handleClick}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default App;

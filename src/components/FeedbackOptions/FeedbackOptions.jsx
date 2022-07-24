import shortid from 'shortid';
import PropTypes from 'prop-types';

import css from './FeedbackOptions.module.css';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <div className={css.feedback__container}>
      <ul className={css.feedback__list}>
        {options.map(option => {
          const id = shortid.generate();
          return (
            <li key={id} className={css.feedback__item}>
              <button
                type="button"
                onClick={onLeaveFeedback}
                className={css.feedback__btn}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FeedbackOptions;

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

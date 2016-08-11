import React, { PropTypes } from 'react';
import timer from 'react-timer-hoc';
import moment from 'moment';
import classnames from 'classnames';

const Stopwatch = ({ timer }) =>
  <div className="stopwatch">
    <div className="stopwatch__count count">
      {moment(timer.tick * timer.delay).format('mm:ss')}
    </div>
  </div>

const Countdown = ({ timer, synchronizeWith, presentationTime }) => {
  const now = Date.now();
  const startTime = presentationTime * 60000;
  const remainder = startTime - (now - synchronizeWith);
  const countClassName = classnames({
    'countdown__count': true,
    'count': true,
    'warning': remainder < 120000 // two minute warning
  })
  return (
    <div className="countdown">
      <div className={countClassName}>
        {moment(remainder).format('mm:ss')}
      </div>
    </div>
  );
}

const StopwatchTimer = timer(1000)(Stopwatch);
const CountdownTimer = timer(1000)(Countdown);

const timeNow = Date.now(); // Can't be in the render method, because it reloads...

const Timer = (props) =>
  <div className="timer">
    <div className="timer__container">
      {props.stopwatch && <StopwatchTimer/>}
      {props.presentation.time && props.presentation.time > 0 &&
        <CountdownTimer
          presentationTime={props.presentation.time}
          synchronizeWith={timeNow}/>}
    </div>
  </div>

Timer.propTypes = {
  presentation: PropTypes.object,
  stopwatch: PropTypes.bool
};

export default Timer;

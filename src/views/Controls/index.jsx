import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from './index.css';
import Icon from '../Icon';

const Control = ({ name, onClick }) => (
  <button
    className={styles.button}
    onClick={() => onClick(name)}
  >
    <Icon name={name} />
  </button>);

const PreviousGame = ({ game }) => (
  <div>{`${game[0].throw} ${game[1].throw}`}</div>
);

const Controls = ({ games, hands, throwHand }) => console.log(games) || (
  <ul className={styles.board}>
    <li className="current-game">
      <div className={[styles['team-one'], styles.side].join(' ')}>
        {hands.map(hand => (
          <Control name={hand.type} onClick={throwHand} />
        ))}
      </div>
      <div className={[styles['team-two'], styles.side].join(' ')}>
        {hands.map(hand => (
          <Icon name={hand.type} />
        ))}
      </div>
    </li>
    {games.map(game => (
      <PreviousGame game={game} />
    ))}
  </ul>
);

export default connect(
  state => ({
    games: state.data.games,
    hands: state.data.hands,
  }),
  dispatch => ({
    throwHand: hand => dispatch({ type: actions.THROW, payload: hand }),
  })
)(Controls);

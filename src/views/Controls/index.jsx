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

const PreviousGame = ({ result }) => (
  <li className={[result.won && styles.won, styles.result].join(' ')}>
    <Icon name={result.throw} />
  </li>
);

const Controls = ({ games, hands, scores, throwHand }) => [
  <ul>
    <li>
      {hands.map(hand => (
        <Control name={hand.type} onClick={throwHand} />
      ))}
    </li>
  </ul>,
  <div className={[styles.side, styles.board, styles['team-one']].join(' ')}>
    <h2 className={styles['player-title']}>Player ({scores.player})</h2>
    <ul className={styles.results}>
      {games.map(game => (
        <PreviousGame result={game[0]} />
      ))}
    </ul>
  </div>,
  <div className={[styles.side, styles.board, styles['team-two']].join(' ')}>
    <h2 className={styles['player-title']}>CPU ({scores.cpu})</h2>
    <ul className={styles.results}>
      {games.map(game => (
        <PreviousGame result={game[1]} />
      ))}
    </ul>
  </div>,
];

export default connect(
  state => ({
    games: state.data.games,
    hands: state.data.hands,
    scores: state.data.scores,
  }),
  dispatch => ({
    throwHand: hand => dispatch({ type: actions.THROW, payload: hand }),
  })
)(Controls);

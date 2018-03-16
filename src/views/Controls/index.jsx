import React from 'react';
import { filter } from 'ramda';
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

/**
  the .join is a bit grim, should probably have used classNames or write a helper
  function to at least hide it...
*/
const PreviousGame = ({ result }) => (
  <li className={[result.won && styles.won, styles.result].join(' ')}>
    <Icon name={result.throw} />
  </li>
);

const Player = ({ games, player, scores }) => (
  <div className={[styles.side, styles.board].join(' ')}>
    <h2 className={styles['player-title']}>{player} ({scores[player]})</h2>
    <ul className={styles.results}>
      {
        games.map(game => {
          const thisPlayerSelection = filter(round => round.team === player, game);
          return (
            <PreviousGame
              key={thisPlayerSelection[0].id}
              result={thisPlayerSelection[0]}
            />
          );
        })
      }
    </ul>
  </div>
);

const Controls = ({ games, hands, scores, throwHand }) => [
  hands.map(hand =>
    <Control key={hand.id} name={hand.type} onClick={throwHand} />
  ),
  <Player games={games} player="player" scores={scores} />,
  <Player games={games} player="cpu" scores={scores} />,
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

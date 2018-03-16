import hands from '../defaults';
import { append, assoc, filter, flatten, head, length, map, merge, prop, reduce, last } from 'ramda';

const init = {
  hands,
  games: [],
  scores: {
    player: 0,
    cpu: 0
  },
};

const appendGame = (state, payload) => {
  const games = prop('games', state);
  return append(payload, games);
};

const countScore = games =>
  length(filter(game => game.won, games));

const getScores = games => {
  const player = countScore(map(game => head(game), games));
  const cpu = countScore(map(game => last(game), games));
  return {
    player,
    cpu
  }
};

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'THROW_COMPLETED':
      const updatedGames = appendGame(state, payload);
      const updatedScores = getScores(updatedGames);
      return merge(state, {
        games: updatedGames,
        scores: updatedScores,
      });
    case 'SWITCH_MODE':
      return state;
    default: {
      return state;
    }
  }
};

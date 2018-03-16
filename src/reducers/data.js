import { append, assoc, filter, head, length, map, merge, prop, last } from 'ramda';
import hands from '../constants';

const init = {
  hands,
  games: [],
  scores: {
    player: 0,
    cpu: 0,
  },
};

const appendGame = (state, payload) => {
  const games = prop('games', state);
  return append(payload, games);
};

const countScore = games =>
  length(filter(game => prop('won', game), games));

const getScores = games => ({
  player: countScore(map(game => head(game), games)),
  cpu: countScore(map(game => last(game), games)),
});

const throwCompleted = (state, payload) => {
  const updatedGames = appendGame(state, payload);
  const updatedScores = getScores(updatedGames);
  return merge(state, {
    games: updatedGames,
    scores: updatedScores,
  });
};

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'THROW_COMPLETED':
      return throwCompleted(state, payload);
    case 'SWITCH_MODE':
      return state;
    default: {
      return state;
    }
  }
};

import hands from '../defaults';
import { append, assoc, prop } from 'ramda';

const init = {
  hands,
  games: [],
};

const throwHand = (state, payload) => {
  return assoc('games', append(payload, prop('games', state)), state);
};

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'THROW_COMPLETED':
      return throwHand(state, payload);
    case 'SWITCH_MODE':
      return state;
    default: {
      return state;
    }
  }
};

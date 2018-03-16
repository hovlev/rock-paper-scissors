import { equals, filter, find, head, map, merge, not, prop, propEq, length } from 'ramda';
import { takeLatest, put } from 'redux-saga/effects';
import actions from '../actions';
import hands from '../constants';

/**
  This is the CPU's hand selection
*/
const getRandomHandIndex = () => Math.floor(Math.random() * hands.length);

/**
  I've simulated a server-like flow here, as obviously the server would contain
  the logic around deciding the winner
*/
const setWinner = results =>
  map(result => {
    const team = prop('team', result);
    const otherPlayer = filter(filteredResult =>
      not(equals(team, prop('team', filteredResult))), results);
    const otherThrow = prop('throw', head(otherPlayer));
    const currentThrow = find(propEq('type', prop('throw', result)))(hands);
    return merge(result, {
      id: `${team}-${new Date().getTime()}`,
      won: equals(currentThrow.beats, otherThrow),
    });
  }, results);

const calculateResult = payload => {
  const results = [
    {
      team: 'player',
      throw: payload,
    },
    {
      team: 'cpu',
      throw: hands[getRandomHandIndex()].type,
    },
  ];
  return setWinner(results);
};

export default function* () {
  yield takeLatest(actions.THROW, function* ({ payload }) {
    yield put({ type: actions.THROW_COMPLETED, payload: calculateResult(payload) });
  });
}

import { assoc, equals, filter, find, map, not, prop, propEq } from 'ramda';

import { takeLatest, put } from 'redux-saga/effects';
import actions from '../actions';
import hands from '../defaults';

const getRandomHandIndex = () => Math.floor(Math.random() * hands.length);

const setWinner = results =>
  map(result => {
    const otherPlayer = filter(filteredResult =>
      not(equals(prop('team', result), prop('team', filteredResult))), results);
    const otherThrow = otherPlayer[0].throw;
    const currentHand = find(propEq('type', prop('throw', result)))(hands);
    return assoc('won', equals(currentHand.beats, otherThrow), result);
  }, results);

const calculateResult = payload => {
  const results = [
    {
      team: 'red',
      throw: payload,
    },
    {
      team: 'blue',
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

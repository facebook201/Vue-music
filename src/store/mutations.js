import * as types from './mutation-type';

// 便于书写方便
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  }
};
export default mutations;

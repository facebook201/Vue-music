import * as types from './mutation-type';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id;
  });
}

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit(types.SET_PLAYLIST, list);
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
  }
};

// 随机播放
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQUENCE_LIST, list);
  let randomList = shuffle(list);
  commit(types.SET_PLAYLIST, randomList);
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

// 搜索列表插入歌曲
export const insertSong = function({commit, state}, song) {
  let playlist = state.playlist;
  // let sequenceList = state.sequenceList;
  let currentIndex = state.currentIndex;
  // 记录当前歌曲
  // let currentSong = playlist[currentIndex];
  // 查找当前列表中是否有待插入的歌曲并返回索引
  let fpIndex = findIndex(playlist, song);
  // 因为是插入歌曲 所以索引要加1
  currentIndex++;
  // 插入这首歌当前索引位置
  playlist.splice(currentIndex, 0, song);
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前这个插入的这个序号 大于列表的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1, 1);
    }
  }
};

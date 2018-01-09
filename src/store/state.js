import { playMode } from 'common/js/config';

const state = {
  singer: {},
  // 播放器的 播放暂停 展开全屏 播放列表 顺序列表
  // 这里的播放列表和顺序列表是不一样的 随机播放的时候他们两个的顺序是不一样的
  palying: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1 // 当前播放的索引 控制前进后退
};

export default state;

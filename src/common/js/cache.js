// 缓存的信息 搜索列表 播放列表 收藏等
import storage from 'good-storage';

const SEARCH_KEY = '__search__'; // 搜索的钥匙 标志
const SEARCH_MAX_LENGTH = 15; // 最大15条数据

function insertArray(arr, val, compare, maxLen) {
  // 查找compare是否在arr里面 如果是 返回索引 否则返回-1
  const index = arr.findIndex(compare);
  if (index === 0) {
    // 如果是第一条数据 就返回
    return;
  }
  // 如果有这条数据 则把这条数据删除 然后插入第一个位置
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  // 保证arr的length 小于等于maxLen
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

export function saveSearch(query) {
  // 如果没有存过 就是个空数组
  let searches = storage.get(SEARCH_KEY, []);

  insertArray(searches, query, (item) => {
    return item === query;
  }, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, searches);
  return searches;
}
// 从本地缓存取出searchHistory
export function loadSearch() {
  const ret = storage.get(SEARCH_KEY);
  return ret ? storage.get(SEARCH_KEY) : [];
}

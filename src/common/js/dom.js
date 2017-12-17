// 给dom对象加上一个class
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

// 判断dom对象是否有这个class
export function hasClass(el, className) {
  // 满足开头或者空白字符 结尾也是一样
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

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

<<<<<<< HEAD
// 根据某个属性来获取index
=======
// 获取数据 根据属性来get 或者set属性值
>>>>>>> 74ca66fb5ff4fc6b8f497e028ee2c9a69f3c6df8
export function getData(el, name, val) {
  const prefix = 'data-';
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}

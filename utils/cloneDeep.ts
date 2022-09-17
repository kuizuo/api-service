const hasOwnProperty = Object.prototype.hasOwnProperty
const getType = Object.prototype.toString

// 初始化一个数组对象，包括正则返回的特殊数组
function initCloneArray(array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

// 获取key的方法
function getKeysFunc(isFull) {
  // 返回对象上可枚举Symbol key的数组
  function getSymbols(object) {
    if (object == null)
      return []

    object = Object(object)
    return Object
      .getOwnPropertySymbols(object)
      .filter(symbol => Object.prototype.propertyIsEnumerable.call(object, symbol))
  }
  // 判断是否是合法的类数组的length属性
  function isLength(value) {
    return typeof value === 'number'
      && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER
  }
  // 判断是否是类数组
  function isArrayLike(value) {
    return value != null && typeof value !== 'function' && isLength(value.length)
  }
  // 判断是否是合法的类数组的index
  function isIndex(value, length) {
    const reIsUint = /^(?:0|[1-9]\d*)$/
    const type = typeof value
    length = length == null ? Number.MAX_SAFE_INTEGER : length

    return !!length
      && (type === 'number'
        || (type !== 'symbol' && reIsUint.test(value)))
      && (value > -1 && value % 1 === 0 && value < length)
  }
  // 是否是arguments
  function isArguments(value) {
    return typeof value === 'object' && value !== null && getType.call(value) === '[object Arguments]'
  }
  // 返回类数组上key组成的数组
  function arrayLikeKeys(value, inherited) {
    const isArr = Array.isArray(value)
    const isArg = !isArr && isArguments(value)
    const skipIndexes = isArr || isArg
    const length = value.length
    const result = new Array(skipIndexes ? length : 0)
    let index = skipIndexes ? -1 : length
    while (++index < length)
      result[index] = `${index}`

    for (const key in value) {
      if ((inherited || hasOwnProperty.call(value, key))
        && !(skipIndexes && (
          // Safari 9 has enumerable `arguments.length` in strict mode.
          (key === 'length'
            // Skip index properties.
            || isIndex(key, length))
        )))
        result.push(key)
    }
    return result
  }

  // 返回对象上可枚举属性key
  function keys(object) {
    return isArrayLike(object)
      ? arrayLikeKeys(object)
      : Object.keys(Object(object))
  }

  // 返回对象上可枚举属性key + Symbol key的数组
  function getAllKeys(object) {
    const result = keys(object)
    if (!Array.isArray(object))
      result.push(...getSymbols(object))

    return result
  }

  return isFull
    ? getAllKeys
    : keys
}

// 拷贝正则对象
function cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, regexp.flags)
  result.lastIndex = regexp.lastIndex
  return result
}

// 拷贝arguments对象

function cloneArguments(args) {
  const result = (function () { return arguments })()
  result.callee = args.callee
  result.length = args.length
  return result
}

const cloneDeep = function (target, isFull = true, cache = new WeakMap(), parent = null) {
  // 值类型
  const undefinedTag = '[object Undefined]'
  const nullTag = '[object Null]'
  const boolTag = '[object Boolean]'
  const numberTag = '[object Number]'
  const stringTag = '[object String]'
  const symbolTag = '[object Symbol]'
  const bigIntTag = '[object BigInt]'
  // 引用类型
  const arrayTag = '[object Array]'
  const objectTag = '[object Object]'
  const setTag = '[object Set]'
  const mapTag = '[object Map]'
  const argTag = '[object Arguments]'
  const regexpTag = '[object RegExp]'
  const dateTag = '[object Date]'
  const funcTag = '[object Function]'
  const promiseTag = '[object Promise]'
  // 无法拷贝的引用类型
  const weakMapTag = '[object WeakMap]'
  const weakSetTag = '[object WeakSet]'
  const errorTag = '[object Error]'

  // 传入对象的类型
  const type = getType.call(target)

  // 所有支持的类型
  const allTypes = [
    undefinedTag, nullTag, boolTag, numberTag, stringTag, symbolTag, bigIntTag, arrayTag, objectTag,
    setTag, mapTag, argTag, regexpTag, dateTag, funcTag, promiseTag,
    weakMapTag, weakSetTag, errorTag,
  ]

  // 如果是不支持的类型
  if (!allTypes.includes(type)) {
    console.warn(`不支持${type}类型的拷贝，返回{}。`)
    return {}
  }

  // 值类型数组
  const valTypes = [
    undefinedTag, nullTag, boolTag, numberTag, stringTag, symbolTag, bigIntTag,
  ]
  // 值类型直接返回
  if (valTypes.includes(type))
    return target

  // forEach
  function forEach(array, iteratee) {
    let index = -1
    const length = array.length

    while (++index < length) {
      // 中断遍历
      if (iteratee(array[index], index, array) === false)
        break
    }
    return array
  }

  // 初始化clone值
  let cloneTarget
  if (Array.isArray(target)) {
    cloneTarget = initCloneArray(target)
  }
  else {
    switch (type) {
      case argTag:
        cloneTarget = cloneArguments(target)
        break
      case regexpTag:
        cloneTarget = cloneRegExp(target)
        break
      case dateTag:
        cloneTarget = new target.constructor(+target)
        break
      case funcTag:
        cloneTarget = parent ? target : {}
        break
      case promiseTag:
        cloneTarget = target.then()
        break
      case weakMapTag:
      case weakSetTag:
      case errorTag:
        !parent && console.warn(`${type}类型无法拷贝，返回{}。`)
        cloneTarget = parent ? target : {}
        break
      default:
        cloneTarget = new target.constructor()
    }
  }
  // 阻止循环引用
  if (cache.has(target))
    return cache.get(target)

  cache.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(cloneDeep(value, cache))
    })
    return cloneTarget
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, cloneDeep(value, cache))
    })
    return cloneTarget
  }

  // 确定获取key的方法
  const keysFunc = getKeysFunc(isFull)

  // 克隆Array 和Object
  const keys = type === arrayTag ? undefined : keysFunc(target)
  forEach(keys || target, (value, key) => {
    if (keys)
      key = value

    cloneTarget[key] = cloneDeep(target[key], isFull, cache, target)
  })

  return cloneTarget
}

export default cloneDeep

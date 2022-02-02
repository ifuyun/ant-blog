import { createHash } from 'crypto';
import * as unique from 'lodash/uniq';

/**
 * 截取字符串为指定长度，超过长度加'...'
 * @param {string} srcStr 源字符串
 * @param {number} cutLength 指定长度
 * @return {string} 截取结果字符串
 * @version 1.0.0
 * @since 1.0.0
 */
export function cutStr(srcStr: string, cutLength: number) {
  let resultStr;
  let i = 0;
  let n = 0;
  let curChar;
  const half = 0.5;

  while (n < cutLength && i < srcStr.length) {
    curChar = srcStr.charCodeAt(i);
    if (curChar >= 192 || (curChar >= 65 && curChar <= 90)) {// 中文和大写字母计为1个
      n += 1;
      if (n <= cutLength) {
        i += 1;
      }
    } else {// 其余字符计为半个
      n += half;
      i += 1;
    }
  }
  resultStr = srcStr.substring(0, i);
  if (srcStr.length > i) {
    resultStr += '...';
  }
  return resultStr;
}

/**
 * 过滤HTML标签
 * @param {string} srcStr 源字符串
 * @return {string} 过滤结果字符串
 * @version 1.0.0
 * @since 1.0.0
 */
export function filterHtmlTag(srcStr) {
  return srcStr.replace(/<\/?[^>]*>/ig, '');
}

/**
 * md5加密字符串
 * @param {string} str 源字符串
 * @return {string} 加密结果
 * @version 1.0.0
 * @since 1.0.0
 */
export function md5(str) {
  let md5sum = createHash('md5');
  md5sum.update(str);
  return md5sum.digest('hex');
}

/**
 * 生成随机ID字符串：10/11位十六进制时间戳+6/5位十六进制随机数
 * @return {string} ID
 * @version 1.0.0
 * @since 1.0.0
 */
export function getUuid() {
  // 1e12 + 0x4ba0000000
  const idLen = 16;
  const hex = 16;
  const timeBased = 1324806901760;// 2011-12-25 17:55:01
  const timeStamp = new Date().getTime() - timeBased;
  const uuid = timeStamp.toString(hex);
  let tmpStr = '';

  for (let idx = 0; idx < idLen - uuid.length; idx += 1) {
    tmpStr += Math.floor(Math.random() * hex).toString(hex);
  }

  return uuid + tmpStr;
}

/**
 * URL添加来源参数
 * @param {string} url URL
 * @param {string} from 来源
 * @return {string} 新的URL
 * @version 1.0.0
 * @since 1.0.0
 */
export function appendUrlRef(url, from) {
  const split = url.indexOf('?') >= 0 ? '&' : '?';
  return url + split + 'ref=' + from;
}

/**
 * 生成验证码随机字符串
 * @return {string} 验证码
 */
export function getRandomText(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charsLength = chars.length;
  const captchaLength = 4;
  let captchaStr = '';
  for (let i = 0; i < captchaLength; i += 1) {
    captchaStr += chars[Math.floor(Math.random() * charsLength)];
  }

  return captchaStr;
}

/**
 * 判断是否空对象
 * @param {Object} obj 源对象
 * @return {boolean} 判断结果：为空返回true，否则返回false
 * @version 1.0.0
 * @since 1.0.0
 */
export function isEmptyObject(obj) {
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

/**
 * 标签去重
 * @method uniqueTags
 * @static
 * @param {string} tagStr tag string
 * @return {string} tag string
 * @author Fuyun
 * @version 1.0.0
 * @since 1.0.0
 */
export function uniqueTags(tagStr: string) {
  const tags = tagStr.split(',');
  return unique(tags).join(',');
}
/**
 * スニペットオブジェクト
 */
const snippets = require('../snippets/snippets.json');

/**
 * docs/配下にファイル出力
 */
const output = function (str, name) {
  const fs = require("fs");
  const path = `${__dirname}/../docs/${name}`;

  try {
    fs.writeFileSync(path, str);
    console.log('output success!');
  } catch (e) {
    console.log(e);
  }
}

/**
 * スニペットからdatテキスト部分を抽出する
 */
const extractDat = function (snippets) {
  return Object.entries(snippets)
    .map(([key, value]) => value.body.join("\n"))
    .map(dat => dat.replace(/\$\d+/g, 'example'));
};

/**
 * スニペットからプロパティ一覧を抽出する
 */
const extractDefinedKeys = function (snippets) {
  const keys = extractKeys(snippets);
  const converted = uppercaseSupport(keys);
  return uniqueAndSort(converted);

}
const extractKeys = function (obj) {
  // =以降, [], コメント
  const reg = /(=.*$|\[.+\]|^#.*$)/gi;

  return Object.entries(obj)
    .map(([key, value]) => value.body)
    .flat()
    .map(body => body.replace(reg, '').trim())
    .filter(body => body);
};

/**
 * 大文字・小文字の両方をサポートする
 */
const uppercaseSupport = function (keys) {
  // 先頭、アンダースコアの後、大文字、よくある単語
  const reg = /^(.)|_(.)|([A-Z])|(cost|image|type|color|signal|diagonal)/g;
  const replacer = function (match, p1, p2, p3, p4, i, str) {
    if (p1 || p3) {
      return `[${str[i].toLowerCase()}${str[i].toUpperCase()}]`;
    }
    if (p2) {
      return `_[${str[i + 1].toLowerCase()}${str[i + 1].toUpperCase()}]`;
    }
    if (p4) {
      return `[${p4[0].toLowerCase()}${p4[0].toUpperCase()}]${p4.substring(1, p4.length)}`;
    }
  }

  return keys.map(key => key.replace(reg, replacer));
};

/**]
 * 重複除去、ソート
 */
const uniqueAndSort = function (arr) {
  const alphaSort = require('alpha-sort');
  return [...new Set(arr)].sort(alphaSort.descending);
}


module.exports = { snippets, extractDat, extractDefinedKeys, output };

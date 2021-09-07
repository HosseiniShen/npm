const fs = require('fs');
const path = require('path')
const http = require('http')
const pinyin = require("pinyin_js");

http.get('http://operation-gateway-fat-alhz.inzm.com/api/market-web-server/v1/dict/getCountryCode', res => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消费响应数据以释放内存
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      const list = sort(parsedData.data.children)
      parsedData.data.children = list
      writeJson(path.join(process.cwd(), './pinyin_js/code.json'), JSON.stringify(parsedData.data, null, 2))
    } catch (e) {
      console.error(e.message);
    }
  });
})

function sort (list) {
  const ret = {}
  list.forEach(i => {
    let addr = i.pinyin = pinyin.pinyinWithOutYin(i.extendLabel)
    addr = addr.slice(0, 1).toUpperCase()
    if (!ret[addr]) {
      ret[addr] = { addr, children: [] }
    }
    ret[addr].children.push(i)
  })
  return Object.values(ret).sort((a, b) => a.addr.charCodeAt() - b.addr.charCodeAt())
}

function writeJson (targetPath, target) {
  fs.writeFileSync(targetPath, target)
}
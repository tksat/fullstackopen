# ヘルシンキ大学のフロントエンド学習
https://fullstackopen.com/

### 開始方法
```
npm start
```


## シンプルなウェブサーバー


```javascript:package.json
  "scripts": {
    //追記
    "start": "node index.js",
  }
```

```
npm start
```
上記コマンドでサーバーが起動する

```javascript:index.js
const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('こんにちわ世界')
})

const PORT = 3001
app.listen(PORT)
console.log(`サーバーがポート${PORT}で起動しています`)
```

http://localhost:3001/にアクセス

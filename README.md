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
  res.writeHead(200, { 'Count-Type': 'text/plain' })
  res.end('Hello word!!!')
})

const PORT = 3001
app.listen(PORT)
console.log(`${PORT}ポートでサバーが起動しています`)

```

http://localhost:3001/にアクセス


### json形式のデータを表示する

```javascript:index.js
const http = require('http')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Count-Type': 'application/json' })
  res.end(JSON.stringify(notes))
})

const PORT = 3001

app.listen(PORT)
console.log(`${PORT}ポートでサバーが起動しています`)

```
## Expressを導入
Node.js上で利用できるWebアプリケーションフレームワーク。
Webアプリケーションとは、インターネット上で利用するサービスを動かすシステムです。

```
npm install express
```

## nodemonでwebサーバーを監視する
変更があるたびに再起動していたのを、nodemonを私用して保存するたびに自動で更新してくれるようにする
アプリ開発中にのみ必要な機能なので、「dependencies」でインストールします
```
npm install --save-dev nodemon
```

npmのコマンドで立ち上がるように追記します
```javascript:package.json
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```
nodemonで起動する
```
npm run dev
```

## REST APIについて
Webアプリケーションを構築するためのアーキテクチャスタイルです。
GET、POST、PUT、DELETE等のHTTP標準のメソッドを使うことで、
シンプルで一貫性のあるリクエスト標準化が円滑に行える。
[Qiita RESTfull API参照記事](https://qiita.com/NagaokaKenichi/items/0647c30ef596cedf4bf2)

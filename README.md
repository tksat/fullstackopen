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

```javascript
//Hello word!が表示される
app.get('/', (req, res) => {
  res.send('<h1>Hello word!</h1>')
})

//notesのデータ一式をjson形式で表示
app.get('/api/notes', (req, res) => {
  if (notes) {
    res.json(notes)
  } else {
    res.status(404).end()
  }
})

//指定のデータのみ抽出し、json形式で表示
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  res.json(note)
})

//指定のデータのみ削除する
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})
```

### Postmanで確認する
[Postman](https://www.postman.com/)
delete・putはPostmanで確認テストができる

my work space > 新規タブ > urlを選択し、delte or put を選択する
実行に成功すると右下に204が表示される

アプリケーションのメモのみに保存されるので、再起動するとものに戻る

### Visual studioならもっと簡単

#### REST Client
https://marketplace.visualstudio.com/items?itemName=humao.rest-client

プラグインをインストールすると、その使用は非常に簡単です。
アプリケーションのルートにrequestsという名前のディレクトリを作成します。
すべてのRESTクライアント要求を.rest拡張子で終わるファイルとしてディレクトリに保存します。

```javascript:requests/get_all_notes.rest
GET http://localhost:3000/api/notes/
```
エディターでget_all_notes.restを開くと、"GET"の上部に「Send Request」の表示をクリック。
RESTクライアントがHTTPリクエストを実行し、サーバーからのレスポンスがエディターで開かれます。

## データと追加できるようにする

```javascript
const express = require('express')
const app = express()

//データを追加できる設定
app.use(express.json())

//・・・省略

//データを追加する
// スプレット構文でnotesを配列にする処理がされている
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  // contentの無いようがなかったらエラーを返す
  if (!body.content) {
    return res.status(400).json({ error: 'content mossing' })
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false
  }
  notes.concat(note)
  res.json(note)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`${PORT}ポートでwebサーバーが起動しています!`)
})

```

### REST ClientでPOSTを確認する

```javascript:requests/create_note.rest
POST http://localhost:3000/api/notes/
Content-Type: application/json

{
  "content": "local",
  "important": true
}
```
「Send Request」をクリックすると右側にアプリケーションが正しく受信できているか確認できます。

## ミドルウェア

### ミドルウェアとは
ミドルウェアとは、リクエストオブジェクトとレスポンスオブジェクトを受け取り、任意の処理を行う関数です。
複数のミドルウェアを同時に使用することもできる。
app.useは上から順に実行されていくので書き順にちゅういする。

▼読み込み時に実行

```javascript
const express = require('express')
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// 省略・・・
```

▼読み込み後に実行
```javascript
// 省略・・・
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`${PORT}ポートでwebサーバーが起動しています!`)
})
```

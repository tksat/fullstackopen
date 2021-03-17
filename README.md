# ヘルシンキ大学のフロントエンド学習
https://fullstackopen.com/

### 開始方法
```
npm start
```

## 同一オリジンポリシー
ブラウザーで実行されるアプリケーションのJavaScriptは同じオリジンのサーバーとのみ通信できる。
サーバーはローカルホストポート3001、フロントエンドはローカルホストポート3000にあるため、
これらのオリジンは同じではありません。

## ミドルウェアcorsで、他のオリジンからのリクエストを許可する
```
npm install cors

```
ミドルウェアを使用して、すべてのオリジンからの要求を許可します。

```javascript
const cors = require('cors')
app.use(cors())
```

## Herokuで公開する

### Herokuのセットアップをする

手順に沿ってターミナルでherokuにログイン出来る所まですすめる
https://devcenter.heroku.com/ja/articles/getting-started-with-nodejs#-2

### ローカルアプリの第一階層にProcfileファイルを作成
```
web: node index.js
```
第一階層のindex.jsで最後に記入してあるPORTの記述を下記に変更
```
const PORT = process.env.PORT || 3001
```
### Herokuアプリを作成
Herokuのソースコードを受け取れるようにします。
アプリを作成すると、heroku​ という名前の git リモートリポジトリも作成され、ローカルの git リポジトリと関連付けられます。
```
heroku create
```
### コードをデプロイ
```
git push heroku main
```

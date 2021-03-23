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
### Herokuアプリケーションの新規作成
Herokuのソースコードを受け取れるようにします。
アプリを作成すると、heroku​ という名前の git リモートリポジトリも作成され、ローカルの git リポジトリと関連付けられます。
```
heroku create {好きな名前}
```
### コードをherokuにデプロイ（masterブランチにいる場合）
```
git push heroku master
```

### コードをherokuにデプロイ（他のブランチにいる場合）
```
git push heroku <現在いるブランチ名>:master
```

### herokuの接続先URLを変更する
```
//herokuのulrを変更
git remote set-url heroku https://git.heroku.com/samplecode.git

//remoteで登録できたか確認
git remote -v
```

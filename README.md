# ヘルシンキ大学のフロントエンド学習
https://fullstackopen.com/

### 開始方法
```
npm start
```

## Part2 React データの更新・受け渡し

### 子コンポーネントへデータをpropsでわたす
- リストには必ずKeyをつける

```javascript : App.js
import React from 'react'
import NoteList from './NoteList'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

const App = () => {
  return (
    <>
      <NoteList notes={notes} />
    </>
  )
}

export default App;

```

```javascript : NoteList.js
import React from 'react'

const NoteList = ({ notes }) => {
  const item = notes.map(note => {
    return <li key={note.id}>{note.content}</li>
  })

  return (
    <div>
      <h1>Notes</h1>
      <ul>{item}</ul>
    </div>
  )
}

export default NoteList

```

## jsonサーバーでデータを受け渡し
#### jsonサーバーとは
開発フェーズでサーバー側の機能をプログラムせずに使用できるようにする便利なツールです。

#### jsonサーバーをグローバルインストール
```
npm install -g json-server
```

#### db.jsonにjson形式のデータを作成する
```javascript:db.json
{
  "notes": [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    }
  ]
}
```

#### 動作させる
```
json-server --watch db.json
```
ポート3000番が使用されている場合は下記でポート番号を変更できる
reactのコンパイルした時のポート番号とかぶる場合はこのように変更する
```
json-server --port 3001 --watch db.json
```

#### jsonを確認する
下記urlにアクセスするとjsonデータが取得できる
http://localhost:3000/notes

## jsonデータをfetchして使用するためにaxiosをインストール
```
npm install axios
```
#### json-serverを開発依存関係を持たせる
```
npm install json-server --save-dev
```
コマンドでサーバーを起動するためにpackage.jsonに追記する
```
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    //↓サーバー実行の記述
    "server": "json-server -p3001 --watch db.json"
  },
}
```
下記をターミナルでたたくと実行できる
```
npm run server
```

### npmインストール時のメモ
```
npm install axios
npm install json-server --save-dev
```
パラメータには微妙な違いがあります。プログラムの実行にはライブラリの存在が必要なため、axiosはアプリケーションの実行時依存関係としてインストールされます。一方、json-serverは、プログラム自体が必要としないため、開発依存関係（--save-dev）としてインストールされました。これは、ソフトウェア開発中の支援に使用されます。コースの次の部分では、さまざまな依存関係について詳しく説明します。

### useEffectで外部からデータを取得

```javascript:NoteList.js
//useEffectを追加
import React, { useState, useEffect } from 'react'
//axiosを追加
import axios from 'axios'

const NoteList = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('useEffect')
    axios.get('http://localhost:3001/notes')
      .then(res => setNotes(res.data))
  }

  //第2引数に空配列を渡すと、マウント時に外部データを取得
  useEffect(hook,[])

  ・・・省略
```

## サーバーのデータを変更する
### postでjsonサーバーにデータを追加する

addNoteにpostを追記していきます
```javascript:NoteList.js
  const addNote = event => {
    event.preventDefault()
    const newObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    //postでjsonサーバーに追加します
    axios.post('http://localhost:3001/notes', newObj)
      .then(res => {
        setNotes(notes.concat(newObj))
        setNewNote('')
      })
  }
```

### putでjsonサーバーにデータを変更する

```javascript:NoteList.js

//idが一致したデータを書き換える
 const toggleImpotance = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

```

```javascript:NoteList.js:Note.js
const Note = ({ note, toggleImpotance }) => {
  const label = note.important ? '重要です' : '重要ではありません'
  return (
    <li>
      {note.content}
      <button onClick={() => toggleImpotance(note.id)}>{label}</button>
    </li>
  )
}
```

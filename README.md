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

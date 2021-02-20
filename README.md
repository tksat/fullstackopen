# ヘルシンキ大学のフロントエンド学習
https://fullstackopen.com/

### 開始方法
```
npm start
```
## Part1 Reactの基礎

### stateを個別で管理する

```
import React, { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      {left}
      <button onClick={() => setLeft(left + 1)}>left</button>
      <button onClick={() => setRight(right + 1)}>right</button>
      {right}
    </div>
  )
}

export default App
```

### stateをひとつにまとめて管理する
```
import React, { useState } from 'react'

const App = () => {
  const [clicks, setCliks] = useState({
    left: 0, right: 0
  })

  return (
    <div>
      {clicks.left}
      <button onClick={() => setCliks({ ...clicks, left: clicks.left + 1 })}>left</button>
      <button onClick={() => setCliks({ ...clicks, right: clicks.right + 1 })}>right</button>
      {clicks.right}
    </div>
  )
}

export default App
```

### useStateの配列処理
```
import React, { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [clickHistory, setClickHistory] = useState([])

  const handleClickLeft = () => {
    setClicks({ ...clicks, left: clicks.left + 1 })
    setClickHistory(clickHistory.concat('L'))
  }

  const handleClickRight = () => {
    setClicks({ ...clicks, right: clicks.right + 1 })
    setClickHistory(clickHistory.concat('R'))
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleClickLeft}>left</button>
      <button onClick={handleClickRight}>right</button>
      {clicks.right}
      <p>{clickHistory.join(' ')}</p>
    </div>
  )
}

export default App
```

### 【メモ】　関数を返す関数の省略
```
//通常の記述
const hello = () => {
  const handler = () => console.log('hello word')
  return handler
}

//省略その1
const hello = () =>
  return () => console.log('hello word')

//省略その2
const hello = () => () => {console.log('hello word')}
```

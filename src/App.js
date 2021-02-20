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

import React, { useState } from 'react'
import History from './History'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [clickHistory, setClickHistory] = useState([])

  const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>
  }

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
      <Button onClick={handleClickLeft} text={"left"} />
      <Button onClick={handleClickRight} text={"right"} />
      {clicks.right}
      <History clickHistory={clickHistory} />
    </div>
  )
}

export default App

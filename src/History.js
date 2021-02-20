import React from "react"

const History = (props) => {
  if (props.clickHistory.length === 0) {
    return <p>ボタンを押した履歴はありません</p>
  }
  return <p>ボタン履歴: {props.clickHistory.join(' ')}</p>
}

export default History

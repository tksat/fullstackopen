import React from 'react'

const Note = ({ note, toggleImpotance }) => {
  const label = note.important ? '重要です' : '重要ではありません'
  return (
    <li>
      {note.content}
      <button onClick={() => toggleImpotance(note.id)}>{label}</button>
    </li>
  )
}

export default Note

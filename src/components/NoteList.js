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

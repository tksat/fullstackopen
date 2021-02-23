import React, { useState, useEffect } from 'react'
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

  useEffect(hook, [])

  const addNote = event => {
    event.preventDefault()
    const newObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(newObj))
    setNewNote('')
  }

  const handleChange = e => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div onClick={() => setShowAll(!showAll)}><button>show {showAll ? 'important' : 'all'}</button></div>
      <ul>{notesToShow.map(note => <li key={note.id}>{note.content}</li>)}</ul>
      <h2>イベントの登録</h2>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default NoteList

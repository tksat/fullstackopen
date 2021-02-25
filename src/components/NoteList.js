import React, { useState, useEffect } from 'react'
import noteServer from '../servers/notes'
import Note from './Note'

const NoteList = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    noteServer.getall()
      .then(res => setNotes(res))
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

    noteServer.create(newObj)
      .then(res => {
        setNotes(notes.concat(res))
        setNewNote('')
      })
  }

  const handleChange = e => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImpotance = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServer
      .update(id, changedNote).then(res => {
        setNotes(notes.map(note => note.id !== id ? note : res))
      })
      .chatch(error => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div onClick={() => setShowAll(!showAll)}><button>show {showAll ? 'important' : 'all'}</button></div>
      <ul>{notesToShow.map(note => <Note key={note.id} note={note} toggleImpotance={toggleImpotance} />)}</ul>
      <h2>イベントの登録</h2>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default NoteList

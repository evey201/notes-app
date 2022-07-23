const fs = require('fs');
const chalk = require('chalk');

const log = console.log;

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes() 
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title;
    // })
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        log(chalk.green.inverse('Successfully added a new note'))
    }
    if (duplicateNote) {
        log(chalk.red.inverse('Note title is already taken'))
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title)
    // log('findNote:: ', findNote)
    if (findNote){
        log(chalk.green.inverse(findNote.title))
        log((findNote.body))
    }
    if (!findNote) {
        log(chalk.red.inverse('Note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    log(chalk.blue.inverse(getNotes()))
    notes.forEach((note) => {
        log(note.title)
    })

}

const removeNotes = (title) => {
    const notes = loadNotes()
    const getNote = notes.filter((note) => {
       return note.title !== title
    })
    if (notes.length > getNote.length) {
        log(chalk.green.inverse('Note removed!'))
        saveNotes(getNote)
    } else {
        log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNotes,
    listNotes,
    readNote
}
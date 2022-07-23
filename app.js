const validator = require('validator');
const chalk = require('chalk');
const yargs  = require('yargs');
const { addNote, removeNotes, listNotes, readNote } = require('./notes');




// Using yargs
yargs.command({
    command: 'add',
    describe: 'adding notes',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'remove notes',
    builder: {
        title: {
            describe: "remove title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        // log(chalk.red('add notes'))
        removeNotes(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: function () {
        listNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'reading notes',
    builder: {
        title: {
            describe: "read title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        readNote(argv.title)
    }
})
// log(yargs.argv);
yargs.parse()


// const fs = require('fs');
// fs.writeFileSync('notes.txt', 'This file was created with node js');
// appending a file to the txt file 
// fs.appendFileSync('notes.txt', 'Trust in the Lord, things will get better');
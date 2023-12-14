# Quicknote CLI

A Node based CLI for quick note taking, tagging, and retrieval.

## To get Started

```
*Install dependencies:*
npm install

*Symlink:*
npm link

*To unlink:*
npm unlink quicknote
```

## Using the CLI

```
*List all commands*
quicknote --help

*Add a new note*
quicknote new "<note contents>"

*Add a new note with tags*
quicknote new "<note contents>" --tags "<tags, seperated, by, commas>"

*List all notes*
quicknote all

*Find a note based on keyword(s)*
quicknote find "<filter>"

*Remove a note based on ID(s)*
quicknote remove <id>

*Remove all notes*
quicknote purge

*Launch local server to list notes*
quicknote web [port]
```

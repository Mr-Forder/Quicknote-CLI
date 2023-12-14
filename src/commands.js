import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNote,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { listNotes } from "./utils.js";
import { start } from "./server.js";

yargs(hideBin(process.argv))
  //NEW NOTE
  .command(
    "new <note>",
    "Create a New Note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to be created",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log("Note added!", note.content);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Add tags to your new note",
  })
  //GET ALL NOTES
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  //FIND A NOTE
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const matches = await findNote(argv.filter);
      listNotes(matches);
    }
  )
  //REMOVE A NOTE
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      if (id) {
        console.log("Note removed: ", id);
      } else {
        console.log("Note not found");
      }
    }
  )
  //LAUNCH WEB NOTES
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    }
  )
  //REMOVE ALL NOTES
  .command(
    "purge",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes removed");
    }
  )
  .demandCommand(1)
  .parse();

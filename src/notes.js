import { getDB, saveDB, insertDB } from "./db.js";

//ADD NEW NOTE
export const newNote = async (note, tags) => {
  const newNote = {
    tags,
    content: note,
    id: Date.now(),
  };

  await insertDB(newNote);

  return newNote;
};

//GET ALL NOTES
export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

//FIND A NOTE
export const findNote = async (phrase) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(phrase.toLowerCase())
  );
};

//REMOVE A NOTE
export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);
  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

//REMOVE ALL NOTES

export const removeAllNotes = () => saveDB({ notes: [] });

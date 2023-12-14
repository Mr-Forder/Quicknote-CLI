import fs from "node:fs/promises";
import path from "path";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

//READ DB
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

//OVERWTRITE DB IN ENTIRETY
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2)); //EXTRA ARGS ARE JUST FOR FORMATTING - TAKE JSON AND SPACE EVERYTHING OUT BY TWO SPACES.
  return db;
};
//huh
//ADD DATA TO DB
export const insertDB = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
};

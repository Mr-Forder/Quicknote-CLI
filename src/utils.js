export const listNotes = (notes) => {
  notes.forEach(({ id, content, tags }) => {
    console.log("ID: ", id);
    console.log("Tags: ", tags);
    console.log("Content: ", content);
    console.log("\n");
  });
};

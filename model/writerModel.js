import db from "../config/db.js";

export const allWriterInfo = async () => {
  const [result] = await db.query("SELECT * FROM writer");
  return result.length > 0 ? result : [];
};
export const writerInfo = async (id) => {
  const [writer] = await db.query("SELECT * FROM writer WHERE id=?", [id]);
  return writer.length === 0 ? null : writer[0];
};
export const addNewWriter = async (writerInfo) => {
  const { name, email } = writerInfo;
  const [existingWriter] = await db.query(
    "SELECT id, name FROM writer WHERE email=?",
    [email]
  );
  if (existingWriter.length > 0) {
    return { id: existingWriter[0].id, alreadyExists: true };
  }
  const [result] = await db.query(
    "INSERT INTO writer(name, email) VALUES(?,?)",
    [name, email]
  );
  return result.insertId ? { id: result.insertId } : null;
};
export const updateWriterInfo = async (id, updateInfo) => {
  const { name, email } = updateInfo;
  const [result] = await db.query(
    "UPDATE writer SET name=?, email=? WHERE id=?",
    [name, email, id]
  );
  return result.affectedRows > 0 ? id : null;
};
export const deleteWriterDb = async (id) => {
  const [result] = await db.query("DELETE FROM writer WHERE id=?", [id]);
  return result.affectedRows > 0 ? id : null;
};

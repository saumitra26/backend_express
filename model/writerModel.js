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

  try {
    // Check if writer already exists
    const [existingWriter] = await db.query(
      "SELECT id, name FROM writer WHERE email = ?",
      [email]
    );

    if (existingWriter.length > 0) {
      return {
        id: existingWriter[0].id,
        alreadyExists: true,
      };
    }

    // Insert new writer
    const [result] = await db.query(
      "INSERT INTO writer (name, email) VALUES (?, ?)",
      [name, email]
    );

    if (!result.insertId) return null;

    // Fetch newly created writer
    const [rows] = await db.query("SELECT * FROM writer WHERE id = ?", [
      result.insertId,
    ]);

    return rows[0] || null; // <-- FIXED: `|` changed to `||`
  } catch (err) {
    console.error("Error adding writer:", err);
    throw err; // Or return null if you want silent failure
  }
};
export const updateWriterInfo = async (id, updateInfo) => {
  const { name, email } = updateInfo;
  const [result] = await db.query(
    "UPDATE writer SET name=?, email=? WHERE id=?",
    [name, email, id]
  );
  if (result.affectedRows === 0) return null;
  const [rows] = await db.query("SELECT * FROM writer WHERE id=?", [id]);
  return rows[0];
};
export const deleteWriterDb = async (id) => {
  const [result] = await db.query("DELETE FROM writer WHERE id=?", [id]);
  return result.affectedRows > 0 ? id : null;
};

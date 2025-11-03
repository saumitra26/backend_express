import db from "../config/db.js";

export const findAllBooks = async () => {
  const [books] = await db.query("SELECT * FROM book");
  return books.length ? books : [];
};

export const findBookById = async (id) => {
  const [row] = await db.query("SELECT * FROM book WHERE id=?", [id]);
  if (row.length === 0) {
    return null;
  }
  return row[0];
};
export const addNewBook = async (bookDetails) => {
  const {
    name,
    type,
    description,
    writer_id,
    price,
    published_date,
    total_sell,
  } = bookDetails;
  const [result] = await db.query(
    "INSERT INTO  book(name,type,description,writer_id,price,published_date,total_sell) VALUES(?,?,?,?,?,?,?)",
    [name, type, description, writer_id, price, published_date, total_sell]
  );
  if (result.insertId) {
    return result.insertId;
  }
  return null;
};
export const updateBookInfo = async (id, bookDetails) => {
  const {
    name,
    type,
    description,
    writer_id,
    price,
    published_date,
    total_sell,
  } = bookDetails;
  const [result] = await db.query(
    "UPDATE book SET name=?,type=?,description=?,writer_id=?,price=?,published_date=?,total_sell=? WHERE id=?",
    [name, type, description, writer_id, price, published_date, total_sell, id]
  );
  return result.affectedRows > 0 ? id : null;
};
export const deleteBookId = async (id) => {
  const [result] = await db.query("DELETE FROM book WHERE id=?", [id]);
  return result.affectedRows > 0 ? id : null;
};

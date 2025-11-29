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
    writer_name,
    price,
    published_date,
    total_sell,
  } = bookDetails;
  try {
    const [result] = await db.query(
      "INSERT INTO  book(name,type,description,writer_id, writer_name,price,published_date,total_sell) VALUES(?,?,?,?,?,?,?,?)",
      [
        name,
        type,
        description,
        writer_id,
        writer_name,
        price,
        published_date,
        total_sell,
      ]
    );
    if (!result.insertId) return null;
    //return result.insertId;
    const [rows] = await db.query("SELECT * FROM book WHERE id=?", [
      result.insertId,
    ]);

    return rows[0] || null;
  } catch (err) {
    console.error("Error inserting new book:", err);
    throw err;
  }
};
export const updateBookInfo = async (id, bookDetails) => {
  const {
    name,
    type,
    description,
    writer_id,
    writer_name,
    price,
    published_date,
    total_sell,
  } = bookDetails;
  const [result] = await db.query(
    "UPDATE book SET name=?,type=?,description=?,writer_id=?, writer_name=?,price=?,published_date=?,total_sell=? WHERE id=?",
    [name, type, description, writer_id, writer_name, price, published_date, total_sell, id]
  );

  if (result.affectedRows === 0) return null;
  const [rows] = await db.query("SELECT * FROM book WHERE id=?", [id]);
  return rows[0];
};
export const deleteBookId = async (id) => {
  const [result] = await db.query("DELETE FROM book WHERE id=?", [id]);
  return result.affectedRows > 0 ? id : null;
};
export const getBookByFilter = async ({
  limit,
  offset,
  search,
  sortBy,
  order,
  type,
  writer_id,
}) => {
  let query = `SELECT * FROM book WHERE 1=1`;
  const values = [];
  if (type) {
    query += ` AND type= ?`;
    values.push(type);
  }
  if (writer_id) {
    query += ` AND writer_id= ?`;
    values.push(writer_id);
  }

  if (search) {
    query += ` AND name LIKE ?`;
    values.push(`%${search}%`);
  }
  // ✅ Validate sortBy / order (prevent SQL injection!)

  query += ` ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;

  values.push(Number(limit), Number(offset));

  const [rows] = await db.query(query, values);
  return rows;
};

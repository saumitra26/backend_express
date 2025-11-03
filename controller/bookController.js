import {
  findAllBooks,
  findBookById,
  addNewBook,
  updateBookInfo,
  deleteBookId,
} from "../model/bookModel.js";
export const getBooks = async (req, res, next) => {
  try {
    const books = await findAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
export const getBookById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const book = await findBookById(id);
    if (!book) {
      const error = new Error(`A book with id ${id} not found`);
      error.status = 404;
      return next(error);
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
export const addBook = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("res", data);
    const newBook = {
      name: data.name,
      type: data.type,
      description: data.description || "",
      writer_id: data.writer_id,
      price: parseFloat(data.price),
      published_date: new Date(data.published_date),
      total_sell: data.total_sell || 0,
    };
    const newId = await addNewBook(newBook);
    if (newId) {
      return res.status(201).json(newId);
    }
    res.status(400).json({ msg: "something wrong" });
  } catch (error) {
    next(error);
  }
};
export const updateBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const {
      name,
      type,
      description,
      writer_id,
      price,
      published_date,
      total_sell,
    } = req.body;
    const bookInfo = {
      name: name,
      type: type,
      description: description || "",
      writer_id: writer_id,
      price: parseFloat(price),
      published_date: new Date(published_date),
      total_sell: parseFloat(total_sell) || 0.0,
    };
    const updatedId = await updateBookInfo(id, bookInfo);
    if (!updatedId) {
      res.status(404).json({ message: `id ${id} not found` });
    } else {
      res
        .status(200)
        .json({ success: true, message: "update successful", id: updatedId });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedId = await deleteBookId(id);
    if (deletedId) {
      return res
        .status(200)
        .json({ success: true, message: "delete successful", id: deletedId });
    }
    return res.status(404).json({ message: `id ${id} not found` });
  } catch (error) {
    next(error);
  }
};

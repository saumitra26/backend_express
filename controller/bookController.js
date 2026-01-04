import {
  findBookById,
  addNewBook,
  updateBookInfo,
  deleteBookId,
  getBookByFilter,
} from "../model/bookModel.js";
// export const getBooks = async (req, res, next) => {
//   try {
//     const books = await findAllBooks();
//     res.status(200).json(books);
//   } catch (error) {
//     next(error);
//   }
// };
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
      writer_name: data.writer_name,
      price: parseFloat(data.price),
      published_date: new Date(data.published_date),
      total_sell: data.total_sell || 0,
    };
    const addedBook = await addNewBook(newBook);
    if (addedBook) {
      return res.status(201).json(addedBook);
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
      writer_name,
      price,
      published_date,
      total_sell,
    } = req.body;
    const bookInfo = {
      name: name,
      type: type,
      description: description || "",
      writer_id: writer_id,
      writer_name: writer_name,
      price: parseFloat(price),
      published_date: new Date(published_date),
      total_sell: parseFloat(total_sell) || 0.0,
    };
    const updatedBook = await updateBookInfo(id, bookInfo);
    if (!updatedBook) {
      res.status(404).json({ message: `id ${id} not found` });
    } else {
      res
        .status(200)
        .json({
          success: true,
          message: "update successful",
          data: updatedBook,
        });
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
export const getBooks = async (req, res, next) => {
  try {
    const limit = req.query.limit || 100;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const search = req.query.search || null;
    const sortBy = req.query.sortBy || "id";
    const order = req.query.order === "DESC" ? "DESC" : "ASC";
    const type = req.query.type || null;
    const writer_id = req.query.writer_id || null;
    const books = await getBookByFilter({
      limit,
      offset,
      search,
      sortBy,
      order,
      type,
      writer_id,
    });
    if (!books) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book found",
     
      page,
      limit,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

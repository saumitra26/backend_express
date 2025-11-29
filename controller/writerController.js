import {
  allWriterInfo,
  writerInfo,
  addNewWriter,
  updateWriterInfo,
  deleteWriterDb,
} from "../model/writerModel.js";

export const getAllWriter = async (req, res, next) => {
  try {
    console.log("📍 Inside controller");
    const writers = await allWriterInfo();
    if (writers.length > 0) {
      return res.status(200).json({ message: "successful", data: writers });
    }
    return res.status(404).json({ message: "empty", res: writers });
  } catch (error) {
    next(error);
  }
};
export const getWriterById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await writerInfo(id);
    if (!result) {
      const err = new Error(`Writer with id ${id} not found`);
      err.status = 404;
      return next(err);
    }
    return res.status(200).json({ message: "successful", data: result });
  } catch (error) {
    next(error);
  }
};
export const addWriter = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      const error = new Error("Both fields are required");
      error.status = 500;
      return next(error);
    }

    const writerData = {
      name: name,
      email: email,
    };
    const addedWriter = await addNewWriter(writerData);
    if (!addedWriter) {
      return res.status(404).json({ message: "Not successful" });
    }
    return res.status(201).json({
      message: "Successfully created new writer",
      data: addedWriter,
    });
  } catch (error) {
    next(error);
  }
};
export const updateWriter = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const writerData = {
      name: name,
      email: email,
    };
    const updatedWriter = await updateWriterInfo(id, writerData);
    if (!updatedWriter) {
      return res.status(404).json({ message: "update not successfully" });
    }
    return res
      .status(200)
      .json({ message: "update successful", data: updatedWriter });
  } catch (error) {
    next(error);
  }
};
export const deleteWriter = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedId = await deleteWriterDb(id);
    if (!deletedId) {
      return res.status(404).json({ message: `id ${id} not found` });
    }
    return res
      .status(200)
      .json({ message: `id ${id} deleted successfully`, deletedId: id });
  } catch (error) {
    next(error);
  }
};

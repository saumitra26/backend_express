import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controller/bookController.js";
const router = express.Router();
router.use(protect, authorize("admin", "user"));
/**
 * @swagger
 *  /api/books:
 *    get:
 *      summary: Get all books
 *      tags: [Books]
 *      responses:
 *        200: 
 *           description: Success
 *        404:
 *          description: Not found
 */
router.get("/", getBooks);
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Update books
 *     tags: [Books]
 *     parameters:
 *       -  name: id
 *          in: path
 *          required: true
 *          description: Id for update
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400: 
 *         description: Not Found
 */
router.get("/:id", getBookById);
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Update books
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:  { type: string }
 *               type:  { type: string }
 *               description: { type: string }
 *               writer_id: { type: number, format: float }   
 *               price: { type: number }
 *               published_date: { type: string, format: date-type }
 *               total_sell: { type: number, format: float}
 *               
 *     responses:
 *       200:
 *         description: Success
 *       400: 
 *         description: Not Found
 */
router.post("/", addBook);
/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update books
 *     tags: [Books]
 *     parameters:
 *       -  name: id
 *          in: path
 *          required: true
 *          description: Id for update
 *          schema:
 *            type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:  { type: string }
 *               type:  { type: string }
 *               description: { type: string }
 *               writer_id: { type: number, format: float }   
 *               price: { type: number }
 *               published_date: { type: string, format: date-type }
 *               total_sell: { type: number, format: float}
 *               
 *     responses:
 *       200:
 *         description: Success
 *       400: 
 *         description: Not Found
 */
router.put("/:id", updateBook);
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Update books
 *     tags: [Books]
 *     parameters:
 *       -  name: id
 *          in: path
 *          required: true
 *          description: Id for update
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400: 
 *         description: Not Found
 */

router.delete("/:id", deleteBook);
export default router;

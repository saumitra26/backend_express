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
 * /api/books:
 *   get:
 *     summary: Get books (search, filter, sort, pagination)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search books by name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by book type
 *       - in: query
 *         name: writer_id
 *         schema:
 *           type: integer
 *         description: Filter books by writer ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, price, published_date, total_sell]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sorting order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books found
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       description:
 *                         type: string
 *                       writer_id:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       published_date:
 *                         type: string
 *                         format: date
 *                       total_sell:
 *                         type: number
 *       404:
 *         description: No books found
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
 *     summary: GEt books by id
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
 *     summary: Update book
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
 *     summary: Delete book
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

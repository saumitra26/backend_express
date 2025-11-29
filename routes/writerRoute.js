import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  getAllWriter,
  getWriterById,
  addWriter,
  updateWriter,
  deleteWriter,
} from "../controller/writerController.js";
const router = express.Router();
router.use(protect, authorize("admin", "user"));
/**
 * @swagger
 *  /api/writers:
 *       get:
 *         summary: Get all writer
 *         tags: [Writer]
 *         responses:
 *            200:
 *              description: Success
 *            400:
 *              description : Not found
 */
router.get("/", getAllWriter);
/**
 * @swagger
 * /api/writers/{id}:
 *   get:
 *     summary: Get single writer
 *     tags: [Writer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Writer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get("/:id", getWriterById);

/**
 * @swagger
 * /api/writers/:
 *   post:
 *     summary: Add new Writer
 *     tags: [Writer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *     responses:
 *       201:
 *         description: Successful
 *       404:
 *         description: Book not Found
 *
 */
router.post("/", addWriter);
/**
 * @swagger
 * /api/writers/{id}:
 *   put:
 *     tags: [Writer]
 *     summary: Update writer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id for updated writer
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string}
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.put("/:id", updateWriter);
/**
 * @swagger
 * /api/writers/{id}:
 *   delete:
 *     summary: Writer will be delete
 *     tags: [Writer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id for delete writer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful
 *       404:
 *         description: Not Found
 */
router.delete("/:id", deleteWriter);
export default router;

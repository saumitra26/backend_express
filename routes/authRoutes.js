import express from "express";
import { register, login } from "../controller/authController.js";

const router = express.Router();
/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: User register
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: UnSuccessful
 *
 */

router.post("/", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: myStrongPassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64f1c8e2f9d2a6b123456789
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       400:
 *         description: Invalid input / Unsuccessful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exists
 */
router.post("/login", login);

export default router;

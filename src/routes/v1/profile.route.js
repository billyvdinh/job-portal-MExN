const express = require('express');
const profileController = require('../../controllers/profile.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', auth(), profileController.getProfile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get profile
 *     description: Only authenticated user's profile.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

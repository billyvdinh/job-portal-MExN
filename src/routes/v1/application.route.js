const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const uploader = require('../../middlewares/uploader');
const applicationValidation = require('../../validations/application.validation');
const applicationController = require('../../controllers/application.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageApplications'),
    uploader,
    validate(applicationValidation.createApplication),
    applicationController.createApplication
  )
  .get(auth('getApplications'), validate(applicationValidation.getApplications), applicationController.getApplications);

router
  .route('/:applicationId')
  .get(auth('getApplications'), validate(applicationValidation.getApplication), applicationController.getApplication)
  .patch(
    auth('manageApplications'),
    validate(applicationValidation.updateApplication),
    uploader,
    applicationController.updateApplication
  )
  .delete(
    auth('manageApplications'),
    validate(applicationValidation.deleteApplication),
    applicationController.deleteApplication
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Application management and retrieval
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a application
 *     description: Only admins can create other applications.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - job
 *               - user
 *               - description
 *             properties:
 *               job:
 *                 type: string
 *               user:
 *                 type: string
 *               description:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             example:
 *               description: fake application description
 *               attachments: ['resume.pdf', 'proposal.docx']
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Application'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all applications
 *     description: Only admins can retrieve all applications.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: job
 *         schema:
 *           type: string
 *         description: Application job id
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Application user id
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Application status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of applications
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Get a application
 *     description: Logged in applications can fetch only their own application information. Only admins can fetch other applications.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Application'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a application
 *     description: Logged in users can only update application information. Only admins can update other applications.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             example:
 *               description: fake application description
 *               attachments: ['resume.pdf', 'proposal.docx']
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Application'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a application
 *     description: Logged in users can delete applications. Only admins can delete applications.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

const express = require("express");
const router = express.Router();
const {
    getGadgets,
    createGadget,
    updateGadget,
    softDeleteGadget,
    selfDestruct,
} = require("../controllers/gadget.controller");

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get all gadgets with success probability
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets with success probabilities
 *       401:
 *         description: Unauthorized
 */
router.get("/", getGadgets);

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Create a new gadget with random codename
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed]
 *                 default: Available
 *     responses:
 *       201:
 *         description: Gadget created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", createGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Gadget not found
 */
router.patch("/:id", updateGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Decommission a gadget (soft delete)
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Gadget not found or already decommissioned
 */
router.delete("/:id", softDeleteGadget);

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger self-destruct sequence for a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - confirmationCode
 *             properties:
 *               confirmationCode:
 *                 type: string
 *                 description: Confirmation code for self-destruct
 *     responses:
 *       200:
 *         description: Self-destruct sequence initiated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid confirmation code
 *       404:
 *         description: Gadget not found
 */
router.post("/:id/self-destruct", selfDestruct);

module.exports = router;

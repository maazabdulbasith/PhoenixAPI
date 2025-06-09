const {
    generateCodename,
    generateSuccessProbability,
    generateConfirmationCode,
} = require("../utils/gadgetUtils");
const Gadget = require("../models/gadget");
const { Op } = require("sequelize");

exports.getGadgets = async (req, res, next) => {
    try {
        const where = {};
        if (req.query.status) {
            const validStatuses = [
                "Available",
                "Deployed",
                "Destroyed",
                "Decommissioned",
            ];
            if (!validStatuses.includes(req.query.status)) {
                return res.status(400).json({
                    error: "Invalid status",
                    message:
                        "Status must be one of: Available, Deployed, Destroyed, Decommissioned",
                });
            }
            where.status = req.query.status;
        }

        const gadgets = await Gadget.findAll({ where });
        const withProb = gadgets.map((g) => ({
            ...g.toJSON(),
            missionSuccessProbability: `${generateSuccessProbability()}%`,
        }));
        res.json(withProb);
    } catch (e) {
        next(e);
    }
};

exports.createGadget = async (req, res, next) => {
    try {
        const gadget = await Gadget.create({
            ...req.body,
            codename: generateCodename(),
            successProbability: generateSuccessProbability(),
        });
        res.status(201).json(gadget);
    } catch (e) {
        next(e);
    }
};

exports.updateGadget = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows, [updated]] = await Gadget.update(req.body, {
            where: { id },
            returning: true,
        });
        if (!rows) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    } catch (e) {
        next(e);
    }
};

exports.softDeleteGadget = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows, [updated]] = await Gadget.update(
            { status: "Decommissioned", decommissionedAt: new Date() },
            {
                where: { id, status: { [Op.ne]: "Decommissioned" } },
                returning: true,
            }
        );
        if (!rows)
            return res
                .status(404)
                .json({ message: "Not found or already decommissioned" });
        res.json(updated);
    } catch (e) {
        next(e);
    }
};

exports.selfDestruct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { confirmationCode } = req.body;

        // Check if the gadget exists
        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ message: "Gadget not found" });
        }

        // If no confirmation code provided, return the code needed
        if (!confirmationCode) {
            const code = generateConfirmationCode();
            return res.json({
                message: "Confirmation code required for self-destruct",
                confirmationCode: code,
            });
        }

        // If confirmation code provided, verify and destroy
        if (confirmationCode !== req.body.confirmationCode) {
            return res
                .status(403)
                .json({ message: "Invalid confirmation code" });
        }

        const [rows, [updated]] = await Gadget.update(
            { status: "Destroyed" },
            { where: { id }, returning: true }
        );

        res.json({ message: "💥 Boom!", gadget: updated });
    } catch (e) {
        next(e);
    }
};

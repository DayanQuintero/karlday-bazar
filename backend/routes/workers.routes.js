const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const { requireFields } = require("../middleware/validate");
const { createWorker, listWorkers, updateWorker, deleteWorker } = require("../controllers/workerController");

/** Solo trabajador o admin */
router.use(protect, requireRole("trabajador", "admin"));

router.get("/", listWorkers);
router.post("/", requireFields(["name", "email", "password"]), createWorker);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);

module.exports = router;
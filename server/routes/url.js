import { Router } from "express";
import urlController from "../controllers/url.js";
const router = Router();

const { generateUrl, getRedirectedUrl } = urlController;

router.post("/", generateUrl);
router.get("/:id", getRedirectedUrl);

export default router;
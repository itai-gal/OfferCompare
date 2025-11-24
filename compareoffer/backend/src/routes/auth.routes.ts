import { Router } from "express";
import {
    registerHandler,
    loginHandler,
    meHandler,
} from "../controllers/auth.controller";
import {
    validateRegister,
    validateLogin,
} from "../validations/auth.validation";

const router = Router();

// POST /api/auth/register
router.post("/register", validateRegister, registerHandler);

// POST /api/auth/login
router.post("/login", validateLogin, loginHandler);

// GET /api/auth/me
router.get("/me", meHandler);

export default router;

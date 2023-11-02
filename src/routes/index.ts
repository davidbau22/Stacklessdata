import { Router } from "express";
import bookRoutes from "./bookRoutes";

const router = Router();

router.use("/book", bookRoutes);


export = router;

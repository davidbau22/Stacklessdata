import axios from "axios";
import { Router, Request, Response } from "express";
import Book from "../models/Book";


const router = Router();




router.get("/metrics", async (req: Request, res: Response) => {
  try {
    const metrics = await Book.findAll();
    
    return res.status(200).json({ data: metrics });

  } catch (error) {
    console.error("Error searching:", error);
    return res.status(500).json({ error: "An error occurred while searching" });
  }
});

export default router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const Book_1 = __importDefault(require("../models/Book"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
const filterJsonData = (inputObj) => {
    var _a;
    const transformedDataArray = [];
    for (const element of inputObj.items) {
        const authorsArray = element.volumeInfo.authors || [];
        const categoriesArray = element.volumeInfo.categories || [];
        const concatenatedAuthors = authorsArray.join(", ");
        const concatenatedCategories = categoriesArray.join(", ");
        const description = element.volumeInfo.description || "";
        if (concatenatedAuthors !== "" &&
            description !== "" &&
            concatenatedCategories !== "") {
            // Check if authors and description are not empty
            const thumbnail = ((_a = element.volumeInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) || "";
            if (thumbnail !== "") {
                // Check if thumbnail is not empty
                const transformedData = {
                    title: element.volumeInfo.title || "",
                    authors: concatenatedAuthors,
                    thumbnail: thumbnail,
                    description: description,
                    pageCount: element.volumeInfo.pageCount || 0,
                    language: element.volumeInfo.language || "",
                    category: concatenatedCategories,
                };
                transformedDataArray.push(transformedData);
            }
        }
    }
    return transformedDataArray;
};
router.get("/", function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const listOfTopics = [
            "python",
            "javascript",
            "harrypotter",
            "thelordoftherings",
            "sci",
            "algebra",
            "flower",
            "dogstraining",
            "space",
            "starswars",
            "aliens",
        ];
        let url_google_books = "";
        let cleanJson = [];
        try {
            const existingBooks = yield Book_1.default.findAll();
            if (existingBooks.length > 0) {
                // Data already exists, return the existing data
                return res
                    .status(200)
                    .send({ data: existingBooks, message: "Data already existed" });
            }
            for (const topic of listOfTopics) {
                // url_google_books = `https://www.googleapis.com/books/v1/volumes?q=${topic}&key=${GOOGLE_API_KEY}`;
                let response = yield axios_1.default.get(url_google_books);
                let cleanData = filterJsonData(response.data);
                cleanJson.push(cleanData);
            }
            const cleanBookData = cleanJson.flat();
            const createdBooks = yield Book_1.default.bulkCreate(cleanBookData);
            return res.status(200).send({ data: createdBooks });
        }
        catch (error) {
            console.log("error in list:", error);
        }
    });
});
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query; // The search query string
        if (!query || typeof query !== "string") {
            return res.status(400).json({ error: "Invalid search query" });
        }
        // Search for books with titles, authors, or categories containing the query
        const searchResults = yield Book_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.iLike]: `%${query}%`, // Case-insensitive partial match
                        },
                    },
                    {
                        authors: {
                            [sequelize_1.Op.iLike]: `%${query}%`, // Case-insensitive partial match
                        },
                    },
                    {
                        category: {
                            [sequelize_1.Op.iLike]: `%${query}%`, // Case-insensitive partial match
                        },
                    },
                ],
            },
        });
        return res.status(200).json({ data: searchResults });
    }
    catch (error) {
        console.error("Error searching:", error);
        return res.status(500).json({ error: "An error occurred while searching" });
    }
}));
exports.default = router;
//# sourceMappingURL=bookRoutes.js.map
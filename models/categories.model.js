const db = require("../db/connection.js");

// SELECT ALL CATEGORIES
exports.selectCategories = async () => {
    const result = await db.query(`SELECT * FROM categories;`)
    const rows = result.rows;
    return rows;
}
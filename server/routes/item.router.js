const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/", (req, res) => {
  const queryString = `INSERT INTO "to do items" ("item_name") VALUES ($1);`;

  pool
    .query(queryString, [req.body.doItem])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.get("/", (req, res) => {
  const queryString = `SELECT ("item_name") FROM "to do items"`;

  pool
    .query(queryString)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;

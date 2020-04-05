const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/", (req, res) => {
  const queryString = `INSERT INTO "to do items" ("item_name", "complete") VALUES ($1, $2);`;

  pool
    .query(queryString, [req.body.doItem, req.body.complete])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.get("/", (req, res) => {
  const queryString = `SELECT * FROM "to do items" ORDER BY "id" DESC`;

  pool
    .query(queryString)
    .then((response) => {
      console.log(response.rows);

      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.put("/:id", (req, res) => {
  const itemID = req.params.id;
  const updatedData = req.body;
  const queryString = `UPDATE "to do items" SET "item_name" =$1, "complete" =$2 WHERE "id" =$3;`;

  pool
    .query(queryString, [updatedData.doItem, updatedData.complete, itemID])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const queryString = `DELETE FROM "to do items" WHERE "id" = $1;`;

  pool
    .query(queryString, [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;

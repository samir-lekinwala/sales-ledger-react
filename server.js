// server/server.ts
import express from "express";
import * as Path2 from "node:path";

// server/routes/fruits.ts
import { Router } from "express";

// server/db/connection.ts
import knex from "knex";

// server/db/knexfile.js
import * as Path from "node:path";
import * as URL from "node:url";
var __filename = URL.fileURLToPath(import.meta.url);
var __dirname = Path.dirname(__filename);
var knexfile_default = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, "dev.sqlite3")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:"
    },
    migrations: {
      directory: Path.join(__dirname, "migrations")
    },
    seeds: {
      directory: Path.join(__dirname, "seeds")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "/app/storage/prod.sqlite3"
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  }
};

// server/db/connection.ts
var env = process.env.NODE_ENV || "development";
var connection = knex(knexfile_default[env]);
var connection_default = connection;

// server/db/db.ts
async function getAllItems() {
  return connection_default("items").select();
}
async function addItem(data) {
  console.log("db function for adding", data);
  return connection_default("items").insert(data);
}
async function deleteItem(id) {
  console.log("pretend to delete ", id);
  return connection_default("items").where("id", id).del();
}

// server/routes/fruits.ts
var router = Router();
router.get("/", async (req, res) => {
  try {
    const fruits = await getAllItems();
    res.json(fruits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/", async (req, res) => {
  try {
    const dataCheck = await req.body;
    console.log(dataCheck);
    await addItem(dataCheck);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("route test", id);
    await deleteItem(Number(id));
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
var fruits_default = router;

// server/routes/general.ts
import { Router as Router2 } from "express";
var router2 = Router2();
router2.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("route test", id);
    await deleteItem(Number(id));
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
var general_default = router2;

// server/server.ts
var server = express();
server.use(express.json());
server.use("/api/v1/bought", fruits_default);
server.use("/api/v1/", general_default);
if (process.env.NODE_ENV === "production") {
  server.use(express.static(Path2.resolve("public")));
  server.use("/assets", express.static(Path2.resolve("./dist/assets")));
  server.get("*", (req, res) => {
    res.sendFile(Path2.resolve("./dist/index.html"));
  });
}
var server_default = server;

// server/index.ts
var PORT = process.env.PORT || 3e3;
server_default.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});

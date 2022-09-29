const express = require("express");
const bodyParser = require("body-parser");
const {MongoClient, ObjectId} = require("mongodb");
const CONTACTS_COLLECTION = "contacts";
const app = express();
app.use(bodyParser.json());
// Создание ссылки на каталог сборки Angular
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Создайте переменную базы данных вне обратного вызова соединения
//с базой данных, чтобы повторно использовать пул соединений в вашем приложении.
const start = async () => {

  const uri = "mongodb+srv://maxim760:cJQTu64IIVC1UpXI@cluster0.wij9s85.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db();
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log("Приложение запущенно на порту", port);
  });

  // API МАРШРУТЫ
  // Общий обработчик ошибок, используемый всеми функциями конечных точек
  function handleError(res, reason, message = "Ошибка", code = 500) {
    console.log("Ошибка: " + reason);
    res.status(code).json({ "error": message });
  }
  function success(res, data, code = 200) {
    res.status(code).json(data)
  }
  /* "/api/contacts"
  * GET: найти все контакты
  * POST: создание нового контакта
  */
  app.get("/api/contacts", async (req, res) => {
    try {
      const data = await db.collection(CONTACTS_COLLECTION).find().toArray()
      success(res, data)
    } catch(e) {
      handleError(res,"Ошибка при получении контактов", e.message, e.status)
    }
  });
  app.post("/api/contacts", async (req, res) => {
    try {
      const data = {
        username: req.body.username || "",
        email: req.body.email || "",
        telephone: {
          mobile: req.body?.telephone?.mobile || "",
          home: req.body?.telephone?.home || "",
        }
      }
      await db.collection(CONTACTS_COLLECTION).insertOne(data)
      success(res, data, 201)
    } catch (e) {
      handleError(res,"Ошибка при добавлении контакта", e.message, e.status)

    }
  });
  /* "/api/contacts/:id"
  * GET: найти контакт по id
  * PUT: обновить контакт поid
  * DELETE: удалить контакт по id
  */
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const item = await db.collection(CONTACTS_COLLECTION).findOne({ _id: ObjectId(req.params.id) })
      success(res, item)
    } catch(e) {
      handleError(res,"Ошибка при получении контакта", e.message, e.status)
    }
  });
  app.put("/api/contacts/:id", async (req, res) => {
    try {
      await db.collection(CONTACTS_COLLECTION).updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
          username: req.body.username || "",
          email: req.body.email || "",
          telephone: {
            mobile: req.body?.telephone?.mobile || "",
            home: req.body?.telephone?.home || "",
          }
        }
      })
      const data = {
        _id: ObjectId(req.params.id),
        username: req.body.username || "",
        email: req.body.email || "",
        telephone: {
          mobile: req.body?.telephone?.mobile || "",
          home: req.body?.telephone?.home || "",
        }
      }
      success(res, data)
    } catch (e) {
      handleError(res,"Ошибка при изменении контакта", e.message, e.status)
    }
  });
  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      await db.collection(CONTACTS_COLLECTION).deleteOne({_id: ObjectId(req.params.id)})
      success(res, req.params.id)
    } catch (e) {
      handleError(res,"Ошибка при изменении контакта", e.message, e.status)
    }
  })
}

start()

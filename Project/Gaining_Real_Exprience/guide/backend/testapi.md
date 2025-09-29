Bhai mast sawaal 👌 — abhi tumne backend setup kar liya, next step hai **API ko test karna**. Ye tum **Postman** (recommended) ya **Thunder Client (VS Code extension)** se kar sakte ho.

---

## 🔹 1. Create Todo (POST)

**URL**

```
http://localhost:5001/todo/create
```

**Method**

```
POST
```

**Headers**

```
Content-Type: application/json
```

**Body (raw, JSON)**

```json
{
  "text": "Learn MERN Stack",
  "completed": false
}
```

**Expected Response**

```json
{
  "message": "✅ Todo Created Succussfully",
  "newTodo": {
    "_id": "6513fa...",
    "text": "Learn MERN Stack",
    "completed": false,
    "__v": 0
  }
}
```

---

## 🔹 2. Fetch Todos (GET)

**URL**

```
http://localhost:5001/todo/fetch
```

**Method**

```
GET
```

**Expected Response**

```json
{
  "message": "✅ Todo Fetched Successfully",
  "todos": [
    {
      "_id": "6513fa...",
      "text": "Learn MERN Stack",
      "completed": false
    },
    {
      "_id": "6513fb...",
      "text": "Build Todo App",
      "completed": true
    }
  ]
}
```

---

## 🔹 3. Update Todo (PUT)

**URL**

```
http://localhost:5001/todo/update/<todo_id>
```

👉 Replace `<todo_id>` with `_id` you got from fetch/create.

**Method**

```
PUT
```

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "text": "Learn MERN Stack in depth",
  "completed": true
}
```

**Expected Response**

```json
{
  "message": "✅ Todo Updated Successfully",
  "todo": {
    "_id": "6513fa...",
    "text": "Learn MERN Stack in depth",
    "completed": true
  }
}
```

---

## 🔹 4. Delete Todo (DELETE)

**URL**

```
http://localhost:5001/todo/delete/<todo_id>
```

**Method**

```
DELETE
```

**Expected Response**

```json
{
  "message": "✅ Todo Deleted Succussfully"
}
```

---

## 🔧 Extra Tips

* Har request ke baad server console bhi check karna (agar error aaya to wahi dikhayega).
* Agar tum JWT authentication add karoge future me, to sab requests ke headers me `"Authorization": "Bearer <token>"` bhejna hoga.

---

👉 Kya tumhe chahiye main ek **ready-made Postman collection (.json)** bana du jisme saare ye 4 routes pre-configured hon, bas import karke click karna pade?

Bilkul bhai 🤝 ye wala code **Express Router** hai jo basically tumhare backend ke **gatekeeper** jaisa kaam karta hai. Chalo isko desi style me aur code ke andar comments ke sath samajhte hain:

```js
import express from "express";
import { login, logout, register } from "../controller/user.controller.js";

// 🛣️ Express ka chhota sa highway banaya jisko "router" bolte hain
const router = express.Router();

/*
 📌 Yahan 3 important routes banaye gaye hain:
   1. /signup  -> user registration
   2. /login   -> user login
   3. /logout  -> user logout
   Ye sab ka kaam alag controller functions karenge (register, login, logout).
*/

// 👤 Naya user register karne ka route
router.post("/signup", register);  
// POST request ka use kiya kyunki hume data bhejna hai (email, username, password)

// 🔑 User login karne ka route
router.post("/login", login);     
// POST again, kyunki user apna email + password bhej raha hai

// 🚪 User logout karne ka route
router.get("/logout", logout);    
// GET ka use, kyunki sirf cookie clear karni hai aur user ko bahar nikalna hai

// 📤 Router ko export kiya taki server.js me use kiya ja sake
export default router;
```

---

### 💡 Desi Example

Soch lo tumhare paas ek **mall** hai:

* **/signup** = Mall ke entry gate pe **naya ID card banana** (register).
* **/login** = ID card dikhake andar jana (login).
* **/logout** = Bahar nikalte waqt guard ko bolna *“bhai main jaa raha hu”* aur ID card temporary block kar dena.

---

Bhai, kya main tumhare liye is **auth flow (signup → login → logout)** ka ek **step-by-step timeline** bana du jaise “1. User form bharta hai → 2. DB save hota hai → 3. JWT token generate hota hai → 4. Logout pe cookie clear hoti hai”?

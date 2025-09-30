Sahi pakde ho bhai 🔥 Ye code hai **User Authentication Controller** ka — basically **signup, login aur logout** ka full system.
Chalo isko **desi style me breakdown** karte hain saath hi har jagah code comments daalte hain 👇

---

```js
import User from "../model/user.model.js"; // 📦 Database model (users collection)
import { z } from "zod"; // ✅ Data validation library
import bcrypt from "bcryptjs"; // 🔑 Password ko encrypt/hash karne ke liye
import { generateTokenAndSaveInCookies } from "../jwt/token.js"; // 🍪 JWT token bana ke cookie me save karne ka function

// 🔎 User input validate karne ke liye Zod schema
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }), // email format check
  username: z.string().min(3, { message: "Username alteast 3 characters long" }), // kam se kam 3 char
  password: z.string().min(6, { message: "Password alteast 6 characters long" }), // kam se kam 6 char
});


// 📝 REGISTER (Signup new user)
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // ⚠️ Agar koi field missing hai to error bhej do
    if (!email || !username || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    // ✅ Zod se input validate karo
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    // 🔎 Check karo email already registered hai kya?
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "User already registered" });
    }

    // 🔑 Password ko hash (lock) kar do before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // 🆕 New user object banao
    const newUser = new User({ email, username, password: hashPassword });
    await newUser.save(); // 💾 DB me save

    if (newUser) {
      // 🍪 JWT token generate karo aur cookie me daal do
      const token = await generateTokenAndSaveInCookies(newUser._id, res);

      // 🎉 Success response
      res.status(201).json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};


// 🔑 LOGIN (Authenticate existing user)
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // ⚠️ Agar email ya password missing hai
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔎 Email se user find karo + password field bhi include karo
    const user = await User.findOne({ email }).select("+password");

    // ❌ Agar user exist nahi karta ya password galat hai
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    // 🍪 JWT token generate karo aur cookie me save karo
    const token = await generateTokenAndSaveInCookies(user._id, res);

    // 🎉 Success response
    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging user" });
  }
};


// 🚪 LOGOUT (Remove user session)
export const logout = (req, res) => {
  try {
    // ❌ JWT cookie ko clear kar do
    res.clearCookie("jwt", {
      path: "/",
    });

    // 🎉 Success response
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};
```

---

### 🥘 Desi Example (Thali Analogy)

* **Register (Signup)** → Naya aadmi hotel me aata hai, form fill karta hai, apna naam-email deta hai. Hotel wale uska password lock karke apni register book me entry kar lete hain. Aur usko ek **token coupon** (JWT) de dete hain.
* **Login** → Wahi aadmi dubara aata hai → coupon dikhata hai → hotel wale check karte hain sahi hai ya nahi. Agar match hota hai to usko entry mil jaati hai.
* **Logout** → Aadmi hotel se bahar nikalte waqt apna coupon wapas kar deta hai → system se entry clear ho jaati hai.

---

Bhai, chaahe naya banda ho ya purana, is controller ke through uska **poora account cycle** chalta hai → **Register → Login → Logout**.

Kya tu chahta hai main iske liye ek **sequence flow diagram** bana du (step-by-step arrows ke saath)?

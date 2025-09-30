Wah bhai, ye code to asli **JWT Token Factory** hai 🍪🔥 — yaha hum user ko ek **magic token** dete hain aur usko **cookie ke dabbe me pack karke bhej dete hain**.
Chal isko **desi style + code comments** ke saath todte hain 👇

---

```js
import jwt from "jsonwebtoken"; // 🔑 JSON Web Token banane ke liye
import User from "../model/user.model.js"; // 📦 User model (database se connect karne ke liye)


// 🏭 Ye function ek token banata hai aur cookie me save karta hai
export const generateTokenAndSaveInCookies = async (userId, res) => {
  // 🔒 JWT Token generate kar rahe hai
  const token = jwt.sign(
    { userId }, // 👉 Payload me userId dal rahe hain
    process.env.JWT_SECRET_KEY, // 🔑 Secret key (environment variable se)
    {
      expiresIn: "10d", // ⏰ Token ki expiry 10 din
      // expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) 
      // Alternative way: expiry date calculate karke daalna
    }
  );

  // 🍪 Token ko "jwt" naam ki cookie me store karna
  res.cookie("jwt", token, {
    httpOnly: true, // 🚫 Browser JS is cookie ko access nahi kar sakta (safe against XSS)
    secure: false,  // 🚫 HTTPS ke liye true karna hota hai, abhi dev me false
    sameSite: "lax", // 🌍 CSRF attack ko kam karta hai (safe side)
    path: "/",       // 📂 Poore site ke liye cookie valid hogi
  });

  // 💾 Database me bhi user ka token update karna (extra safety / session store)
  await User.findByIdAndUpdate(userId, { token });

  // 🎁 Token return bhi kar dena (agar frontend ko zarurat ho)
  return token;
};
```

---

### 🥘 Desi Analogy (Token = Entry Pass)

Soch le bhai tu **cinema hall** gaya:

1. Tu ne ticket kharida (signup/login).
2. Counter wala tere naam pe ek **special pass (JWT Token)** banata hai.
3. Ye pass **10 din ke liye valid** hai.
4. Pass ko **tere jeb (cookie)** me daal diya jata hai.
5. Cinema hall ke manager ke register (database) me bhi entry kar di ki "haan is aadmi ke paas token hai".

Ab tu jab tak pass valid hai, hall me aa-ja sakta hai bina har baar ID dikhaye. ✅

---

👉 Ye system secure isliye hai kyunki **token fake banana mushkil hai** (secret key ke bina impossible).
Aur **httpOnly cookie** ka matlab hai **browser ka koi bhi JS code token churra nahi sakta**.

---

Bhai, kya main tujhe iska ek **request-response flow diagram** bana ke samjhau (signup → token generate → cookie save → database update)?

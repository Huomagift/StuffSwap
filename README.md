# 🧺 StuffSwap

**Swap Vibes, Not Just Stuff.**  
A funky, hyperlocal swap platform where you exchange items with real people — no prices, no stress, just pure human vibes. ✨

---

## 🌐 Live Preview  
👉 _Coming soon!_ (Deploy using GitHub Pages or Netlify)

---

## 🚀 What is StuffSwap?

**StuffSwap** is a web app that lets users swap their unused items with others nearby. It's more than a marketplace — it's a **community barter system** that thrives on trust, vibes, and mutual benefit.

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript (Vanilla)

**Backend**
- Supabase (Auth, Realtime DB, Storage)
- PostgreSQL

---

## ✨ Features

| Feature                        | Description |
|-------------------------------|-------------|
| 📍 **Location-Based Swaps**   | Discover items listed by users near you |
| 🪪 **User Authentication**    | Sign up/login with Supabase Auth |
| 🖼️ **Upload Items**          | Add photos, descriptions, and custom tags |
| 🔄 **Propose Trades**         | Send/receive swap requests with others |
| 🔔 **Swap Tracker**           | Monitor and manage ongoing trades |
| 🎭 **Weird & Fun UI**         | Built with vibes-first design philosophy |

---

## 🔮 Our Philosophy

> “Not everything has a price. Some things just feel right.”

- 💸 **Anti-capitalist Energy**
- 🤝 **Community Over Commerce**
- 🌀 **Intuition Over Algorithms**

---

## 🎨 Hackathon Criteria Alignment

| 🧪 Judging Vibe        | ✅ How We Meet It |
|------------------------|------------------|
| 🧠 **Unmistakably Human** | Manual swaps, emoji reactions, anti-algorithm UX |
| 🧬 **Philosophical Edge** | Barter over buying — reclaiming human connection |
| 🎨 **Original & Weird**   | Retro UI, “toss to pond” swap mechanic, randomness |
| 🛠️ **Technical Craft**   | Clean HTML/CSS/JS code, Supabase integration, RLS |
| 🌍 **Cultural Impact**    | Encourages local barter culture and shared value systems |

---

## 📁 Project Structure


---

## ⚙️ Setup Instructions

### 1. 🧱 Database Setup

Fix the signup error by setting up your database correctly:

1. Go to your Supabase dashboard → your project  
2. Open the **SQL Editor**  
3. Paste and run the contents of `database_setup.sql`  
4. You should now see these tables:
   - `profiles`
   - `items`
   - `swaps`

### 2. 📨 Email Verification (Optional)

To disable email confirmation for dev/testing:

- Auth → Settings → Email Auth → Uncheck “Enable email confirmations”

### 3. 🖥️ Run Locally

```bash
# Python 3
python -m http.server 5500

# OR: Node.js
npx http-server -p 5500

# OR: Use the Live Server extension in VS Code
```

Then visit:
http://localhost:5500/stuffswap/

⸻

## 🧪 Troubleshooting

Error	Solution
"Database error saving new user"	
✅ Run database_setup.sql
"Email not verified"	
✅ Check inbox or disable email confirmations
"Invalid login credentials"	
✅ Check credentials and try again


⸻

## 🔐 Security Notes
	•	✅ Row Level Security (RLS) is enabled on all tables
	•	✅ Users can only access their own data
	•	✅ Auth via Supabase ensures secure session management

⸻

## 💡 Future Improvements
	•	💬 Real-time chat between swappers
	•	🌟 Emoji-based rating system
	•	🎉 Weekly themed community swap events
	•	📱 Add to Home — PWA Support
	•	🧭 Shake-to-swap mechanic

⸻

🧑‍💻 Made with ❤️ for the CS Girlies Hackathon

By the StuffSwap Team 💖🛍️

Want to contribute or remix?
Fork this repo and swap something beautiful. 🔄🪩✨


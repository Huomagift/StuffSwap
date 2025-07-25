# 🧺 StuffSwap

> **A funky local-swap platform built for real humans — not algorithms.**
> Swap items with people nearby. No price tags. No stress. Just vibes.

---

## 🛠️ Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript (Vanilla)

**Backend:**

* Supabase (Auth, Realtime DB, Storage)
* PostgreSQL (for structured data)

---

## 🌟 Features

* 📍 **Location-Based Swapping**: Discover items near you.
* 🪪 **User Authentication**: Sign up, log in, and manage your profile.
* 🖼️ **Upload Items**: Add photos, descriptions, and tags.
* 🔄 **Propose Trades**: Send and receive swap requests.
* 🎭 **Weird & Fun UI**: Swap with intuition — not logic.
* 🔔 **Trade Tracker**: Monitor the status of your proposed swaps.

---

## 🎨 Judging Vibes (Hackathon Focus)

| Criteria                   | How We Meet It                                      |
| -------------------------- | --------------------------------------------------- |
| 🧠 Unmistakably Human      | Manual swaps, emoji reactions, intuition toggles    |
| 🧬 Philosophical Edge      | No prices — just vibes. Anti-capitalist energy.     |
| 🎨 Weirdness & Originality | Retro UI, “toss to pond” mechanic, shake-for-random |
| 🛠️ Technical Craft        | Clean structure, responsive UI, smooth interactions |
| 🌍 Cultural Impact         | Promotes hyperlocal community barter culture        |

---

## 📁 Project Structure (Frontend)

```
/stuffswap
│
├── index.html              # Landing page
├── login.html              # Auth - login
├── signup.html             # Auth - register
├── dashboard.html          # Item feed, filter by location
├── add-item.html           # Upload an item
├── item-details.html       # View item and propose swap
├── my-swaps.html           # View your swap history
│
├── /css
│   └── styles.css          # Main styles
│
├── /js
│   ├── auth.js             # Login/signup logic with Supabase
│   ├── items.js            # CRUD for items
│   ├── swaps.js            # Swap handling
│   └── utils.js            # Location + helper functions
│
└── /assets
    ├── /images             # Uploaded/user images
    └── /icons              # Emojis, UI icons
```

---

## 🚀 How to Run Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/stuffswap.git
   cd stuffswap
   ```

2. **Set up Supabase**

   * Create a Supabase project
   * Add your tables: users, items, swaps
   * Enable **Auth**, **Storage**, and **Row Level Security**
   * Add API keys and URLs to `js/config.js`

3. **Open `index.html` in browser**
   You can also use **Live Server** if you're using VS Code.

---

## 💡 Future Improvements

* Chat between swappers
* Rating system using emojis
* Weekly themed swap events
* PWA support

---

## 🧠 Quote on Our Philosophy

> “Not everything has a price. Some things just feel right.”

---

## 🧑‍💻 Made with love for the CS Girlies Hackathon

**By:** StuffSwap team 💖🛍️

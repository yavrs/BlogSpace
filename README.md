# BlogSpace 📝

A full-stack blogging platform where users can create, share, and explore blog posts. Built using Node.js, Express.js, MongoDB, and EJS, BlogSpace provides user authentication and an interactive blogging experience.

## 🚀 Features

- 🔐 **User Authentication** — Register and log in securely.
- ✍️ **Create Blog Posts** — Share your thoughts with titles and content.
- 📰 **Explore Posts** — View blog posts from different users.
- ❤️ **Like Posts** — Like posts and engage with content.
- 👤 **User Profiles** — View user information and their posts.
- 🗄️ **MongoDB Database** — Store user accounts and blog posts.
- 🎨 **Dynamic UI** — Server-rendered pages using EJS templates.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Express sessions and bcrypt (if configured)
- **Tools:** Git, GitHub, npm

## 📂 Project Structure

```text
BlogSpace/
├── models/          # Database models
├── views/           # EJS templates
├── public/          # Static assets
├── app.js            # Main application file
├── package.json      # Dependencies and scripts
├── package-lock.json
├── .env              # Environment variables (not committed)
└── .gitignore
```

*Update the structure above to match your actual project files.*

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd BlogSpace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

Use the variable names expected by your application.

### 4. Start the application

```bash
npm start
```

If your project does not have a start script, run:

```bash
node app.js
```

### 5. Open in your browser

```text
http://localhost:3000
```

## 🔒 Security

- Keep database credentials and session secrets in environment variables.
- Never upload your `.env` file to GitHub.
- Use password hashing for securely storing user passwords.

## 🎯 Project Objective

BlogSpace was developed to practice full-stack web development, RESTful routing, database operations, user authentication, and dynamic server-side rendering.

## 👨‍💻 Author

**Harsh Yadav**

GitHub: [Your GitHub Profile](https://github.com/)

---

⭐ If you find this project interesting, consider giving it a star!

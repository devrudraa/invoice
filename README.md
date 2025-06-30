# Invoice Management System 💼📨

A modern and intuitive Invoice Management System that lets you create, update, and manage invoices for your clients — with automatic PDF generation, email notifications, and real-time revenue tracking via graphs.

---

## 🚀 Features

- **Create Invoices**: Fill out a form to generate invoices with a downloadable PDF.
- **Automatic Emails**:
  - Send invoice emails to clients with PDF attachments.
  - Send reminder emails for pending invoices.
  - Send update emails automatically when invoices are edited.
- **Revenue Dashboard**:
  - Mark invoices as _Paid_ or _Pending_.
  - Visualize total revenue through interactive charts.
- **Multi-Currency Support**: Works with `INR`, `USD`, `EUR`, and `GBP`.
- **Landing Page**: A professional landing page to present your tool.
- **Authentication**: Secure access to your dashboard.

---

## 📸 Screenshots

![Landing Page Screenshot](/public/images/landing.png)
![Dashboard Screenshot](/public/images/dashboard.png)

---

## 🛠️ Tech Stack

- **Frontend**: React / `Next.js` / TailwindCSS / Shadcn UI
- **Backend**: Next.js API Routes / Next-auth
- **Database**: SQLite / `Drizzle` / Turso
- **Email**: `Resend`
- **PDF**: `js-pdf`
- **Others**: React-hook forms, Zod, react-email

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/invoice-management-system.git
cd invoice-management-system
```

### 2. Install Dependencies

```bash
npm i
# or
yarn i
```

### 3. Setup Environment Variables

```bash
DATABASE_URL=your_database_url
EMAIL_SERVER=smtp.your-email.com
EMAIL_USER=your@email.com
EMAIL_PASSWORD=your_email_password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the Dev Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📤 Deployment

You can deploy this project on platforms like:

- Vercel
- Railway
- Render
- Heroku
- DigitalOcean

Make sure to set your environment variables on the respective platform.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a PR.

---

## 📄 License

MIT

---

## 💡 Future Improvements

- User authentication & team access
- Recurring invoices
- Web push notifications
- Invoice templates/themes
- Mobile-responsive improvements

---

## 👨‍💻 Author

Dev Rudra  
[Portfolio](https://rudracode.com) · [GitHub](https://github.com/devrudra) · [Linkedin](https://www.linkedin.com/in/devrudraa/)

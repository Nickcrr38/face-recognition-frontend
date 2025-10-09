# Smart Brain

Smart Brain is a **React** web app for detecting faces in images. Users can register, sign in, submit image URLs, and see detected faces highlighted using the **Vladmandic/face-api** library.  

The backend is powered by **Node.js**, **Express**, and **PostgreSQL** to manage users and track image entry counts.  

---

## Frontend Overview

- Built with **React** for all user interactions.  
- **Sign In & Register:** Secure forms with validation.  
- **Face Detection:** Submit image URLs; detected faces are highlighted.  
- **User Entries Tracking:** Shows how many images each user submitted.  
- **Responsive Design:** Layout adjusts when resizing the browser (desktop-optimized).  
- **Custom Buttons & Styling:** Hover effects, animations, and neat UI.

### Postman Testing (Frontend ↔ Backend)

During development, **Postman** was used to verify API endpoints independently from the frontend:

- `POST /register` — create new user  
- `POST /signin` — authenticate user  
- `PUT /image` — update user's image entry count  

---

## Backend Overview

- Built with **Node.js**, **Express**, and **PostgreSQL**.  
- Handles **user authentication**, **image entry tracking**, and **face detection requests**.  
- Database stores users and image counts.  

### Postman Usage

Used to quickly test endpoints before frontend integration:

- Ensure `POST /register` creates a new user.  
- Ensure `POST /signin` authenticates correctly.  
- Ensure `PUT /image` updates the entry count.  
- Identify request/response errors without opening the frontend.  

---

## Setup

### Frontend

```bash
cd frontend
npm install
npm start

# CommUnity App

A full-stack web application for organizing and participating in community events. Supports user authentication via Google, event creation and joining, user profiles, and crowdfunding/sponsored funding support.

---

##  Features

- Google Sign-In using Firebase  
- Create, view, and join community events  
- Organizing committee roles and responsibilities  
- Crowdfunding support for events  
- Private and public events  
- User profile with editable info (bio, phone, social handle, interests)  
- Responsive and modern UI built with Tailwind CSS and shadcn components

---

##  Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS + shadcn/ui  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: Firebase  
- **Deployment**: (to be configured later)

---

##  Getting Started

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_uri
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

---

### Frontend

1. At the root of the project, create a `.env` file:
   ```env
   VITE_FIREBASE_API_KEY="..."
   VITE_FIREBASE_AUTH_DOMAIN="..."
   VITE_FIREBASE_PROJECT_ID="..."
   VITE_FIREBASE_MESSAGING_SENDER_ID="..."
   VITE_FIREBASE_APP_ID="..."
   VITE_API_URL=http://localhost:5000     // Should match the PORT in backend/.env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

---

##  Notes

- This project is still under development.
- Future enhancements include:
  - Event dashboards
  - Notifications
  - Payment integration
  - Settings section for managing profile info

---
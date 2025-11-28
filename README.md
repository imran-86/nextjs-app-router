Research Paper Hub 📚
A comprehensive academic research paper management system built with Next.js, Firebase, and MongoDB. This platform allows researchers to discover, share, and manage research papers across various academic disciplines.

🚀 Features
User Authentication - Secure login/register with Firebase Auth

Paper Management - Add, view, and manage research papers

Category System - Organized by Physics, Chemistry, Engineering, Computer Science, Biology, and Mathematics

Responsive Design - Beautiful UI with DaisyUI components

Real-time Updates - Dynamic paper management

Protected Routes - Secure access to user-specific features  

🛠️ Tech Stack
Frontend: Next.js 14, React, Tailwind CSS, DaisyUI

Authentication: Firebase Auth

Backend: Express.js, MongoDB

Deployment: Vercel (Frontend), Vercel (Backend)

Animations: React Awesome Reveal  

Prerequisites
Node.js 18+ installed

MongoDB database

Firebase project  


1. Clone the Repository
bash
git clone https://github.com/imran-86/nextjs-task.git
cd research-paper-hub     

2. Install Dependencies
bash
npm install   


🛣️ Route Summary
Public Routes
/ - Homepage with featured papers and categories

/about - About section and team information

/papers - Browse all research papers

/papers/[id] - Individual paper details

/login - User login page

/register - User registration page

Protected Routes (Requires Authentication)
/add-papers - Submit new research paper

/manage-papers - Manage user's submitted papers

API Routes
GET /api/papers - Fetch all papers

GET /api/papers/[id] - Fetch specific paper

GET /api/papers/user-email - Fetch user's papers

POST /api/papers - Create new paper

DELETE /api/papers/[id] - Delete paper   


Authentication System
Firebase Authentication

Protected routes with context API

Token-based session management

Paper Management
CRUD operations for research papers

Category-based organization

User-specific paper management

UI/UX Features
Responsive design with Tailwind CSS

Beautiful animations with React Awesome Reveal

Professional styling with DaisyUI components

Active navigation states   


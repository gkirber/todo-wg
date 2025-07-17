# 📝 TODO App

A modern, responsive TODO application with real-time authentication and task management features. Built with vanilla JavaScript and Firebase.

![TODO App Preview](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://todo-wg.vercel.app/)

## 🚀 Live Demo

**[View Live Application](https://todo-wg.vercel.app/)**

## 🛠️ Tech Stack

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

## ✨ Features

### 🔐 Authentication

- **Email/Password Registration & Login**
- **Google OAuth Integration**
- **Email Verification**
- **Password Reset Functionality**
- **Secure Session Management**

### 📋 Task Management

- **Create New Tasks**
- **Mark Tasks as Complete/Incomplete**
- **Edit Task Content**
- **Delete Individual Tasks**
- **Bulk Delete Completed Tasks**
- **Drag & Drop Task Reordering**

### 🎨 User Experience

- **Responsive Design**
- **Modern UI with Gradient Animations**
- **Loading Spinners**
- **Toast Notifications**
- **Smooth Transitions & Hover Effects**
- **Real-time Data Synchronization**

### 🔧 Technical Features

- **Firebase Realtime Database**
- **Modular JavaScript Architecture**
- **ES6 Modules**
- **RESTful API Integration**
- **Error Handling & Validation**

## 📁 Project Structure

```
todo-wg/
├── assets/
│   └── icons/                # Application icons
├── src/
│   ├── API/                  # API endpoints and configuration
│   │   ├── host.js           # Firebase database host
│   │   └── todos/            # Todo-specific API functions
│   ├── components/           # UI components and modules
│   │   ├── auth/             # Authentication components
│   │   ├── ui/               # User interface components
│   │   └── inits/            # Initialization modules
│   ├── utils/                # Utility functions
│   ├── app.js                # Main application entry point
│   ├── init.js               # Application initialization
│   └── firebaseConfig.js     # Firebase configuration
├── styles/
│   └── main.css              # Application styles
├── index.html                # Main HTML file
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser
- Firebase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gkirber/todo-wg.git
   cd todo-wg
   ```

2. **Set up Firebase**

   - Create a new Firebase project
   - Enable Authentication (Email/Password & Google)
   - Enable Realtime Database
   - Update `src/firebaseConfig.js` with your Firebase configuration

3. **Configure Firebase Database Rules**

   ```json
   {
   	"rules": {
   		"todos": {
   			"v1": {
   				"$uid": {
   					".read": "$uid === auth.uid",
   					".write": "$uid === auth.uid"
   				}
   			}
   		}
   	}
   }
   ```

4. **Run the application**
   - Open `index.html` in your browser
   - Or use a local development server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Email/Password and Google providers
4. Create a Realtime Database
5. Copy your Firebase config to `src/firebaseConfig.js`

### Environment Variables

The application uses Firebase configuration directly in the code. For production, consider using environment variables.

## 📱 Usage

### Authentication

1. **Sign Up**: Create an account with email/password or Google
2. **Email Verification**: Verify your email address
3. **Sign In**: Login with your credentials
4. **Password Reset**: Use "Forgot Password" if needed

### Task Management

1. **Add Tasks**: Type in the input field and click the add button
2. **Complete Tasks**: Click the checkbox to mark as complete
3. **Edit Tasks**: Click the edit button to modify task content
4. **Delete Tasks**: Click the delete button to remove individual tasks
5. **Reorder Tasks**: Drag and drop tasks to reorder them
6. **Bulk Delete**: Remove all completed tasks at once

## 🎯 Key Features Explained

### Real-time Synchronization

Tasks are automatically synchronized across all devices using Firebase Realtime Database.

### Drag & Drop

Tasks can be reordered using HTML5 Drag and Drop API with visual feedback.

### Responsive Design

The application adapts to different screen sizes with a mobile-first approach.

### Security

- Firebase Authentication ensures secure user management
- Database rules prevent unauthorized access
- Email verification adds an extra layer of security

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for backend services
- [Vercel](https://vercel.com/) for hosting
- [SweetAlert2](https://sweetalert2.github.io/) for beautiful notifications
- [Google Fonts](https://fonts.google.com/) for typography


---

<div align="center">

**Made with ❤️ by George Kirber**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gkirber)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iurii-rebryk)

</div>

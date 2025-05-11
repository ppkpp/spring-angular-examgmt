# Course Management System – Dockerized

This project is a containerized Course Management System built with Spring Boot (backend), Angular (frontend), and MySQL. It includes two separate modules for **Admin** and **Client**.

## 🧱 Architecture Overview

- **MySQL** – Relational database for storing course and user data.
- **Admin Backend** – Spring Boot application for admin-side operations.
- **Client Backend** – Spring Boot application for client-side operations.
- **Admin Frontend** – Angular-based frontend for administrators.
- **Client Frontend** – Angular-based frontend for users.

---

## 🚀 Quick Start

### Prerequisites

- Docker
- Docker Compose

### Steps to Run

1. Development:

   ```bash
   git clone https://github.com/yourusername/course-management-docker.git
   cd course-management-docker
   docker-compose up --build

2. Production:

   ```bash
   git clone https://github.com/yourusername/course-management-docker.git
   cd course-management-docker
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d


## 📸 Screenshots

### 🧑‍💼 Admin Dashboard

<img src="images/img1.png" alt="Admin Dashboard" width="700"/>

---

### 📝 Admin Quiz Management

<img src="images/quizz.png" alt="Quiz Management" width="700"/>

---
### 📋 Admin Exam Management

<img src="images/exam.png" alt="Exam Management" width="700"/>

---
### 📋 Admin Exam Result

<img src="images/exam-result.png" alt="Exam Management" width="700"/>


---

### 🎓 Client Course List

<img src="images/client-course.png" alt="Admin Dashboard" width="700"/>

---

### 📥 Enroll in a Course

<img src="images/client-enroll.png" alt="Quiz Management" width="700"/>

### 🎓 Client Exam

<img src="images/client-exam.png" alt="Admin Dashboard" width="700"/>

---

### 📈 Client Result

<img src="images/client-result.png" alt="Quiz Management" width="700"/>

---
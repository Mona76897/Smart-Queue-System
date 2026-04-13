Smart Queue Management System

A full-stack web application to manage queue/token systems efficiently. Built using modern technologies and deployed on cloud with DevOps practices.

🚀 Tech Stack
Frontend: React (Vite)
Backend: Spring Boot (Java)
Database: PostgreSQL
Containerization: Docker & Docker Compose
Cloud: AWS EC2
CI/CD: Jenkins

🏗️ Architecture
React frontend communicates with Spring Boot backend
Backend connects to PostgreSQL database
All services are containerized using Docker
Docker Compose orchestrates multi-container setup
Jenkins automates build and deployment to EC2

⚙️ Features
Generate queue tokens
Call next token
Display live queue status
Simple and responsive UI
Backend API integration

🐳 Docker Setup
Run locally using Docker:
docker-compose up --build

☁️ Deployment (AWS EC2)
Application deployed on AWS EC2 instance
Docker used for containerized deployment
Ports exposed:
Frontend → 5173
Backend → 9090
PostgreSQL → 5432

🔄 CI/CD Pipeline
Jenkins used for automation
SSH connection established using Git Bash
Pipeline steps:
Pull latest code from GitHub
Build backend (Maven)
Build Docker images
Deploy containers on EC2

🧠 Challenges Faced
PostgreSQL password authentication issues
Docker volume persistence conflicts
Backend container crashing due to DB mismatch
SSH connection setup from Windows

💡 Learnings
Deep understanding of Docker networking & volumes
Real-world debugging skills
Cloud deployment using AWS
CI/CD automation using Jenkins

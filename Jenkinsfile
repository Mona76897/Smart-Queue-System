pipeline {
    agent any

    environment {
        EC2_IP = '54.91.158.207' 
        SSH_CRED_ID = 'ec2-ssh-key' // This must match your Jenkins Credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent([SSH_CRED_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "
                            cd ~/smart-queue-system &&
                            git pull origin main &&
                            sudo docker-compose down &&
                            sudo docker-compose up -d --build &&
                            sudo docker image prune -f
                        "
                    """
                }
            }
        }
    }
}
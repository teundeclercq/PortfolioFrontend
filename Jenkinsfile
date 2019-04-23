pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        sh 'npm install'
      }
    }
    stage('build') {
      steps {
        sh '''echo $PWD
#!/bin/bash
ng build --prod'''
      }
    }
    stage('Deploy') {
      parallel {
        stage('Clean') {
          steps {
            sh 'rm -r /var/www/portfolios4.teun-school.nl/html/dist'
          }
        }
        stage('Deploy') {
          steps {
            sh '''cp -r /var/lib/jenkins/workspace/PortfolioFrontend_master/dist /var/www/portfolios4.teun-school.nl/html



'''
          }
        }
      }
    }
  }
}
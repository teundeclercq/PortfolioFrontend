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
    stage('deploy') {
      steps {
        sh '''cp /var/lib/jenkins/workspace/PortfolioFrontend_master/dist /var/www/portfolios4.teun-school.nl/html

'''
      }
    }
  }
}
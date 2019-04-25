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
    stage('Clean') {
      steps {
        sh '''if [ -d "/var/www/portfolios4.teun-school.nl/html/dist" ]; then rm -r /var/www/portfolios4.teun-school.nl/html/dist; fi'''
      }
    }
    stage('deploy') {
      steps {
        sh '''cp -r /var/lib/jenkins/workspace/PortfolioFrontend_master/dist /var/www/portfolios4.teun-school.nl/html'''
        
      }
    }
  }
}

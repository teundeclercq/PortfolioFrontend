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
    stage('Sonarqube analyses'){
      steps {
        sh '''sonar-scanner
              -Dsonar.projectKey=AngularPortfolioFrontend
              -Dsonar.sources=.
              -Dsonar.host.url=https://sonarqube.teun-school.nl
              -Dsonar.login=096ca67bd49d0120d18114f150696e228e899914'''
      }
    }
    stage('Clean') {
      steps {
        sh '''if [ -d "/var/www/portfolios4.teun-school.nl/html/dist" ]; then rm -r /var/www/portfolios4.teun-school.nl/html/dist; fi'''
      }
    }
    stage('deploy') {
      steps {
        sh '''cp -r /var/lib/jenkins/workspace/FrontendPortofolioPipeline/dist /var/www/portfolios4.teun-school.nl/html'''
        
      }
    }
  }
}

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
        sh '''
#!/bin/bash
npm build --prod'''
      }
    }
  }
}
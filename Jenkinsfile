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
        sh '''
        def params = [
   dirname: \'dist\',
   path: \'/var/www/portfolios4.teun-school.nl/html/\'
  ]
// Using String.contains()
if (params.path.contains(params.dirname)) {
println "Path \'${params.path}\' contains \'${params.dirname}\'"
rm -r /var/www/portfolios4.teun-school.nl/html/dist
} else {
println "no dist folder found"
}
'''
      }
    }
    stage('deploy') {
      steps {
        sh '''cp -r /var/lib/jenkins/workspace/PortfolioFrontend_master/dist /var/www/portfolios4.teun-school.nl/html









'''
      }
    }
  }
}
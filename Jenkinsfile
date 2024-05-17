pipeline {
    agent {
        label 'Selenium'
    }
    tools {
        nodejs "NodeJS 15.14.0"
    }
    parameters {
        string(
            name: 'SPEC',
            defaultValue: "cypress/tests/**/**",
            description: "Enter the spec path that you want to execute"
        )
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'edge', 'firefox', 'electron'],
            description: "Choose the browser where you want to execute scripts"
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['prod', 'dev', 'stage'],
            description: "Choose environment where you want to execute your tests"
        )
        choice(
            name: 'TAGS',
            choices: ['@regression', '@smoke'],
            description: "Run tests with the tag you chose"
        )
    }
    stages {
        stage('Delete workspace') {
            steps {
                sh 'rm -rf $WORKSPACE/cypress/reports'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh "npm ci"
            }
        }
        stage('Run Tests') {
            steps {
                wrap([$class: 'Xvfb']) {
                    sh "npx cypress run --env environment=${ENVIRONMENT},grepTags=${TAGS} --browser ${BROWSER} --spec ${SPEC}"
                }
            }
        }
    }
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'cypress/reports/',
                reportFiles: 'index.html',
                reportName: 'HTML Report',
                reportTitles: ''
            ])
        }
    }
}
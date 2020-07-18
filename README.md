# SAPPHIRE - IntegratedML Wizard
##### Web app to InterSystems IntegratedML end user 


- This is an UI Wizard to create IntegratedML models.

## Clone the project
- Clone from: https://github.com/yurimarx/integratedml-wizard.git

## Build and run
#### Docker alternative
##### After clone this repository go to root path and execute following instruction:
- Go to: integratedml-wizard folder
- Execute: mvnw install (MS Windows) or ./mvnw install (linux or mac)
- Execute: docker build -t sapphire:1.0.0 .
- Execute: docker run -p 8080:8080 sapphire:1.0.0

#### Maven alternative
##### After clone this repository go to root path and execute following instruction:
- Go to: integratedml-wizard folder
- Execute: mvnw spring-boot:run

## Use SAPPHIRE with Intersystems IntegratedML
- Access http://localhost:8080 to access SAPPHIRE

## Articles about Sapphire
- To load data: https://community.intersystems.com/post/load-your-csv-intersystems-iris-using-sapphire-auto-ml-ui
- To train model: https://community.intersystems.com/post/machine-learning-integratedml-and-sapphire

## YouTube video
- Link: https://youtu.be/PxVpEtjBAZM


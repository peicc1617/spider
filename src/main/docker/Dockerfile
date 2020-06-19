FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY spider-0.0.1-version.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
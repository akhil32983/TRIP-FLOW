FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml ./
COPY api-service/pom.xml ./api-service/
# COPY common/pom.xml ./common/

RUN mvn dependency:go-offline -B

COPY api-service/src ./api-service/src
# COPY common/src ./common/src

WORKDIR /app/api-service

RUN mvn clean package -DskipTests -B


FROM eclipse-temurin:21-jre-alpine AS backend

WORKDIR /app

COPY --from=build /app/api-service/target/api-service-0.2.0-SNAPSHOT.jar app.jar

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
# 第一阶段：使用Maven构建
FROM maven:3.8.6-eclipse-temurin-11-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# 第二阶段：使用轻量级JRE运行
FROM eclipse-temurin:11-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 3333

ENTRYPOINT ["sh", "-c", "java -jar -Dserver.port=${PORT:-3333} app.jar"]

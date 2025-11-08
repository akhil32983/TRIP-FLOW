package com.tripflow.e2e;

import java.io.File;
import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.testcontainers.containers.BrowserWebDriverContainer;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.Network;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@ActiveProfiles("test")
@TestInstance(Lifecycle.PER_CLASS)
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@TestPropertySource(properties = {
    "JWT_SECRET=VGhpcyBpcyBhIHZlcnkgc2VjdXJlIGRldmVsb3BtZW50IHNlY3JldCEyMw==",
    "POSTGRES_PASSWORD=test",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.jpa.show-sql=false",
    "spring.datasource.hikari.maximum-pool-size=3"
})
public abstract class BaseE2ETest {
    private static Network network = Network.newNetwork();

    @Container
    @ServiceConnection
    private static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
        .withDatabaseName("tripflow_test")
        .withUsername("test")
        .withPassword("test")
        .withNetwork(network)
        .withNetworkAliases("postgres")
        .withReuse(true);

    @Container
    private static GenericContainer<?> frontend = new GenericContainer<>("node:20-alpine")
        .withNetwork(network)
        .withNetworkAliases("frontend")
        .withExposedPorts(5173)
        .withFileSystemBind(
            new File("../frontend").getAbsolutePath(),
            "/app"
        )
        .withWorkingDirectory("/app")
        .withEnv("VITE_HOST", "0.0.0.0")
        .withCommand("sh", "-c", "npm install && npm run dev")
        .waitingFor(Wait.forHttp("/").forStatusCode(200))
        .withStartupTimeout(Duration.ofMinutes(3))
        .withReuse(true);

    @Container
    private static BrowserWebDriverContainer<?> chrome = new BrowserWebDriverContainer<>()
        .withCapabilities(new ChromeOptions()
            .addArguments("--no-sandbox", "--headless=new", "--disable-dev-shm-usage"))
        .withNetwork(network)
        .dependsOn(frontend)
        .withStartupTimeout(Duration.ofMinutes(2))
        .withReuse(true);

    @LocalServerPort
    protected int port;

    protected WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new RemoteWebDriver(chrome.getSeleniumAddress(), new ChromeOptions());
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    protected void navigateTo(String path) {
        driver.get("http://frontend:5173" + path);
    }
}
package com.salesforce.base;

import com.salesforce.utils.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;

import java.time.Duration;

public abstract class BaseTest {

    protected WebDriver driver;

    @BeforeTest(alwaysRun = true)
    public void setUp() {
        try {
            driver = initDriver(ConfigReader.get("browser"));
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(ConfigReader.getInt("implicit.wait.seconds")));
            driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(ConfigReader.getInt("page.load.timeout.seconds")));
            driver.get(ConfigReader.get("base.url"));
        } catch (Exception e) {
            throw new RuntimeException("Driver initialization failed: " + e.getMessage(), e);
        }
    }

    @AfterTest(alwaysRun = true)
    public void tearDown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            throw new RuntimeException("Driver teardown failed: " + e.getMessage(), e);
        }
    }

    private WebDriver initDriver(String browser) {
        switch (browser.toLowerCase()) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.addArguments("--width=1920", "--height=1080");
                return new FirefoxDriver(firefoxOptions);
            case "chrome":
            default:
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--remote-allow-origins=*", "--disable-notifications", "--start-maximized");
                return new ChromeDriver(chromeOptions);
        }
    }
}

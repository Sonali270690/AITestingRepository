package com.salesforce.tests;

import com.salesforce.base.BaseTest;
import com.salesforce.pages.LoginPage;
import com.salesforce.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class InvalidLoginTest extends BaseTest {

    private LoginPage loginPage;

    @BeforeMethod(alwaysRun = true)
    public void initPage() {
        if (driver.getCurrentUrl() == null || !driver.getCurrentUrl().contains("login.salesforce.com")) {
            driver.get(ConfigReader.get("base.url"));
        }
        loginPage = new LoginPage(driver);
        Assert.assertTrue(loginPage.isLoginPageLoaded(), "Login page failed to load");
    }

    @DataProvider(name = "invalidCredentials")
    public Object[][] invalidCredentialsProvider() {
        return new Object[][]{
                {ConfigReader.get("invalid.username"), ConfigReader.get("invalid.password")},
                {ConfigReader.get("valid.username"), "WrongPassword!@#"},
                {"not-an-email", "AnyPassword123"},
                {"", ""},
                {"   ", "   "}
        };
    }

    @Test(priority = 1, dataProvider = "invalidCredentials",
            description = "Verify login fails with invalid credential combinations")
    public void verifyLoginWithInvalidCredentials(String username, String password) {
        loginPage.doLogin(username, password);
        Assert.assertTrue(loginPage.getCurrentUrl().contains("login.salesforce.com"),
                "User was unexpectedly redirected for credentials: " + username);
        Assert.assertTrue(loginPage.isLoginPageLoaded(), "Login page no longer present after invalid attempt");
    }

    @Test(priority = 2, description = "Verify error message appears for invalid credentials")
    public void verifyErrorMessageOnInvalidLogin() {
        loginPage.doLogin(ConfigReader.get("invalid.username"), ConfigReader.get("invalid.password"));
        Assert.assertTrue(loginPage.isErrorDisplayed(), "Expected error message was not displayed");
        Assert.assertFalse(loginPage.getErrorMessage().isEmpty(), "Error message text is empty");
    }

    @Test(priority = 3, description = "Verify Remember Me persists selection on failed login")
    public void verifyRememberMeWithInvalidCredentials() {
        loginPage.selectRememberMe();
        Assert.assertTrue(loginPage.isRememberMeSelected(), "Remember Me was not selected");
        loginPage.doLoginWithRememberMe(ConfigReader.get("invalid.username"), ConfigReader.get("invalid.password"));
        Assert.assertTrue(loginPage.getCurrentUrl().contains("login.salesforce.com"),
                "Invalid login should keep user on login page");
        Assert.assertTrue(loginPage.isErrorDisplayed(), "Error not displayed for invalid login with Remember Me");
    }
}

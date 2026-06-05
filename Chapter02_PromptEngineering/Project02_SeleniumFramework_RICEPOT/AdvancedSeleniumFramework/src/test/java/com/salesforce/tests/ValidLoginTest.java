package com.salesforce.tests;

import com.salesforce.base.BaseTest;
import com.salesforce.pages.LoginPage;
import com.salesforce.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ValidLoginTest extends BaseTest {

    private LoginPage loginPage;

    @BeforeMethod(alwaysRun = true)
    public void initPage() {
        loginPage = new LoginPage(driver);
        Assert.assertTrue(loginPage.isLoginPageLoaded(), "Login page failed to load");
    }

    @Test(priority = 1, description = "Verify Salesforce login page UI elements are visible")
    public void verifyLoginPageUiElements() {
        Assert.assertTrue(loginPage.isLoginPageLoaded(), "Username/password/login elements missing");
        Assert.assertTrue(loginPage.isForgotPasswordLinkVisible(), "Forgot password link not visible");
        Assert.assertTrue(loginPage.getPageTitle().toLowerCase().contains("login"), "Page title mismatch");
    }

    @Test(priority = 2, description = "Verify successful login with valid credentials")
    public void verifyLoginWithValidCredentials() {
        loginPage.doLogin(ConfigReader.get("valid.username"), ConfigReader.get("valid.password"));
        boolean redirected = loginPage.waitForUrlChange("lightning.force.com")
                || loginPage.waitForUrlChange("home")
                || !loginPage.getCurrentUrl().contains("login.salesforce.com");
        Assert.assertTrue(redirected, "User was not redirected after valid login. Current URL: " + loginPage.getCurrentUrl());
    }

    @Test(priority = 3, description = "Verify Remember Me checkbox can be selected with valid login")
    public void verifyLoginWithRememberMeEnabled() {
        loginPage.selectRememberMe();
        Assert.assertTrue(loginPage.isRememberMeSelected(), "Remember Me checkbox was not selected");
        loginPage.doLoginWithRememberMe(ConfigReader.get("valid.username"), ConfigReader.get("valid.password"));
        boolean redirected = loginPage.waitForUrlChange("lightning.force.com")
                || loginPage.waitForUrlChange("home")
                || !loginPage.getCurrentUrl().contains("login.salesforce.com");
        Assert.assertTrue(redirected, "Login with Remember Me failed. Current URL: " + loginPage.getCurrentUrl());
    }
}

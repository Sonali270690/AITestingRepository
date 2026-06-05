package com.salesforce.pages;

import com.salesforce.utils.WaitUtils;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {

    private final WebDriver driver;
    private final WaitUtils waitUtils;

    @FindBy(xpath = "//input[@id='username']")
    private WebElement usernameField;

    @FindBy(xpath = "//input[@id='password']")
    private WebElement passwordField;

    @FindBy(xpath = "//input[@id='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//input[@id='rememberUn']")
    private WebElement rememberMeCheckbox;

    @FindBy(xpath = "//label[@for='rememberUn']")
    private WebElement rememberMeLabel;

    @FindBy(xpath = "//a[@id='forgot_password_link']")
    private WebElement forgotPasswordLink;

    @FindBy(xpath = "//div[@id='error']")
    private WebElement errorMessage;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.waitUtils = new WaitUtils(driver);
        PageFactory.initElements(driver, this);
    }

    public void enterUsername(String username) {
        try {
            WebElement element = waitUtils.waitForVisible(usernameField);
            element.clear();
            element.sendKeys(username);
        } catch (TimeoutException | NoSuchElementException e) {
            throw new RuntimeException("Unable to enter username: " + e.getMessage(), e);
        }
    }

    public void enterPassword(String password) {
        try {
            WebElement element = waitUtils.waitForVisible(passwordField);
            element.clear();
            element.sendKeys(password);
        } catch (TimeoutException | NoSuchElementException e) {
            throw new RuntimeException("Unable to enter password: " + e.getMessage(), e);
        }
    }

    public void clickLogin() {
        try {
            waitUtils.waitForClickable(loginButton).click();
        } catch (TimeoutException | NoSuchElementException e) {
            throw new RuntimeException("Unable to click login: " + e.getMessage(), e);
        }
    }

    public void selectRememberMe() {
        try {
            WebElement checkbox = waitUtils.waitForVisible(rememberMeCheckbox);
            if (!checkbox.isSelected()) {
                waitUtils.waitForClickable(rememberMeLabel).click();
            }
        } catch (TimeoutException | NoSuchElementException e) {
            throw new RuntimeException("Unable to toggle Remember Me: " + e.getMessage(), e);
        }
    }

    public boolean isRememberMeSelected() {
        try {
            return waitUtils.waitForVisible(rememberMeCheckbox).isSelected();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }

    public void doLogin(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }

    public void doLoginWithRememberMe(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        selectRememberMe();
        clickLogin();
    }

    public String getErrorMessage() {
        try {
            return waitUtils.waitForVisible(errorMessage).getText();
        } catch (TimeoutException | NoSuchElementException e) {
            return "";
        }
    }

    public boolean isErrorDisplayed() {
        try {
            return waitUtils.waitForVisible(errorMessage).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }

    public boolean isLoginPageLoaded() {
        try {
            return waitUtils.waitForVisible(usernameField).isDisplayed()
                    && waitUtils.waitForVisible(passwordField).isDisplayed()
                    && waitUtils.waitForVisible(loginButton).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }

    public boolean isForgotPasswordLinkVisible() {
        try {
            return waitUtils.waitForVisible(forgotPasswordLink).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    public String getPageTitle() {
        return driver.getTitle();
    }

    public boolean waitForUrlChange(String fragment) {
        try {
            return waitUtils.waitForUrlContains(fragment);
        } catch (TimeoutException e) {
            return false;
        }
    }
}

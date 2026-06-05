package com.salesforce.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class ConfigReader {

    private static final Properties PROPERTIES = new Properties();
    private static final String CONFIG_PATH = "src/test/resources/config.properties";

    static {
        try (InputStream input = new FileInputStream(CONFIG_PATH)) {
            PROPERTIES.load(input);
        } catch (IOException e) {
            throw new ExceptionInInitializerError("Failed to load configuration: " + e.getMessage());
        }
    }

    private ConfigReader() {
    }

    public static String get(String key) {
        String value = PROPERTIES.getProperty(key);
        if (value == null) {
            throw new IllegalArgumentException("Missing configuration key: " + key);
        }
        return value.trim();
    }

    public static int getInt(String key) {
        try {
            return Integer.parseInt(get(key));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid integer for key: " + key, e);
        }
    }
}

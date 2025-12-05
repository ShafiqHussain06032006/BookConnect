package com.bookconnect.model;

/**
 * Enum for book categories.
 * 
 * Design Pattern: Enumeration
 * Constrains categories to predefined values matching frontend requirements.
 */
public enum BookCategory {
    FICTION("Fiction"),
    ROMANCE("Romance"),
    MYSTERY_THRILLER("Mystery / Thriller"),
    SELF_HELP_MOTIVATIONAL("Self-Help / Motivational"),
    FANTASY("Fantasy");

    private final String displayName;

    BookCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static BookCategory fromDisplayName(String displayName) {
        for (BookCategory category : values()) {
            if (category.displayName.equalsIgnoreCase(displayName)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown category: " + displayName);
    }
}

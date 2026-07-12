# ============================================================
# Mind Garden - Production ProGuard / R8 Rules
# ============================================================

# Preserve line numbers in crash stack traces
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# ============================================================
# Capacitor / WebView Bridge
# ============================================================
-keep class com.getcapacitor.** { *; }
-keep class com.mindgarden.app.** { *; }
-keepclassmembers class * {
    @com.getcapacitor.annotation.* <methods>;
}

# WebView JavaScript interface - prevent stripping
-keepclassmembers class * {
    public *;
}

# ============================================================
# AndroidX
# ============================================================
-keep class androidx.** { *; }
-dontwarn androidx.**

# ============================================================
# Cordova / Capacitor Community Plugins
# ============================================================
-keep class capacitor.** { *; }
-keep class com.capacitorjs.** { *; }
-dontwarn com.capacitorjs.**

# ============================================================
# General Android Safety
# ============================================================

# Enum safety (prevents crashes with enums in switch statements)
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Parcelable
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

# Serializable
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Annotations
-dontwarn javax.annotation.**

# Suppress common warnings that are not errors
-dontwarn org.bouncycastle.**
-dontwarn org.conscrypt.**
-dontwarn org.openjsse.**

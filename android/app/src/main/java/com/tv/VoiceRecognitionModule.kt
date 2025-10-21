package com.tv

import android.speech.SpeechRecognizer
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class VoiceRecognitionModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VoiceRecognitionModule"
    }

    @ReactMethod
    fun isRecognitionAvailable(promise: Promise) {
        try {
            val available = SpeechRecognizer.isRecognitionAvailable(reactApplicationContext)
            promise.resolve(available)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to check voice recognition availability", e)
        }
    }
}

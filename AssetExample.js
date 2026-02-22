import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './supabase';

// Screens
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // 1. Check if a user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for Auth changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkUserProfile(session.user.id);
      } else {
        setHasProfile(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Profile fetch error:', error.message);
      }

      setHasProfile(data?.onboarding_complete || false);
    } catch (err) {
      console.log('User profile check failed', err);
    } finally {
      setLoading(false);
    }
  }

  // Loading State
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3c83f6" />
      </View>
    );
  }

  // Navigation Logic wrapped in SafeAreaProvider
  return (
    <SafeAreaProvider>
      {!session ? (
        <LoginScreen />
      ) : !hasProfile ? (
        <OnboardingScreen onComplete={() => setHasProfile(true)} />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#101722' // Matching your dark theme
  },
});
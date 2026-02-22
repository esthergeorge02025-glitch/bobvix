import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';

import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  const handleGoogleLogin = async () => {
    try {
      const redirectTo = makeRedirectUri({
        useProxy: true,
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        Alert.alert('Login Error', error.message);
      }

    } catch (err) {
      Alert.alert('Unexpected Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn}>
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.brandLogo}>BobVix</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your BobVix account</Text>

        <View style={styles.buttonStack}>
          <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
              style={styles.iconSm}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appleBtn}>
            <MaterialCommunityIcons name="apple" size={24} color="white" />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.emailBtn}>
          <MaterialCommunityIcons name="email-outline" size={22} color="#3c83f6" />
          <Text style={styles.emailText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101722' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  brandLogo: { color: '#3c83f6', fontSize: 22, fontWeight: 'bold', letterSpacing: 1 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  title: { color: 'white', fontSize: 36, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#94a3b8', fontSize: 18, textAlign: 'center', marginTop: 10, marginBottom: 40 },
  buttonStack: { gap: 16 },
  googleBtn: { backgroundColor: 'white', height: 56, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  googleText: { color: 'black', fontWeight: 'bold', fontSize: 16 },
  appleBtn: { backgroundColor: '#0f172a', height: 56, borderRadius: 16, borderWidth: 1, borderColor: '#334155', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  appleText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  iconSm: { width: 20, height: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#1e293b' },
  orText: { color: '#475569', paddingHorizontal: 15, fontSize: 12, fontWeight: 'bold' },
  emailBtn: { backgroundColor: 'rgba(60, 131, 246, 0.1)', height: 56, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(60, 131, 246, 0.3)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  emailText: { color: '#3c83f6', fontWeight: 'bold', fontSize: 16 },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: '#475569', fontSize: 12, textAlign: 'center' }
});
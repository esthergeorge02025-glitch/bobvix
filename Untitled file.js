import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';

export default function HomeScreen() {
  const [profile, setProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch the data we set up in our SQL "Master Table"
  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3c83f6" />}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.username}>@{profile?.username || 'creator'}</Text>
          </View>
          <TouchableOpacity style={styles.profileCircle}>
            <MaterialCommunityIcons name="account" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Balance Card - The Money Logic */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${profile?.balance_usdt || '0.00'} <Text style={styles.currency}>USDT</Text></Text>
          <View style={styles.cardStats}>
            <View>
              <Text style={styles.statLabel}>VixPoints</Text>
              <Text style={styles.statValue}>1,250</Text>
            </View>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconBg, { backgroundColor: '#3c83f620' }]}>
              <MaterialCommunityIcons name="video-plus" size={30} color="#3c83f6" />
            </View>
            <Text style={styles.gridLabel}>Go Live</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconBg, { backgroundColor: '#ff2d5520' }]}>
              <MaterialCommunityIcons name="play-box-multiple" size={30} color="#ff2d55" />
            </View>
            <Text style={styles.gridLabel}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconBg, { backgroundColor: '#10b98120' }]}>
              <MaterialCommunityIcons name="wallet" size={30} color="#10b981" />
            </View>
            <Text style={styles.gridLabel}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconBg, { backgroundColor: '#8b5cf620' }]}>
              <MaterialCommunityIcons name="chart-bar" size={30} color="#8b5cf6" />
            </View>
            <Text style={styles.gridLabel}>Stats</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out for testing */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => supabase.auth.signOut()}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101722' },
  scrollContent: { padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  greeting: { color: '#94a3b8', fontSize: 16 },
  username: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  profileCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#334155', justifyContent: 'center', alignItems: 'center' },
  balanceCard: { backgroundColor: '#3c83f6', borderRadius: 24, padding: 24, marginBottom: 30, shadowColor: '#3c83f6', shadowOpacity: 0.4, shadowRadius: 15, elevation: 10 },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 8 },
  balanceAmount: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  currency: { fontSize: 18, fontWeight: 'normal' },
  cardStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  statValue: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  withdrawBtn: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  withdrawText: { color: '#3c83f6', fontWeight: 'bold' },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { backgroundColor: '#1e293b', width: '47%', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  iconBg: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridLabel: { color: 'white', fontWeight: '600' },
  logoutBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: '#ef4444', fontWeight: 'bold' }
});
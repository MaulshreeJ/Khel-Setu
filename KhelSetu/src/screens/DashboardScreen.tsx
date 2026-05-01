import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [animatedStats, setAnimatedStats] = useState({
    totalTests: 0,
    avgScore: 0,
    rank: 0,
    streak: 0,
  });

  useEffect(() => {
    // Simulate fetching data and updating stats
    setAnimatedStats({
      totalTests: 15,
      avgScore: 85,
      rank: 42,
      streak: 7,
    });
  }, []);

  const recentTests = [
    {
      id: 1,
      name: 'Sprint Test',
      category: 'Athletics',
      date: '2023-10-01',
      badge: 'Gold',
      score: 95,
      improvement: 5,
    },
    {
      id: 2,
      name: 'Endurance Test',
      category: 'Cycling',
      date: '2023-09-25',
      badge: 'Silver',
      score: 88,
      improvement: -2,
    },
    {
      id: 3,
      name: 'Strength Test',
      category: 'Weightlifting',
      date: '2023-09-20',
      badge: null,
      score: 80,
      improvement: 3,
    },
  ];

  // ----------------------------- UI BELOW ------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER WITH AVATAR AND SHADOW */}
        <LinearGradient
          colors={['#FFF4E6', '#FFFAF3', '#F9F9F7']}
          style={styles.headerSection}
        >
          <View style={styles.headerContent}>
            <View style={styles.avatarBox}>
              {/* Placeholder for Avatar, switch to Image for initial */}
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitial}>R</Text>
              </View>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Welcome back, Rahul!</Text>
              <Text style={styles.headerDescription}>
                Track your fitness journey and compete with athletes across India.
              </Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Button
              title="Schedule Test"
              onPress={() => {}}
              icon={<Ionicons name="calendar" size={18} color="#FFFFFF" />}
              style={styles.headerButton}
            />
            <Button
              title="Reports"
              onPress={() => {}}
              variant="outline"
              icon={<Ionicons name="trending-up" size={18} color="#FF6B35" />}
              style={styles.headerButton}
            />
          </View>
        </LinearGradient>

        {/* STATS GRID - VISUAL CUES, PADDING, ROUNDNESS */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <CardHeader style={styles.statHeader}>
                <Text style={styles.statTitle}>Total Tests</Text>
                <Ionicons name="fitness" size={20} color="#FF6B35" />
              </CardHeader>
              <CardContent>
                <Text style={[styles.statValue, { color: '#FF6B35' }]}>
                  {animatedStats.totalTests}
                </Text>
                <Text style={styles.statChange}>+3 from last month</Text>
              </CardContent>
            </Card>
            <Card style={styles.statCard}>
              <CardHeader style={styles.statHeader}>
                <Text style={styles.statTitle}>Average Score</Text>
                <Ionicons name="trending-up" size={20} color="#059669" />
              </CardHeader>
              <CardContent>
                <Text style={[styles.statValue, { color: '#059669' }]}>
                  {animatedStats.avgScore}%
                </Text>
                <Text style={styles.statChange}>+5% from last month</Text>
              </CardContent>
            </Card>
            <Card style={styles.statCard}>
              <CardHeader style={styles.statHeader}>
                <Text style={styles.statTitle}>National Rank</Text>
                <Ionicons name="trophy" size={20} color="#7C3AED" />
              </CardHeader>
              <CardContent>
                <Text style={[styles.statValue, { color: '#7C3AED' }]}>
                  #{animatedStats.rank}
                </Text>
                <Text style={styles.statChange}>↑12 positions</Text>
              </CardContent>
            </Card>
            <Card style={styles.statCard}>
              <CardHeader style={styles.statHeader}>
                <Text style={styles.statTitle}>Current Streak</Text>
                <Ionicons name="target" size={20} color="#FF6B35" />
              </CardHeader>
              <CardContent>
                <Text style={[styles.statValue, { color: '#FF6B35' }]}>
                  {animatedStats.streak} days
                </Text>
                <Text style={styles.statChange}>Keep it up!</Text>
              </CardContent>
            </Card>
          </View>
        </View>

        {/* TWO COLUMN LAYOUT - TOP CONTENT VS SIDEBAR */}
        <View style={styles.mainContent}>
          {/* Primary Section */}
          <Card style={styles.chartCard}>
            <CardHeader>
              <Text style={styles.chartTitle}>Performance Trends</Text>
              <Text style={styles.chartDescription}>
                Your scores in the last 6 months
              </Text>
            </CardHeader>
            <CardContent>
              <View style={styles.chartVisualPlaceholder}>
                <Ionicons name="stats-chart-outline" size={42} color="#D1D5DB" />
                <Text style={styles.chartPlaceholderText}>Chart visualization</Text>
              </View>
            </CardContent>
          </Card>
          {/* Recent Test Results */}
          <Card style={styles.testsCard}>
            <CardHeader>
              <Text style={styles.testsTitle}>Recent Test Results</Text>
            </CardHeader>
            <CardContent>
              {recentTests.map(test => (
                <View key={test.id} style={styles.testItem}>
                  <View style={styles.testInfo}>
                    <Ionicons name="fitness" size={28} color="#FF6B35" style={{ marginRight: 12 }} />
                    <View>
                      <Text style={styles.testName}>{test.name}</Text>
                      <Text style={styles.testCategory}>{test.category} • {test.date}</Text>
                    </View>
                  </View>
                  <View style={styles.testScore}>
                    {test.badge && (
                      <Badge variant="secondary" style={styles.testBadge}>
                        {test.badge}
                      </Badge>
                    )}
                    <Text style={styles.scoreValue}>{test.score}%</Text>
                    <View style={styles.improvementContainer}>
                      <Ionicons
                        name={test.improvement > 0 ? "arrow-up" : "arrow-down"}
                        size={13}
                        color={test.improvement > 0 ? "#059669" : "#DC2626"}
                      />
                      <Text style={[styles.improvementText, { color: test.improvement > 0 ? "#059669" : "#DC2626" }]}>
                        {Math.abs(test.improvement)}%
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ----------------------------- STYLE ENHANCEMENTS ----------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerSection: {
    paddingVertical: 26,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 6,
    // shadow for elevation
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarBox: { marginRight: 18 },
  avatarCircle: {
    backgroundColor: '#FFD0BC',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { fontSize: 26, fontWeight: 'bold', color: '#FF6B35' },
  headerText: { flex: 1 },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerDescription: {
    fontSize: 15,
    color: '#888',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    minWidth: 120,
    marginRight: 0,
    borderRadius: 10,
  },
  statsSection: {
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 64) / 2,
    marginBottom: 18,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  statTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  statChange: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  mainContent: {
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  chartCard: {
    marginBottom: 14,
    padding: 6,
    backgroundColor: '#FFF6ED',
    borderRadius: 18,
    borderWidth: 0.6,
    borderColor: '#FFE2D1',
  },
  chartTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 1,
  },
  chartDescription: {
    fontSize: 13,
    color: '#948B79',
  },
  chartVisualPlaceholder: {
    height: 190,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  chartPlaceholderText: {
    fontSize: 17,
    color: '#BABBC0',
    fontWeight: 'bold',
    marginTop: 8,
  },
  testsCard: {
    marginBottom: 10,
    padding: 6,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: '#EBEBEB',
  },
  testsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#FAF6F3',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
  },
  testInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#232323',
    marginBottom: 1,
  },
  testCategory: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  testScore: { alignItems: 'flex-end' },
  scoreValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#232323',
  },
  testBadge: {
    marginBottom: 3,
    alignSelf: 'flex-end',
  },
  improvementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  improvementText: {
    fontSize: 12,
    marginLeft: 2,
    fontWeight: '600',
  },
});
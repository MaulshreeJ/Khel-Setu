import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function TestsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tests', icon: 'grid' },
    { id: 'endurance', name: 'Endurance', icon: 'heart' },
    { id: 'strength', name: 'Strength', icon: 'flash' },
    { id: 'agility', name: 'Agility', icon: 'time' },
    { id: 'flexibility', name: 'Flexibility', icon: 'target' },
  ];

  const tests = [
    {
      id: 1,
      name: '12-Minute Run',
      category: 'endurance',
      description: 'Cardiovascular endurance test measuring distance covered in 12 minutes',
      duration: '12 minutes',
      difficulty: 'Intermediate',
      icon: 'heart',
      color: '#FF6B35',
    },
    {
      id: 2,
      name: 'Push-Up Test',
      category: 'strength',
      description: 'Upper body strength test measuring maximum push-ups in one minute',
      duration: '1 minute',
      difficulty: 'Beginner',
      icon: 'flash',
      color: '#059669',
    },
    {
      id: 3,
      name: 'Vertical Jump',
      category: 'strength',
      description: 'Lower body power test measuring maximum vertical jump height',
      duration: '5 minutes',
      difficulty: 'Intermediate',
      icon: 'flash',
      color: '#059669',
    },
    {
      id: 4,
      name: 'Shuttle Run',
      category: 'agility',
      description: 'Agility and speed test with 20-meter shuttle runs',
      duration: '10 minutes',
      difficulty: 'Advanced',
      icon: 'time',
      color: '#7C3AED',
    },
    {
      id: 5,
      name: 'Sit & Reach',
      category: 'flexibility',
      description: 'Lower back and hamstring flexibility test',
      duration: '5 minutes',
      difficulty: 'Beginner',
      icon: 'target',
      color: '#6B7280',
    },
    {
      id: 6,
      name: 'T-Test',
      category: 'agility',
      description: 'Multi-directional agility test with T-shaped course',
      duration: '8 minutes',
      difficulty: 'Advanced',
      icon: 'time',
      color: '#7C3AED',
    },
  ];

  const filteredTests = selectedCategory === 'all' 
    ? tests 
    : tests.filter(test => test.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#059669';
      case 'Intermediate': return '#FF6B35';
      case 'Advanced': return '#DC2626';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Fitness Tests</Text>
          <Text style={styles.headerDescription}>
            Choose from our comprehensive range of standardized fitness assessments
          </Text>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryFilter}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'}
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tests Grid */}
        <View style={styles.testsGrid}>
          {filteredTests.map((test) => (
            <Card key={test.id} style={styles.testCard}>
              <CardHeader>
                <View style={styles.testHeader}>
                  <View style={[styles.testIcon, { backgroundColor: test.color }]}>
                    <Ionicons name={test.icon as any} size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.testInfo}>
                    <Text style={styles.testName}>{test.name}</Text>
                    <Badge 
                      variant="outline" 
                      style={[styles.difficultyBadge, { borderColor: getDifficultyColor(test.difficulty) }]}
                    >
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(test.difficulty) }]}>
                        {test.difficulty}
                      </Text>
                    </Badge>
                  </View>
                </View>
              </CardHeader>
              <CardContent>
                <Text style={styles.testDescription}>{test.description}</Text>
                <View style={styles.testDetails}>
                  <View style={styles.testDetail}>
                    <Ionicons name="time" size={16} color="#6B7280" />
                    <Text style={styles.testDetailText}>{test.duration}</Text>
                  </View>
                  <View style={styles.testDetail}>
                    <Ionicons name="fitness" size={16} color="#6B7280" />
                    <Text style={styles.testDetailText}>{test.category}</Text>
                  </View>
                </View>
                <Button
                  title="Start Test"
                  onPress={() => {}}
                  style={styles.startButton}
                />
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Quick Start Section */}
        <View style={styles.quickStartSection}>
          <Card style={styles.quickStartCard}>
            <CardHeader>
              <Text style={styles.quickStartTitle}>Quick Assessment</Text>
              <Text style={styles.quickStartDescription}>
                Get a comprehensive fitness overview in just 15 minutes
              </Text>
            </CardHeader>
            <CardContent>
              <View style={styles.quickStartTests}>
                <Text style={styles.quickStartTest}>• 12-Minute Run</Text>
                <Text style={styles.quickStartTest}>• Push-Up Test</Text>
                <Text style={styles.quickStartTest}>• Sit & Reach</Text>
              </View>
              <Button
                title="Start Quick Assessment"
                onPress={() => {}}
                size="lg"
                style={styles.quickStartButton}
              />
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  categoryFilter: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryList: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  testsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  testCard: {
    marginBottom: 16,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  testDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  testDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  testDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  testDetailText: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  startButton: {
    width: '100%',
  },
  quickStartSection: {
    padding: 20,
  },
  quickStartCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FF6B35',
  },
  quickStartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  quickStartDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickStartTests: {
    marginBottom: 16,
  },
  quickStartTest: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  quickStartButton: {
    width: '100%',
  },
});

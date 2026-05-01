import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const { width } = Dimensions.get('window');

// Conditional hook for responsive layout (e.g., mission section)
const isLargeScreen = width > 768;

export default function AboutScreen() {
  const heroTitleAnim = useSharedValue(0);
  const heroDescriptionAnim = useSharedValue(0);
  const timelineProgress = useSharedValue(0);

  useEffect(() => {
    heroTitleAnim.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
    heroDescriptionAnim.value = withDelay(
      300,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) })
    );
  }, []);

  const heroTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: heroTitleAnim.value,
      transform: [{ translateY: (1 - heroTitleAnim.value) * 50 }],
    };
  });

  const heroDescriptionStyle = useAnimatedStyle(() => {
    return {
      opacity: heroDescriptionAnim.value,
      transform: [{ translateY: (1 - heroDescriptionAnim.value) * 30 }],
    };
  });

  const milestones = [
    {
      year: "2020",
      title: "Vision Born",
      description: "Identified the need for standardized fitness assessment in Indian sports",
      icon: <Ionicons name="target" size={24} color="#FFFFFF" />,
      color: "#FF6B35",
    },
    {
      year: "2021",
      title: "Research & Development",
      description: "Collaborated with sports scientists and AI experts to develop assessment algorithms",
      icon: <Ionicons name="fitness" size={24} color="#FFFFFF" />,
      color: "#059669",
    },
    {
      year: "2022",
      title: "Pilot Program",
      description: "Launched pilot testing with 500 athletes across 5 states",
      icon: <Ionicons name="people" size={24} color="#FFFFFF" />,
      color: "#7C3AED",
    },
    {
      year: "2023",
      title: "National Expansion",
      description: "Scaled to 15,000+ athletes with partnerships across India",
      icon: <Ionicons name="globe" size={24} color="#FFFFFF" />,
      color: "#FF6B35",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Launched advanced AI-powered performance analytics and predictions",
      icon: <Ionicons name="flash" size={24} color="#FFFFFF" />,
      color: "#059669",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      bio: "Former Olympic coach with 20+ years in sports science",
      avatar: "https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=RK",
      location: "New Delhi",
    },
    {
      name: "Priya Sharma",
      role: "Head of Technology",
      bio: "AI/ML expert specializing in sports analytics",
      avatar: "https://via.placeholder.com/120x120/059669/FFFFFF?text=PS",
      location: "Bangalore",
    },
    {
      name: "Arjun Patel",
      role: "Sports Science Director",
      bio: "PhD in Exercise Physiology, former national athlete",
      avatar: "https://via.placeholder.com/120x120/7C3AED/FFFFFF?text=AP",
      location: "Mumbai",
    },
    {
      name: "Sneha Gupta",
      role: "Head of Operations",
      bio: "Operations expert with experience in scaling sports programs",
      avatar: "https://via.placeholder.com/120x120/6B7280/FFFFFF?text=SG",
      location: "Chennai",
    },
  ];

  const stats = [
    { label: "Athletes Assessed", value: "15,000+", icon: <Ionicons name="people" size={24} color="#FF6B35" /> },
    { label: "States Covered", value: "28", icon: <Ionicons name="location" size={24} color="#FF6B35" /> },
    { label: "Sports Disciplines", value: "25+", icon: <Ionicons name="trophy" size={24} color="#FF6B35" /> },
    { label: "Assessment Accuracy", value: "98%", icon: <Ionicons name="target" size={24} color="#FF6B35" /> },
  ];

  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in sports assessment and athlete development",
      icon: <Ionicons name="award" size={32} color="#FFFFFF" />,
      color: "#FF6B35",
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize sports science in India",
      icon: <Ionicons name="flash" size={32} color="#FFFFFF" />,
      color: "#059669",
    },
    {
      title: "Inclusivity",
      description: "Making world-class fitness assessment accessible to athletes across all backgrounds",
      icon: <Ionicons name="heart" size={32} color="#FFFFFF" />,
      color: "#7C3AED",
    },
    {
      title: "Integrity",
      description: "Maintaining transparency and fairness in all our assessments and processes",
      icon: <Ionicons name="star" size={32} color="#FFFFFF" />,
      color: "#FF6B35",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.culturalPattern}>
            <View style={[styles.patternCircle, { top: 40, left: 40, borderColor: '#FF6B35' }]} />
            <View style={[styles.patternCircle, { top: 120, right: 80, borderColor: '#059669' }]} />
            <View style={[styles.patternCircle, { bottom: 80, left: 120, borderColor: '#7C3AED' }]} />
            <View style={[styles.patternCircle, { bottom: 120, right: 40, borderColor: '#FF6B35' }]} />
          </View>

          <View style={styles.heroContent}>
            <Badge variant="secondary" style={styles.heroBadge}>
              Empowering Indian Sports Since 2020
            </Badge>

            <Animated.View style={heroTitleStyle}>
              <Text style={styles.heroTitle}>
                Transforming Indian Sports Through{'\n'}
                <Text style={styles.heroTitleAccent}> Smart Assessment</Text>
              </Text>
            </Animated.View>

            <Animated.View style={heroDescriptionStyle}>
              <Text style={styles.heroDescription}>
                We believe every Indian athlete deserves access to world-class fitness assessment tools.
                Our AI-powered platform is democratizing sports science across the nation.
              </Text>
            </Animated.View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              {stats.map((stat) => (
                <View key={stat.label} style={styles.statItem}>
                  <View style={styles.statIcon}>{stat.icon}</View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Mission & Vision */}
        <View style={styles.missionSection}>
          <View style={styles.missionContent}>
            <View style={styles.missionText}>
              <Text style={styles.sectionTitle}>Our Mission</Text>
              <Text style={styles.sectionDescription}>
                To democratize access to world-class sports science and fitness assessment tools,
                empowering every Indian athlete to reach their full potential through data-driven insights.
              </Text>

              <Text style={styles.sectionTitle}>Our Vision</Text>
              <Text style={styles.sectionDescription}>
                A future where every athlete in India, regardless of their background or location,
                has access to the same level of sports science support as Olympic champions.
              </Text>

              <Button
                title="Join Our Mission"
                onPress={() => {}}
                size="lg"
                style={styles.missionButton}
              />
            </View>

            <View style={styles.missionImageContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=Indian+Athletes+Training' }}
                style={styles.missionImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Journey</Text>
            <Text style={styles.sectionDescription}>
              From a vision to transform Indian sports to a platform serving thousands of athletes nationwide
            </Text>
          </View>

          <View style={styles.timelineContainer}>
            {milestones.map((milestone, index) => (
              <Animated.View key={milestone.year} style={[styles.timelineItem]}>
                <View style={styles.timelineCardContainer}>
                  <Card style={styles.timelineCard}>
                    <CardHeader style={styles.timelineCardHeader}>
                      <View style={[styles.timelineIcon, { backgroundColor: milestone.color }]}>
                        {milestone.icon}
                      </View>
                      <View style={styles.timelineText}>
                        <Badge variant="outline" style={styles.timelineBadge}>
                          {milestone.year}
                        </Badge>
                        <Text style={styles.timelineTitle}>{milestone.title}</Text>
                      </View>
                    </CardHeader>
                    <CardContent>
                      <Text style={styles.timelineDescription}>{milestone.description}</Text>
                    </CardContent>
                  </Card>
                </View>
                <View style={[styles.timelineLine, index === 0 && styles.firstTimelineLine]} />
                <View style={[styles.timelineDot, { backgroundColor: milestone.color }]} />
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Values */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Values</Text>
            <Text style={styles.sectionDescription}>
              The principles that guide everything we do
            </Text>
          </View>

          <View style={styles.valuesGrid}>
            {values.map((value) => (
              <Card key={value.title} style={styles.valueCard}>
                <CardHeader style={styles.valueHeader}>
                  <View style={[styles.valueIcon, { backgroundColor: value.color }]}>
                    {value.icon}
                  </View>
                </CardHeader>
                <CardContent style={styles.valueContent}>
                  <Text style={styles.valueTitle}>{value.title}</Text>
                  <Text style={styles.valueDescription}>{value.description}</Text>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* Team */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meet Our Team</Text>
            <Text style={styles.sectionDescription}>
              Passionate experts dedicated to revolutionizing Indian sports
            </Text>
          </View>

          <View style={styles.teamGrid}>
            {teamMembers.map((member) => (
              <Card key={member.name} style={styles.teamCard}>
                <CardHeader style={styles.teamHeader}>
                  <Image source={{ uri: member.avatar }} style={styles.teamAvatar} />
                </CardHeader>
                <CardContent style={styles.teamContent}>
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                  <Text style={styles.teamBio}>{member.bio}</Text>
                  <View style={styles.teamLocation}>
                    <Ionicons name="location" size={12} color="#6B7280" />
                    <Text style={styles.teamLocationText}>{member.location}</Text>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <LinearGradient
          colors={['#FF6B35', '#059669']}
          style={styles.ctaSection}
        >
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Ready to Join the Revolution?</Text>
            <Text style={styles.ctaDescription}>
              Be part of India's sports transformation. Whether you're an athlete, coach,
              or sports enthusiast, there's a place for you in our mission.
            </Text>
            <View style={styles.ctaButtons}>
              <Button
                title="Start Your Journey"
                onPress={() => {}}
                variant="secondary"
                size="lg"
                style={styles.ctaButton}
              />
              <Button
                title="Partner With Us"
                onPress={() => {}}
                variant="outline"
                size="lg"
                style={styles.ctaButtonOutline}
              />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  culturalPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  patternCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroBadge: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 40,
  },
  heroTitleAccent: {
    color: '#FF6B35',
  },
  heroDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  statIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFF7ED',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  missionSection: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  missionContent: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'center',
    gap: 32,
  },
  missionText: {
    flex: 1,
  },
  missionImageContainer: {
    flex: 1,
    marginTop: isLargeScreen ? 0 : 20,
    width: '100%',
  },
  missionImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  missionButton: {
    alignSelf: 'center',
    marginTop: 24,
  },
  timelineSection: {
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  timelineContainer: {
    alignItems: 'flex-start',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  timelineCardContainer: {
    flex: 1,
    marginVertical: 12,
    marginRight: 20,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timelineCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timelineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineText: {
    flex: 1,
  },
  timelineBadge: {
    marginBottom: 8,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  timelineDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  timelineDot: {
    position: 'absolute',
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    zIndex: 2,
  },
  timelineLine: {
    position: 'absolute',
    right: 7.5,
    height: '100%',
    width: 1,
    backgroundColor: '#D1D5DB',
    zIndex: 1,
  },
  firstTimelineLine: {
    height: '50%',
    top: '50%',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  valueCard: {
    width: isLargeScreen ? '23%' : '47%',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  valueHeader: {
    paddingBottom: 0,
  },
  valueIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  valueContent: {
    alignItems: 'center',
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  teamCard: {
    width: isLargeScreen ? '23%' : '47%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  teamHeader: {
    alignItems: 'center',
    paddingBottom: 0,
  },
  teamAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  teamContent: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  teamRole: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  teamBio: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  teamLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  teamLocationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  ctaSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButtons: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 12,
    width: '100%',
  },
  ctaButton: {
    flex: 1,
  },
  ctaButtonOutline: {
    flex: 1,
    borderColor: '#FFFFFF',
  },
});
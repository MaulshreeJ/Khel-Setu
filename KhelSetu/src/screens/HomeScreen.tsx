import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const { width, height } = Dimensions.get('window');

const AnimatedCard = ({ children, delay = 0, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const PulsingDot = ({ size = 8, color = '#059669' }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    />
  );
};

export default function HomeScreen() {
  const [animatedStats, setAnimatedStats] = useState({
    athletes: 0,
    events: 0,
    tests: 0,
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const floatingCard1Anim = useRef(new Animated.Value(0)).current;
  const floatingCard2Anim = useRef(new Animated.Value(0)).current;
  const heroImageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate statistics with intersection observer simulation
    const animateStats = () => {
      const targetStats = { athletes: 15000, events: 250, tests: 50 };
      const duration = 4000; // 4 seconds as requested
      const steps = 120;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        
        // Smooth easing function for more natural animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedStats({
          athletes: Math.floor(targetStats.athletes * easeOutQuart),
          events: Math.floor(targetStats.events * easeOutQuart),
          tests: Math.floor(targetStats.tests * easeOutQuart),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(targetStats);
        }
      }, stepDuration);

      return interval;
    };

    // Start animation after a small delay
    const timer = setTimeout(() => {
      const interval = animateStats();
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);

    // Floating animations
    const floatingAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingCard1Anim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingCard1Anim, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const floatingAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingCard2Anim, {
          toValue: 8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatingCard2Anim, {
          toValue: -8,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );

    const heroImageAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heroImageAnim, {
          toValue: -5,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(heroImageAnim, {
          toValue: 5,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    floatingAnimation1.start();
    floatingAnimation2.start();
    heroImageAnimation.start();

    return () => {
      clearInterval(interval);
      floatingAnimation1.stop();
      floatingAnimation2.stop();
      heroImageAnimation.stop();
    };
  }, []);

  const sportsCategories = [
    {
      title: "Endurance Tests",
      description: "Cardiovascular fitness assessments",
      icon: "bicycle", // Running/cycling for endurance
      tests: ["12-min Run", "Shuttle Run", "Step Test"],
      gradient: ['#FF6B35', '#FF8A50'],
      iconColor: "#FFFFFF",
    },
    {
      title: "Strength Tests",
      description: "Muscular strength and power evaluation",
      icon: "barbell", // Weightlifting for strength
      tests: ["Push-ups", "Pull-ups", "Vertical Jump"],
      gradient: ['#059669', '#10B981'],
      iconColor: "#FFFFFF",
    },
    {
      title: "Agility Tests",
      description: "Speed and coordination assessments",
      icon: "footsteps", // Movement/footsteps for agility
      tests: ["T-Test", "Cone Drill", "Ladder Drill"],
      gradient: ['#7C3AED', '#8B5CF6'],
      iconColor: "#FFFFFF",
    },
    {
      title: "Flexibility Tests",
      description: "Range of motion evaluations",
      icon: "fitness", // Yoga/stretching for flexibility
      tests: ["Sit & Reach", "Shoulder Mobility", "Hip Flexibility"],
      gradient: ['#EC4899', '#F472B6'],
      iconColor: "#FFFFFF",
    },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)']}
          style={styles.headerGradient}
        >
          <SafeAreaView>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>SportsFit India</Text>
              <TouchableOpacity style={styles.profileButton}>
                <Ionicons name="person-circle" size={32} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={['#FFF7ED', '#FFFFFF', '#F0FDF4']}
          style={styles.heroSection}
        >
          <SafeAreaView>
            <View style={styles.heroContent}>
              <AnimatedCard style={styles.heroText}>
                <Badge variant="secondary" style={styles.heroBadge}>
                  <View style={styles.badgeContent}>
                    <PulsingDot size={6} color="#FF6B35" />
                    <Text style={styles.badgeText}>AI-Powered Sports Assessment</Text>
                  </View>
                </Badge>
                
                <Text style={styles.heroTitle}>
                  Elevate Indian Sports with{'\n'}
                  <Text style={styles.heroTitleAccent}>Smart Assessment</Text>
                </Text>
                
                <Text style={styles.heroDescription}>
                  Comprehensive fitness testing platform designed for Indian athletes. 
                  Track performance, analyze data, and unlock your sporting potential with AI-driven insights.
                </Text>

                <View style={styles.heroButtons}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#FF6B35', '#FF8A50']}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.primaryButtonText}>Start Assessment</Text>
                      <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Watch Demo</Text>
                    <Ionicons name="play-circle-outline" size={20} color="#FF6B35" />
                  </TouchableOpacity>
                </View>

                {/* Animated Statistics */}
                <View style={styles.statsContainer}>
                  {[
                    { value: animatedStats.athletes, label: 'Athletes Assessed', color: '#FF6B35', suffix: '+' },
                    { value: animatedStats.events, label: 'Events Conducted', color: '#059669', suffix: '+' },
                    { value: animatedStats.tests, label: 'Fitness Tests', color: '#7C3AED', suffix: '+' }
                  ].map((stat, index) => (
                    <AnimatedCard key={stat.label} delay={index * 200} style={styles.statItem}>
                      <View style={[styles.statCircle, { borderColor: stat.color }]}>
                        <Text style={[styles.statNumber, { color: stat.color }]}>
                          {stat.value.toLocaleString()}{stat.suffix}
                        </Text>
                      </View>
                      <Text style={styles.statLabel}>{stat.label}</Text>
                    </AnimatedCard>
                  ))}
                </View>
              </AnimatedCard>

              <AnimatedCard delay={600} style={styles.heroImageContainer}>
                <Animated.View
                  style={[
                    styles.heroImageWrapper,
                    { transform: [{ translateY: heroImageAnim }] }
                  ]}
                >
                  <LinearGradient
                    colors={['rgba(255,107,53,0.1)', 'rgba(255,107,53,0.3)']}
                    style={styles.imageGradientOverlay}
                  />
                  <Image
                    source={{ uri: 'https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=Indian+Athletes' }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                </Animated.View>
                
                {/* Enhanced Floating Cards */}
                <Animated.View 
                  style={[
                    styles.floatingCard1, 
                    { transform: [{ translateY: floatingCard1Anim }] }
                  ]}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    style={styles.floatingCardGradient}
                  >
                    <View style={styles.floatingCardContent}>
                      <View style={styles.liveIndicatorContainer}>
                        <Image
                          source={{ uri: 'https://via.placeholder.com/24x24/059669/FFFFFF?text=📊' }}
                          style={styles.cardIcon}
                        />
                        <PulsingDot size={8} color="#059669" />
                      </View>
                      <View>
                        <Text style={styles.floatingCardText}>Live Assessment</Text>
                        <Text style={styles.floatingCardSubtext}>In Progress</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </Animated.View>

                <Animated.View 
                  style={[
                    styles.floatingCard2, 
                    { transform: [{ translateY: floatingCard2Anim }] }
                  ]}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    style={styles.floatingCardGradient}
                  >
                    <View style={styles.floatingCardContent}>
                      <View style={styles.onlineIndicatorContainer}>
                        <Image
                          source={{ uri: 'https://via.placeholder.com/24x24/FF6B35/FFFFFF?text=👥' }}
                          style={styles.cardIcon}
                        />
                        <View style={styles.onlineStatusDot} />
                      </View>
                      <View>
                        <Text style={styles.floatingCardText}>1,247 Athletes</Text>
                        <Text style={styles.floatingCardSubtext}>Online Now</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </Animated.View>
              </AnimatedCard>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Sports Categories */}
        <View style={styles.categoriesSection}>
          <AnimatedCard style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Comprehensive Fitness Testing</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.sectionDescription}>
              Our platform offers a wide range of standardized fitness tests designed 
              specifically for Indian athletes across all sports disciplines.
            </Text>
          </AnimatedCard>

          <View style={styles.categoriesGrid}>
            {sportsCategories.map((category, index) => (
              <AnimatedCard key={category.title} delay={index * 200} style={styles.categoryCardWrapper}>
                <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
                  <LinearGradient
                    colors={category.gradient}
                    style={styles.categoryGradient}
                  >
                    <View style={styles.categoryHeader}>
                      <Animated.View 
                        style={[
                          styles.categoryIcon,
                          {
                            transform: [{
                              rotate: floatingCard1Anim.interpolate({
                                inputRange: [-10, 10],
                                outputRange: ['-5deg', '5deg'],
                              })
                            }]
                          }
                        ]}
                      >
                        <Ionicons 
                          name={category.icon} 
                          size={32} 
                          color={category.iconColor} 
                        />
                      </Animated.View>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                    </View>
                  </LinearGradient>
                  
                  <View style={styles.categoryContent}>
                    <View style={styles.testsList}>
                      {category.tests.map((test, testIndex) => (
                        <View key={test} style={styles.testItem}>
                          <View style={[styles.testDot, { backgroundColor: category.gradient[0] }]} />
                          <Text style={styles.testText}>{test}</Text>
                        </View>
                      ))}
                    </View>
                    
                    <TouchableOpacity style={styles.categoryButton}>
                      <Text style={[styles.categoryButtonText, { color: category.gradient[0] }]}>
                        Start Test
                      </Text>
                      <Ionicons 
                        name="arrow-forward" 
                        size={16} 
                        color={category.gradient[0]} 
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </AnimatedCard>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <AnimatedCard delay={800}>
          <LinearGradient
            colors={['#FF6B35', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaSection}
          >
            <View style={styles.ctaContent}>
              <View style={styles.ctaIconContainer}>
                <Ionicons name="trophy" size={48} color="#FFFFFF" />
              </View>
              
              <Text style={styles.ctaTitle}>
                Ready to Transform Your Athletic Journey?
              </Text>
              <Text style={styles.ctaDescription}>
                Join thousands of Indian athletes who are already using our platform 
                to track, analyze, and improve their performance.
              </Text>
              
              <View style={styles.ctaButtons}>
                <TouchableOpacity style={styles.ctaPrimaryButton}>
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    style={styles.ctaButtonGradient}
                  >
                    <Text style={styles.ctaPrimaryButtonText}>Start Free Assessment</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.ctaSecondaryButton}>
                  <Text style={styles.ctaSecondaryButtonText}>Contact Us</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Decorative elements */}
            <View style={styles.ctaDecorative1} />
            <View style={styles.ctaDecorative2} />
          </LinearGradient>
        </AnimatedCard>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Animated Header
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight || 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileButton: {
    padding: 5,
  },

  // Hero Section
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroText: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  heroBadge: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,107,53,0.1)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    lineHeight: 44,
    textAlign: 'center',
  },
  heroTitleAccent: {
    color: '#FF6B35',
  },
  heroDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
  },
  heroButtons: {
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    maxWidth: 320,
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },

  // Statistics
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 350,
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 85,
    fontWeight: '500',
  },

  // Hero Image
  heroImageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  heroImageWrapper: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  imageGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  heroImage: {
    width: 250,
    height: 320,
    borderRadius: 20,
  },
  floatingCard1: {
    position: 'absolute',
    top: -10,
    left: -20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  floatingCard2: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  floatingCardGradient: {
    padding: 12,
  },
  floatingCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  liveIndicatorContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicatorContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  onlineStatusDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: '#059669',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  floatingCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  floatingCardSubtext: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  onlineIndicator: {
    backgroundColor: 'rgba(255,107,53,0.1)',
    borderRadius: 12,
    padding: 4,
  },

  // Categories Section
  categoriesSection: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F9FAFB',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  categoriesGrid: {
    gap: 20,
  },
  categoryCardWrapper: {
    marginBottom: 4,
  },
  categoryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  categoryGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  categoryContent: {
    padding: 20,
  },
  testsList: {
    gap: 12,
    marginBottom: 20,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  testText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // CTA Section
  ctaSection: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  ctaContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  ctaIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    maxWidth: 300,
  },
  ctaDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  ctaButtons: {
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    maxWidth: 320,
  },
  ctaPrimaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  ctaButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ctaPrimaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  ctaSecondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaSecondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaDecorative1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  ctaDecorative2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bottomSpacing: {
    height: 20,
  },
});
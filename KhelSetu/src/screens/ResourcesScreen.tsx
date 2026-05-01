import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function ResourcesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'grid' },
    { id: 'articles', name: 'Articles', icon: 'document-text' },
    { id: 'videos', name: 'Videos', icon: 'play-circle' },
    { id: 'guides', name: 'Guides', icon: 'book' },
    { id: 'tools', name: 'Tools', icon: 'construct' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Guide to Fitness Testing',
      category: 'guides',
      description: 'A comprehensive guide covering all aspects of fitness assessment for Indian athletes',
      type: 'PDF Guide',
      duration: '45 min read',
      icon: 'book',
      color: '#FF6B35',
      url: 'https://example.com/guide',
    },
    {
      id: 2,
      title: 'Proper Push-Up Technique',
      category: 'videos',
      description: 'Step-by-step video tutorial on correct push-up form and technique',
      type: 'Video Tutorial',
      duration: '8 min',
      icon: 'play-circle',
      color: '#059669',
      url: 'https://example.com/video',
    },
    {
      id: 3,
      title: 'Nutrition for Athletes',
      category: 'articles',
      description: 'Essential nutrition guidelines for optimal athletic performance',
      type: 'Article',
      duration: '12 min read',
      icon: 'document-text',
      color: '#7C3AED',
      url: 'https://example.com/article',
    },
    {
      id: 4,
      title: 'Injury Prevention Checklist',
      category: 'tools',
      description: 'Interactive checklist to help prevent common sports injuries',
      type: 'Interactive Tool',
      duration: '5 min',
      icon: 'construct',
      color: '#6B7280',
      url: 'https://example.com/tool',
    },
    {
      id: 5,
      title: 'Mental Training Techniques',
      category: 'articles',
      description: 'Psychological strategies to enhance athletic performance',
      type: 'Article',
      duration: '15 min read',
      icon: 'document-text',
      color: '#7C3AED',
      url: 'https://example.com/article2',
    },
    {
      id: 6,
      title: 'Recovery and Rest Protocols',
      category: 'guides',
      description: 'Best practices for post-workout recovery and rest periods',
      type: 'PDF Guide',
      duration: '30 min read',
      icon: 'book',
      color: '#FF6B35',
      url: 'https://example.com/guide2',
    },
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const handleResourcePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resources</Text>
          <Text style={styles.headerDescription}>
            Educational content, guides, and tools to help you maximize your athletic potential
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

        {/* Resources Grid */}
        <View style={styles.resourcesGrid}>
          {filteredResources.map((resource) => (
            <Card key={resource.id} style={styles.resourceCard}>
              <CardHeader>
                <View style={styles.resourceHeader}>
                  <View style={[styles.resourceIcon, { backgroundColor: resource.color }]}>
                    <Ionicons name={resource.icon as any} size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceName}>{resource.title}</Text>
                    <Badge variant="outline" style={styles.typeBadge}>
                      <Text style={styles.typeText}>{resource.type}</Text>
                    </Badge>
                  </View>
                </View>
              </CardHeader>
              <CardContent>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                <View style={styles.resourceDetails}>
                  <View style={styles.resourceDetail}>
                    <Ionicons name="time" size={16} color="#6B7280" />
                    <Text style={styles.resourceDetailText}>{resource.duration}</Text>
                  </View>
                  <View style={styles.resourceDetail}>
                    <Ionicons name="folder" size={16} color="#6B7280" />
                    <Text style={styles.resourceDetailText}>{resource.category}</Text>
                  </View>
                </View>
                <Button
                  title="View Resource"
                  onPress={() => handleResourcePress(resource.url)}
                  style={styles.viewButton}
                />
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Quick Links Section */}
        <View style={styles.quickLinksSection}>
          <Card style={styles.quickLinksCard}>
            <CardHeader>
              <Text style={styles.quickLinksTitle}>Quick Links</Text>
              <Text style={styles.quickLinksDescription}>
                Essential resources for athletes and coaches
              </Text>
            </CardHeader>
            <CardContent>
              <View style={styles.quickLinksList}>
                <TouchableOpacity 
                  style={styles.quickLinkItem}
                  onPress={() => handleResourcePress('https://example.com/faq')}
                >
                  <Ionicons name="help-circle" size={20} color="#FF6B35" />
                  <Text style={styles.quickLinkText}>Frequently Asked Questions</Text>
                  <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickLinkItem}
                  onPress={() => handleResourcePress('https://example.com/support')}
                >
                  <Ionicons name="headset" size={20} color="#059669" />
                  <Text style={styles.quickLinkText}>Contact Support</Text>
                  <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickLinkItem}
                  onPress={() => handleResourcePress('https://example.com/community')}
                >
                  <Ionicons name="people" size={20} color="#7C3AED" />
                  <Text style={styles.quickLinkText}>Athlete Community</Text>
                  <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickLinkItem}
                  onPress={() => handleResourcePress('https://example.com/updates')}
                >
                  <Ionicons name="notifications" size={20} color="#6B7280" />
                  <Text style={styles.quickLinkText}>Platform Updates</Text>
                  <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Newsletter Signup */}
        <View style={styles.newsletterSection}>
          <Card style={styles.newsletterCard}>
            <CardHeader>
              <Text style={styles.newsletterTitle}>Stay Updated</Text>
              <Text style={styles.newsletterDescription}>
                Get the latest updates on new features, training tips, and sports science insights.
              </Text>
            </CardHeader>
            <CardContent>
              <Button
                title="Subscribe to Newsletter"
                onPress={() => {}}
                size="lg"
                style={styles.newsletterButton}
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
  resourcesGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  resourceCard: {
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  typeBadge: {
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF6B35',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  resourceDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  resourceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resourceDetailText: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  viewButton: {
    width: '100%',
  },
  quickLinksSection: {
    padding: 20,
  },
  quickLinksCard: {
    backgroundColor: '#F9FAFB',
  },
  quickLinksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  quickLinksDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickLinksList: {
    gap: 12,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  quickLinkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  newsletterSection: {
    padding: 20,
  },
  newsletterCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FF6B35',
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  newsletterDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  newsletterButton: {
    width: '100%',
  },
});

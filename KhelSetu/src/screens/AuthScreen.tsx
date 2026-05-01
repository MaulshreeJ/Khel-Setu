import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

export default function AuthScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      // Handle login
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      Alert.alert('Success', 'Login successful!');
      navigation.goBack();
    } else {
      // Handle signup
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      Alert.alert('Success', 'Account created successfully!');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#FFF7ED', '#FFFFFF', '#F0FDF4']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="trophy" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.logoText}>KhelSetu</Text>
            </View>
            <Text style={styles.headerTitle}>
              {isLogin ? 'Welcome Back!' : 'Join KhelSetu'}
            </Text>
            <Text style={styles.headerDescription}>
              {isLogin 
                ? 'Sign in to continue your fitness journey' 
                : 'Start your athletic assessment journey today'
              }
            </Text>
          </View>
        </LinearGradient>

        {/* Auth Form */}
        <View style={styles.formContainer}>
          <Card style={styles.authCard}>
            <CardHeader>
              <Text style={styles.formTitle}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </Text>
              <Text style={styles.formDescription}>
                {isLogin 
                  ? 'Enter your credentials to access your dashboard' 
                  : 'Fill in your details to get started'
                }
              </Text>
            </CardHeader>
            <CardContent>
              <View style={styles.form}>
                {!isLogin && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="person" size={20} color="#6B7280" />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail" size={20} color="#6B7280" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed" size={20} color="#6B7280" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-off" : "eye"} 
                        size={20} 
                        color="#6B7280" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {!isLogin && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="lock-closed" size={20} color="#6B7280" />
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                        secureTextEntry={!showPassword}
                      />
                    </View>
                  </View>
                )}

                {isLogin && (
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}

                <Button
                  title={isLogin ? 'Sign In' : 'Create Account'}
                  onPress={handleSubmit}
                  size="lg"
                  style={styles.submitButton}
                />

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <Button
                  title={`${isLogin ? 'Sign In' : 'Sign Up'} with Google`}
                  onPress={() => {}}
                  variant="outline"
                  size="lg"
                  icon={<Ionicons name="logo-google" size={20} color="#FF6B35" />}
                  style={styles.googleButton}
                />

                <View style={styles.switchAuth}>
                  <Text style={styles.switchAuthText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </Text>
                  <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.switchAuthLink}>
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Why Choose KhelSetu?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={24} color="#FF6B35" />
              <Text style={styles.featureTitle}>AI-Powered Analytics</Text>
              <Text style={styles.featureDescription}>
                Get detailed insights into your performance
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="people" size={24} color="#059669" />
              <Text style={styles.featureTitle}>Expert Community</Text>
              <Text style={styles.featureDescription}>
                Connect with coaches and athletes
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trophy" size={24} color="#7C3AED" />
              <Text style={styles.featureTitle}>Track Progress</Text>
              <Text style={styles.featureDescription}>
                Monitor your improvement over time
              </Text>
            </View>
          </View>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: '#FF6B35',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    padding: 20,
  },
  authCard: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  formDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  eyeButton: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  googleButton: {
    width: '100%',
  },
  switchAuth: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchAuthText: {
    fontSize: 14,
    color: '#6B7280',
  },
  switchAuthLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 20,
  },
  featureItem: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Updated Import
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);

  const onboardingData = [
    {
      title: "WELCOME TO BOBVIX",
      description: "The ultimate toolkit for modern creators to build, grow, and monetize.",
      icon: "flash", // Matches 'bolt' from your design
      color: "#3c83f6" 
    },
    {
      title: "TURN VIEWS INTO VALUE",
      description: "Your passion deserves a payout. Earn BobVix coins instantly as you engage.",
      icon: "currency-usd", // Fixed icon name
      color: "#ff2d55" 
    },
    {
      title: "EARN WHILE YOU WATCH",
      description: "Your time is valuable. Get rewarded with VixPoints for every minute you spend watching.",
      icon: "play-circle-outline", // Fixed icon name
      color: "#3c83f6" 
    }
  ];

  const currentStep = onboardingData[step - 1];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Styled based on code1.html */}
      <View style={styles.header}>
        <Text style={styles.logo}>BOBVIX</Text>
        <TouchableOpacity onPress={onComplete}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        <View style={[styles.illustration, { backgroundColor: currentStep.color + '20' }]}>
          <MaterialCommunityIcons name={currentStep.icon} size={80} color={currentStep.color} />
        </View>
        <Text style={styles.title}>{currentStep.title}</Text>
        <Text style={styles.description}>{currentStep.description}</Text>
      </View>

      {/* Footer / Controls */}
      <View style={styles.footer}>
        {/* Pagination Dots - Matches your HTML dot logic */}
        <View style={styles.pagination}>
          {[1, 2, 3].map((i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                step === i ? styles.activeDot : null,
                step === i && { backgroundColor: currentStep.color } // Dot matches theme color
              ]} 
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: currentStep.color }]} 
          onPress={() => step < 3 ? setStep(step + 1) : onComplete()}
        >
          <Text style={styles.buttonText}>
            {step === 3 ? "Get Started" : "Next Step"}
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#101722' // background-dark from your design
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 24, 
    paddingTop: 10 
  },
  logo: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18, 
    letterSpacing: 2 
  },
  skip: { 
    color: '#94a3b8', 
    fontSize: 16 
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 30 
  },
  illustration: { 
    width: 160, 
    height: 160, 
    borderRadius: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  title: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15,
    textTransform: 'uppercase'
  },
  description: { 
    color: '#94a3b8', 
    fontSize: 16, 
    textAlign: 'center', 
    lineHeight: 24 
  },
  footer: { 
    padding: 40, 
    alignItems: 'center' 
  },
  pagination: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 30 
  },
  dot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#334155' 
  },
  activeDot: { 
    width: 28, // Expanded dot like in your HTML designs
  },
  button: { 
    width: '100%', 
    height: 60, 
    borderRadius: 16, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});
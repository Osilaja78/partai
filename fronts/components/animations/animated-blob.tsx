import { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const BLOB_SIZE = 250;
const ANIMATION_DURATION = 40000;

export default function BlobBackground({ children }:{children: any}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: ANIMATION_DURATION }),
      -1,
      true
    );
  }, []);

  // Shared animation config
  const createBlobAnimation = (reverse = false) => {
    return useAnimatedStyle(() => {
      const angle = interpolate(
        progress.value,
        [0, 1],
        [0, reverse ? -Math.PI * 2 : Math.PI * 2]
      );

      return {
        transform: [
          { 
            translateX: Math.cos(angle) * BLOB_SIZE / 2 
          },
          { 
            translateY: Math.sin(angle) * BLOB_SIZE / 2 
          },
        ],
      };
    });
  };

  return (
    <View style={styles.container}>
      {/* Background Texture Overlay */}
      <View style={styles.textureOverlay} />

      {/* Blobs Container */}
      <View style={styles.blobsContainer}>
        <Animated.View style={[styles.blob, styles.blobA, createBlobAnimation()]}>
          <LinearGradient
            colors={['#FF4D00', '#FF8C00']}
            style={styles.gradient}
          />
          <BlurView intensity={500} style={styles.blur} />
        </Animated.View>

        <Animated.View style={[styles.blob, styles.blobB, createBlobAnimation(true)]}>
          <LinearGradient
            colors={['#FF4D00', '#FF6D00']}
            style={styles.gradient}
          />
          <BlurView intensity={500} style={styles.blur} />
        </Animated.View>

        <Animated.View style={[styles.blob, styles.blobC, createBlobAnimation()]}>
          <LinearGradient
            colors={['#FF4D00', '#FFA500']}
            style={styles.gradient}
          />
          <BlurView intensity={500} style={styles.blur} />
        </Animated.View>
      </View>

      {/* Content */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  textureOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundImage: 'https://i.imgur.com/PsjPzdO.png',
  },
  blobsContainer: {
    width: BLOB_SIZE,
    height: BLOB_SIZE,
    position: 'absolute',
    top: height / 2 - BLOB_SIZE / 2,
    left: width / 2 - BLOB_SIZE / 2,
  },
  blob: {
    width: BLOB_SIZE,
    height: BLOB_SIZE,
    borderRadius: BLOB_SIZE / 2,
    position: 'absolute',
    overflow: 'hidden',
    filter: 'blur(80px)',
  },
  gradient: {
    flex: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  blobA: {
    opacity: 0.8,
  },
  blobB: {
    opacity: 0.6,
  },
  blobC: {
    opacity: 0.4,
  },
});
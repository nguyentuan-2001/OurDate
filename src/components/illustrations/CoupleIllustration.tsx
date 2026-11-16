import { StyleSheet, Text, View } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';

/** Minh hoạ chibi 2 người — chuyển thể từ src/UI/home.html (viewBox gốc 0 0 140 100). */
export function CoupleIllustration() {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.heart, styles.heart1]}>♥</Text>
      <Text style={[styles.heart, styles.heart2]}>♥</Text>
      <Text style={[styles.heart, styles.heart3]}>♥</Text>
      <Svg height={96} viewBox="0 0 140 100" width={128}>
        <Path
          d="M15 95 C15 78 30 74 46 76 C55 77 62 82 66 95 Z"
          fill="#FDFBF9"
          stroke="#4A2525"
          strokeWidth={1.8}
        />
        <Path
          d="M58 95 C62 76 75 72 98 74 C110 76 118 84 122 95 Z"
          fill="#FFFFFF"
          stroke="#4A2525"
          strokeWidth={1.8}
        />
        <Path
          d="M22 45 C20 62 34 72 48 71 C60 70 65 60 64 45 C64 36 54 34 44 34 C32 34 22 36 22 45 Z"
          fill="#FFEDE3"
        />
        <Path
          d="M18 42 C16 28 26 15 45 15 C60 15 68 25 66 38 C64 39 58 35 52 38 C46 32 38 32 32 37 C27 35 21 38 18 42 Z"
          fill="#583A2E"
          stroke="#3D251D"
          strokeWidth={1.6}
        />
        <Path
          d="M26 34 C30 42 36 43 40 40 C43 45 52 44 58 37"
          stroke="#3D251D"
          strokeLinecap="round"
          strokeWidth={1.6}
          fill="none"
        />
        <Ellipse cx={36} cy={51} fill="#3D251D" rx={2} ry={3} />
        <Ellipse cx={52} cy={50} fill="#3D251D" rx={2} ry={3} />
        <Path d="M42 57 Q45 60 48 57" stroke="#3D251D" strokeLinecap="round" strokeWidth={1.2} fill="none" />
        <Ellipse cx={32} cy={54} fill="#FFA5BA" opacity={0.6} rx={4} ry={2} />
        <Ellipse cx={56} cy={53} fill="#FFA5BA" opacity={0.6} rx={4} ry={2} />
        <Path d="M68 45 C65 65 68 85 74 92 C96 95 116 88 120 70 C124 55 120 40 115 32 Z" fill="#694334" />
        <Path
          d="M72 46 C70 64 85 73 98 71 C109 69 114 58 112 46 C112 36 102 33 93 33 C82 33 72 36 72 46 Z"
          fill="#FFF0E6"
        />
        <Path
          d="M68 40 C67 25 80 18 97 18 C114 18 122 28 120 44 C117 41 112 38 106 42 C100 35 90 35 84 41 C80 37 72 38 68 40 Z"
          fill="#694334"
          stroke="#48271C"
          strokeWidth={1.6}
        />
        <Path d="M71 44 Q70 62 76 72" stroke="#48271C" strokeLinecap="round" strokeWidth={1.5} fill="none" />
        <Path
          d="M117 42 Q119 60 115 72"
          stroke="#48271C"
          strokeLinecap="round"
          strokeWidth={1.5}
          fill="none"
        />
        <Path d="M83 50 Q87 46 91 50" stroke="#3D251D" strokeLinecap="round" strokeWidth={1.8} fill="none" />
        <Path
          d="M100 49 Q104 45 108 49"
          stroke="#3D251D"
          strokeLinecap="round"
          strokeWidth={1.8}
          fill="none"
        />
        <Path d="M92 57 Q96 61 100 57" stroke="#E6536C" strokeLinecap="round" strokeWidth={1.5} fill="none" />
        <Ellipse cx={82} cy={54} fill="#FFA5BA" opacity={0.8} rx={4.5} ry={2.2} />
        <Ellipse cx={108} cy={53} fill="#FFA5BA" opacity={0.8} rx={4.5} ry={2.2} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 144,
    height: 96,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  heart: {
    position: 'absolute',
    color: '#FF6F91',
  },
  heart1: { top: 8, right: 80, fontSize: 11, transform: [{ rotate: '-12deg' }] },
  heart2: { top: -2, right: 32, fontSize: 15 },
  heart3: { top: 12, right: 2, fontSize: 9, color: '#FF8FAB' },
});

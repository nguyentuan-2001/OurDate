import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';

/** Mèo ôm trái tim — chuyển thể từ src/UI/AI.html (viewBox gốc 0 0 120 120). */
export function CatHeartIllustration() {
  return (
    <View style={{ width: 96, height: 96 }}>
      <Svg height={96} viewBox="0 0 120 120" width={96}>
        <Defs>
          <LinearGradient id="heartGrad" x1="0%" x2="100%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF8DA8" />
            <Stop offset="100%" stopColor="#FF527B" />
          </LinearGradient>
          <RadialGradient cx="50%" cy="50%" id="blushGrad" r="50%">
            <Stop offset="0%" stopColor="#FF9EAA" stopOpacity={0.8} />
            <Stop offset="100%" stopColor="#FF9EAA" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Path
          d="M28,45 L15,15 Q30,22 45,28 Z"
          fill="#FFFFFF"
          stroke="#4A1525"
          strokeLinejoin="round"
          strokeWidth={2.5}
        />
        <Path d="M25,40 L18,20 Q28,25 38,30 Z" fill="#FFCCD8" />
        <Path
          d="M72,28 Q87,22 102,15 L89,45 Z"
          fill="#FFFFFF"
          stroke="#4A1525"
          strokeLinejoin="round"
          strokeWidth={2.5}
        />
        <Path d="M79,30 Q89,25 99,20 L92,40 Z" fill="#FFCCD8" />
        <Ellipse cx={58} cy={52} fill="#FFFFFF" rx={42} ry={34} stroke="#4A1525" strokeWidth={2.5} />
        <Path d="M38,48 Q44,43 50,48" fill="none" stroke="#4A1525" strokeLinecap="round" strokeWidth={2.8} />
        <Path d="M66,48 Q72,43 78,48" fill="none" stroke="#4A1525" strokeLinecap="round" strokeWidth={2.8} />
        <Circle cx={34} cy={56} fill="url(#blushGrad)" r={8} />
        <Circle cx={82} cy={56} fill="url(#blushGrad)" r={8} />
        <Circle cx={58} cy={53} fill="#FF6F91" r={2} />
        <Path d="M54,56 Q58,60 62,56" fill="none" stroke="#4A1525" strokeLinecap="round" strokeWidth={2} />
        <G transform="translate(18, 52)">
          <Path
            d="M40,24 C40,24 22,0 8,14 C-4,26 4,44 40,66 C76,44 84,26 72,14 C58,0 40,24 40,24 Z"
            fill="url(#heartGrad)"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
          <Ellipse
            cx={14}
            cy={32}
            fill="#FFFFFF"
            rx={9}
            ry={8}
            stroke="#4A1525"
            strokeWidth={2}
            transform="rotate(-20 14 32)"
          />
          <Ellipse
            cx={66}
            cy={32}
            fill="#FFFFFF"
            rx={9}
            ry={8}
            stroke="#4A1525"
            strokeWidth={2}
            transform="rotate(20 66 32)"
          />
        </G>
        <Path d="M102,12 Q103,16 107,17 Q103,18 102,22 Q101,18 97,17 Q101,16 102,12 Z" fill="#FFAEC0" />
      </Svg>
    </View>
  );
}

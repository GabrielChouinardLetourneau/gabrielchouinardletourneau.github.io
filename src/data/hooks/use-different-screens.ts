import { useWindowDimensions } from "react-native";

export function useIsLargeScreen() {
  const { width } = useWindowDimensions();
  const isBigScreen = width >= 1100; // Optional: for very large screens like desktops
  const isLargeScreen = width >= 768; 
  const isMediumScreen = width >= 600 && width < 768; // Optional: for medium screens like large phones/small tablets
  const isSmallScreen = width < 600; // Optional: for small phones
  
  return { isBigScreen, isLargeScreen, isMediumScreen, isSmallScreen };
}

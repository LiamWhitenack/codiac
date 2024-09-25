import { Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ScreenSizing {
  screenHeight: number;
  screenWidth: number;
  maxHeight: number;
  maxWidth: number;
  isMobile: boolean;
  keyboardMargin: number;
  keyboardKeyGap: number;
  keyboardKeyWidth: number;
  keyboardHeight: number;

  constructor() {
    this.screenHeight = screenHeight;
    this.screenWidth = screenWidth;

    this.keyboardMargin = Math.floor(screenWidth * 0.05);
    this.keyboardKeyGap = Math.floor(screenWidth * 0.0075);
    this.keyboardKeyWidth = Math.floor(
      (screenWidth - this.keyboardMargin * 2 - this.keyboardKeyGap * 18) / 10
    );
    this.keyboardHeight = this.keyboardMargin * 6 + 150;

    this.maxHeight = Math.min(screenHeight, 600);
    this.maxWidth = Math.min(screenWidth, 600);
    this.isMobile = Platform.OS === "ios" || Platform.OS === "android";
  }
}

const sizing = new ScreenSizing();
export default sizing;

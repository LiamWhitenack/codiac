import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import sizing from "./sizing";

function getKeyByValue<T extends Map<string, string>>(
  map: T,
  value: string
): string {
  // Get array of object values
  const values = Array.from(map.values());

  // Find the index of the target value
  const index = values.indexOf(value);
  // If the value is found
  if (index != -1) {
    // Get array of object keys
    const keys = Array.from(map.keys());
    // Return the key at the same index
    return keys[index];
  }
  // If value is not found, return null or handle accordingly
  throw Error();
}

interface WordDisplayProps {
  quote: string[];
  decodingMap: Map<string, string>;
  setDecodingMap: (newMap: Map<string, string>) => void;
  showSpaces: boolean;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}

const QuoteDisplay: React.FC<WordDisplayProps> = ({
  quote,
  decodingMap,
  setDecodingMap,
  showSpaces,
  activeIcon,
  setActiveIcon,
}) => {
  const numIconsInRow = Math.floor(Math.sqrt(quote.length));
  const iconSize = (sizing.maxWidth / (15 * numIconsInRow)) * 10;
  const display_quote = quote
    .map((element) => {
      const decoded = decodingMap.get(element);
      return decoded !== undefined ? decoded : element;
    })
    .map((element) => {
      if (element == " " && showSpaces) {
        return (
          <Ionicons
            name={"bluetooth"}
            size={iconSize}
            style={styles.spaceIconStyle}
          />
        );
      } else if (element.length == 1) {
        return (
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              height: iconSize,
              width: iconSize,
            }}
          >
            <TouchableOpacity>
              {
                <Text
                  style={{ fontSize: iconSize }}
                  onPress={() => {
                    setActiveIcon(element);
                    decodingMap = new Map(decodingMap);
                    const keyOfElement = getKeyByValue(decodingMap, element);
                    const removed = decodingMap.delete(keyOfElement);
                    if (!removed) {
                      throw Error();
                    }
                    console.log(1);
                    setDecodingMap(decodingMap);
                  }}
                >
                  {element}
                </Text>
              }
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <Ionicons
            // @ts-ignore
            name={element}
            size={iconSize}
            color={element == activeIcon ? "blue" : "black"}
            onPress={() => {
              if (activeIcon == element) {
                setActiveIcon("");
              } else {
                setActiveIcon(element);
              }
            }}
          />
        );
      }
    });

  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {display_quote.map((element, index) => (
          // <View style={iconContainer.style}>
          <TouchableOpacity key={index}>{element}</TouchableOpacity>
          // </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: "black",
  },
  spaceIconStyle: {
    color: "transparent",
  },

  verticalContainer: {
    flex: 3,
    flexDirection: "column",
    alignContent: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  horizontalContainer: {
    maxWidth: sizing.maxWidth * 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  quote: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default QuoteDisplay;

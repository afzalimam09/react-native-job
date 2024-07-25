import React from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";

interface CustomBtnProp {
    title: string;
    handlePress: () => void;
    containerStyles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
    isLoading?: boolean;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: CustomBtnProp) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={[
                styles.container,
                containerStyles,
                isLoading && styles.loading,
            ]}
            disabled={isLoading}
        >
            <Text style={[styles.text, textStyles]}>{title}</Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    style={styles.indicator}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#secondary",
        borderRadius: 15,
        minHeight: 62,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#primary",
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
    },
    indicator: {
        marginLeft: 8,
    },
    loading: {
        opacity: 0.5,
    },
});

export default CustomButton;

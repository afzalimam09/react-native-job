import {
    View,
    ActivityIndicator,
    Dimensions,
    Platform,
    StyleSheet,
} from "react-native";

const Loader = ({ isLoading }: { isLoading: Boolean }) => {
    const osName = Platform.OS;
    const screenHeight = Dimensions.get("screen").height;

    if (!isLoading) return null;

    return (
        <View style={[styles.container, { height: screenHeight }]}>
            <ActivityIndicator
                // @ts-ignore
                animating={isLoading}
                color="#fff"
                size={osName === "ios" ? "large" : 50}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "rgba(22, 22, 34, 0.6)",
        zIndex: 10,
    },
});

export default Loader;

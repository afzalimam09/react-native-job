import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import images from "../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Image
                        source={images.logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Image
                        source={images.cards}
                        style={styles.cards}
                        resizeMode="contain"
                    />

                    <View style={styles.relativeView}>
                        <Text style={styles.titleText}>
                            Discover Endless{"\n"}
                            Possibilities with{" "}
                            <Text style={styles.secondaryText}>Lokal</Text>
                        </Text>

                        <Image
                            source={images.path}
                            style={styles.pathImage}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.descriptionText}>
                        Turning Ambitions into Achievements: Start Your Career
                        Journey Here
                    </Text>

                    <CustomButton
                        title="Continue Job Search"
                        handlePress={() => router.push("/jobs")}
                        containerStyles={styles.buttonContainer}
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: "#161622",
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 16,
    },
    logo: {
        width: 200,
        height: 84,
    },
    cards: {
        maxWidth: 380,
        width: "100%",
        height: 250,
    },
    relativeView: {
        position: "relative",
        marginTop: 20,
    },
    titleText: {
        fontSize: 30,
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
        textAlign: "center",
    },
    secondaryText: {
        color: "#FF8E01",
    },
    pathImage: {
        width: 136,
        height: 15,
        position: "absolute",
        bottom: -8,
        right: -32,
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#CDCDE0",
        marginTop: 28,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        marginTop: 28,
        backgroundColor: "#FF8E01",
    },
});

export default Welcome;

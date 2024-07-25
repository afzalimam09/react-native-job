import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

import images from "../constants/images";
import CustomButton from "./CustomButton";

interface EmptyStateProp {
    title: string;
    subtitle: string;
    btnTitle: string;
    routePath: string;
}

const EmptyState = ({
    title,
    subtitle,
    btnTitle,
    routePath,
}: EmptyStateProp) => {
    return (
        <View style={styles.container}>
            <Image
                source={images.empty}
                resizeMode="contain"
                style={styles.image}
            />

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <CustomButton
                title={btnTitle}
                handlePress={() => router.push(routePath)}
                containerStyles={styles.buttonContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    image: {
        width: 270,
        height: 216,
    },
    title: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        color: "#CDCDE0",
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF",
        marginTop: 8,
    },
    buttonContainer: {
        width: "100%",
        marginVertical: 20,
        backgroundColor: "#FF8E01",
    },
});

export default EmptyState;

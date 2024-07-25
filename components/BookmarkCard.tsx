import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { removeBookmark } from "@/lib/bookmark";

const BookmarkCard = ({
    job,
    setRemoveFlag,
}: {
    job: any;
    setRemoveFlag: any;
}) => {
    const router = useRouter();
    const navigation = useNavigation<any>();

    if (!job.title) return null;

    const handleRemoveBookmark = async () => {
        await removeBookmark(job.id);
        setRemoveFlag((prev: boolean) => !prev);
    };

    const handleViewDetails = () => {
        navigation.navigate("JobDetail", { job });
    };

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: job?.creatives[0]?.file }}
                style={styles.image}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {job?.title?.substring(0, 50)}...
                </Text>
                <Text style={styles.location}>
                    Location: {job?.primary_details?.Place}
                </Text>
                {job.primary_details.Salary !== "-" && (
                    <Text style={styles.salary}>
                        Salary: {job?.primary_details?.Salary}
                    </Text>
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleViewDetails}
                    >
                        <Text style={styles.buttonText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.bookmarkButton]}
                        onPress={handleRemoveBookmark}
                    >
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1E1E2D",
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF", // text-white
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#CDCDE0", // text-gray-100
        marginBottom: 8,
    },
    salary: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#FF9C01", // secondary color
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#FF9C01", // secondary color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 4,
    },
    bookmarkButton: {
        backgroundColor: "#ff4848",
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF",
    },
});

export default BookmarkCard;

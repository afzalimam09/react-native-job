import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { saveBookmark, removeBookmark, isBookmarked } from "@/lib/bookmark";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const JobCard = ({ job }: { job: any }) => {
    if (!job.title) return null;

    const navigation = useNavigation<any>();
    const [bookmarked, setBookmarked] = useState<boolean>(false);

    const checkBookmarkStatus = async () => {
        const isBookmarkedStatus = await isBookmarked(job.id);
        setBookmarked(isBookmarkedStatus);
    };

    useFocusEffect(
        useCallback(() => {
            checkBookmarkStatus();
        }, [job.id])
    );

    const handleBookmark = async () => {
        try {
            if (bookmarked) {
                await removeBookmark(job.id);
                setBookmarked(false);
                Alert.alert("Removed from bookmarks");
            } else {
                await saveBookmark(job);
                setBookmarked(true);
                Alert.alert("Added to bookmarks");
            }
        } catch (error) {
            console.error("Error handling bookmark:", error);
            Alert.alert(
                "Error",
                "There was an issue with the bookmark action."
            );
        }
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
                        style={[
                            styles.button,
                            bookmarked
                                ? styles.bookmarkButtonRemove
                                : styles.bookmarkButton,
                        ]}
                        onPress={handleBookmark}
                    >
                        <Text style={styles.buttonText}>
                            {!bookmarked ? "Bookmark" : "Remove"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1E1E2D", // black-100
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
        color: "#FFFFFF",
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#CDCDE0",
        marginBottom: 8,
    },
    salary: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#FF9C01",
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#FF9C01",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 4,
    },
    bookmarkButton: {
        backgroundColor: "#00c5b5",
    },
    bookmarkButtonRemove: {
        backgroundColor: "#ff4848",
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF",
    },
});

export default JobCard;

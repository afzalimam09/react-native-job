import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ScrollView,
    Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { isBookmarked, removeBookmark, saveBookmark } from "@/lib/bookmark";
import { useFocusEffect } from "expo-router";

const JobDetailScreen = () => {
    const route = useRoute<any>();
    const { job } = route.params;

    const [bookmarked, setBookmarked] = useState<boolean>(false);

    const checkBookmarkStatus = async () => {
        const isBookmarkedStatus = await isBookmarked(job.id);
        setBookmarked(isBookmarkedStatus);
    };

    useFocusEffect(
        useCallback(() => {
            checkBookmarkStatus();
        }, [bookmarked])
    );

    const handleCall = () => {
        Linking.openURL(`tel:${job.contact_preference.whatsapp_no}`);
    };

    const handleWhatsApp = () => {
        Linking.openURL(job.contact_preference.whatsapp_link);
    };

    const handleBookmark = async () => {
        try {
            if (bookmarked) {
                await removeBookmark(job.id);
                setBookmarked(false);
            } else {
                await saveBookmark(job);
                setBookmarked(true);
            }
        } catch (error) {
            console.error("Error handling bookmark:", error);
            Alert.alert(
                "Error",
                "There was an issue with the bookmark action."
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.jobType}>
                        {job.primary_details.Job_Type}
                    </Text>
                    <Image
                        source={{ uri: job.creatives[0]?.file }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Job Details</Text>
                    <Text style={styles.detail}>
                        Location: {job.primary_details.Place}
                    </Text>
                    <Text style={styles.detail}>
                        Salary: {job.primary_details.Salary}
                    </Text>
                    <Text style={styles.detail}>
                        Experience: {job.primary_details.Experience}
                    </Text>
                    <Text style={styles.detail}>
                        Qualification: {job.primary_details.Qualification}
                    </Text>
                    <Text style={styles.detail}>Job Role: {job.job_role}</Text>
                    <Text style={styles.detail}>
                        Job Hours: {job.job_hours}
                    </Text>
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.callButton]}
                        onPress={handleCall}
                    >
                        <Text style={styles.btnText}>📞 Call HR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.whatsAppButton]}
                        onPress={handleWhatsApp}
                    >
                        <Text style={styles.btnText}>💬 WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            bookmarked
                                ? styles.bookmarkButtonRemove
                                : styles.bookmarkButton,
                        ]}
                        onPress={handleBookmark}
                    >
                        <Text style={styles.btnText}>
                            ⭐ {bookmarked ? "Remove" : "Bookmark"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#161622",
        height: "100%",
        color: "#E5E7EB",
    },
    header: {
        padding: 16,
        marginTop: 15,
        borderBottomColor: "#E5E7EB",
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF",
        marginBottom: 8,
    },
    jobType: {
        fontSize: 16,
        color: "#9CA3AF",
        paddingBottom: 8,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginVertical: 8,
    },
    detailsContainer: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#E5E7EB",
        marginBottom: 8,
    },
    detail: {
        fontSize: 16,
        color: "#9CA3AF",
        fontFamily: "Poppins-Regular",
        marginBottom: 4,
    },
    actionsContainer: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
    },
    btn: {
        padding: 12,
        borderRadius: 8,
    },
    btnText: {
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF",
        fontSize: 14,
    },
    callButton: {
        backgroundColor: "#10B981",
    },
    whatsAppButton: {
        backgroundColor: "#10B981",
    },
    bookmarkButton: {
        backgroundColor: "#F59E0B",
    },
    bookmarkButtonRemove: {
        backgroundColor: "#ff3535",
    },
});

export default JobDetailScreen;

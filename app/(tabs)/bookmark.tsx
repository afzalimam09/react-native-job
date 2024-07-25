import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View, StyleSheet } from "react-native";

import images from "@/constants/images";
import EmptyState from "@/components/EmptyState";
import BookmarkCard from "@/components/BookmarkCard";
import { getBookmarks } from "@/lib/bookmark";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Bookmarks = () => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState<any[]>([]);
    const [removeFlag, setRemoveFlag] = useState<boolean>(false);

    const fetchBookmarkedJobs = async () => {
        const jobs = await getBookmarks();
        setBookmarkedJobs(jobs);
    };

    useFocusEffect(
        useCallback(() => {
            fetchBookmarkedJobs();
        }, [removeFlag])
    );

    const renderFooter = () => {
        if (bookmarkedJobs.length > 0) {
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>No more jobs to load</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={bookmarkedJobs}
                keyExtractor={(item: any, index: number) =>
                    item.id ? item.id : index
                }
                renderItem={({ item }) => (
                    <BookmarkCard job={item} setRemoveFlag={setRemoveFlag} />
                )}
                ListHeaderComponent={() => (
                    <View style={styles.headerContainer}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.welcomeText}>
                                    Welcome Back
                                </Text>
                                <Text style={styles.userNameText}>
                                    Lokal Jobs
                                </Text>
                            </View>

                            <View style={styles.logoContainer}>
                                <Image
                                    source={images.logoSmall}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <Text style={styles.latestJobsText}>
                            Your Bookmark Jobs
                        </Text>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Jobs Found"
                        subtitle="No jobs found in bookmark"
                        btnTitle="Go to Job Search"
                        routePath="/jobs"
                    />
                )}
                ListFooterComponent={renderFooter}
            />
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#161622",
        height: "100%",
    },
    headerContainer: {
        marginVertical: 24,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    welcomeText: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: "#CDCDE0",
    },
    userNameText: {
        fontSize: 24,
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF",
    },
    logoContainer: {
        marginTop: 6,
    },
    logo: {
        width: 36,
        height: 40,
    },
    latestJobsText: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "#CDCDE0",
    },
    footer: {
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: "#CDCDE0",
    },
});

export default Bookmarks;

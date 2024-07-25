import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    FlatList,
    Image,
    RefreshControl,
    Text,
    View,
    StyleSheet,
} from "react-native";

import images from "../../constants/images";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import useApiCall from "@/lib/useApiCall";
import { getJobs } from "@/lib/apiCall";
import { StatusBar } from "expo-status-bar";

const Jobs = () => {
    const {
        data: latestJobs,
        loading,
        loadMore,
        hasMore,
        refetch,
    } = useApiCall(getJobs);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    };

    const renderFooter = () => {
        if (!hasMore) {
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
            <Loader isLoading={loading} />
            <FlatList
                data={latestJobs}
                keyExtractor={(item: any, index: number) =>
                    item.id ? item.id : index
                }
                renderItem={({ item }) => <JobCard job={item} />}
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

                        <Text style={styles.latestJobsText}>Latest Jobs</Text>
                    </View>
                )}
                ListEmptyComponent={() =>
                    !loading && (
                        <EmptyState
                            title="No Jobs Found"
                            subtitle="No jobs available yet"
                            btnTitle="Close App"
                            routePath="-1"
                        />
                    )
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
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

export default Jobs;

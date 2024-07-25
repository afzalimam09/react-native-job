import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/TabBarIcon";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 80,
                    paddingBottom: 15,
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="jobs"
                options={{
                    title: "Jobs",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "mail" : "mail-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bookmark"
                options={{
                    title: "Bookmark",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "bookmark" : "bookmark-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

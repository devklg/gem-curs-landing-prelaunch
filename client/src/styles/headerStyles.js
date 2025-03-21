// Header Style Versions
export const headerStyles = {
    v1: {
        container: "w-full bg-white shadow-sm",
        innerContainer: "container mx-auto px-4 py-4",
        flexContainer: "flex items-center justify-between",
        titleContainer: "flex items-center",
        title: "text-xl font-bold text-gray-800",
        logoContainer: "flex items-center",
        logo: "h-8 w-auto"
    },
    v2: {
        container: "w-full bg-white shadow-md",
        innerContainer: "container mx-auto px-6 py-6",
        flexContainer: "flex items-center justify-between",
        titleContainer: "flex items-center",
        title: "text-2xl font-bold text-gray-800 tracking-wide",
        logoContainer: "flex items-center",
        logo: "h-10 w-auto"
    },
    v3: {
        container: "w-full bg-gradient-to-r from-white to-gray-50 shadow-lg",
        innerContainer: "container mx-auto px-8 py-8",
        flexContainer: "flex items-center justify-between",
        titleContainer: "flex items-center",
        title: "text-3xl font-bold text-gray-800 tracking-wide",
        logoContainer: "flex items-center",
        logo: "h-12 w-auto"
    },
    v4: {
        container: "w-full bg-[#0B1423] py-4",
        innerContainer: "container mx-auto px-8",
        flexContainer: "flex items-center justify-between",
        titleContainer: "flex flex-col",
        mainTitle: "text-[#00A0DC] text-4xl font-bold",
        subTitle: "text-xl text-gray-300 mt-1",
        teamText: "text-[#FF6B00] mx-2",
        logoContainer: "flex items-center min-w-[300px] justify-end",
        logoText: "text-4xl font-bold",
        logoTextTalk: "text-[#00A0DC]",
        logoTextFusion: "text-[#FF6B00]"
    }
};

// Current version being used
export const currentVersion = 'v4'; 
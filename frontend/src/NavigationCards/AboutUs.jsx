import React from "react";
import { Film, Clapperboard, MapPin, Users, Globe, CheckCircle, Star, Award, Camera, Video } from "lucide-react";
import Logo1 from "/src/assets/Logo1.png";
import Navbar from "../Components/Navbar";
import ContactUs from "./ContactUs";

export default function AboutUs() {
    const legends = [
        "Ashok Kumar", "Shatrughan Sinha", "Manoj Bajpayee", "Pankaj Tripathi", "Kumkum",
        "Chitragupt", "Vishwanath Prasad Sahabadi", "Shivendra Sinha", "Shailendra",
        "Girish Ranjan", "Prakash Jha", "Kunal Singh", "Akhilendra Mishra", "Neeraj Pandey",
        "Sanjay Mishra", "Pankaj Jha", "Vineet Kumar", "Vinay Pathak", "Manoj Tiwari"
    ];

    const objectives = [
        "Promote Bihar as a vibrant filmmaking hub",
        "Strengthen regional cinema (Bhojpuri, Maithili, Magahi)",
        "Streamline film permissions through a single-window clearance system",
        "Encourage investment in film infrastructure and skill development",
        "Facilitate a transparent and efficient subsidy framework"
    ];

    const subsidies = [
        {
            title: "Feature Films",
            desc: "Grants up to ₹4 crore if 75% of the film is shot in Bihar.",
            icon: <Film className="w-8 h-8 text-white" />
        },
        {
            title: "Television Serials / Shows",
            desc: "Subsidy up to ₹1 crore, or 25% of production cost, for a minimum of 90 days of shooting within the state.",
            icon: <Video className="w-8 h-8 text-white" />
        },
        {
            title: "Web Series / OTT Content",
            desc: "Up to ₹3 crore, or 25% of production cost, for a minimum of 60 days (or 70% of total days) of shooting in Bihar.",
            icon: <Globe className="w-8 h-8 text-white" />
        },
        {
            title: "Infrastructure Development",
            desc: "Projects investing ₹2 crore or more can avail a grant up to ₹1.5 crore or 25% of total investment.",
            icon: <MapPin className="w-8 h-8 text-white" />
        }
    ];

    const successStories = [
        "Songhatiya (Ugratara Films)",
        "The Long Journey Home (AVARTS Ltd., Mauritius)",
        "Bihar Ka Jalwa (Prabuddh Entertainment)",
        "Life Leela (Aim Apex International – Web Series)",
        "Chatth (Champaran Talkies Pvt. Ltd.)",
        "Pain Brush (Daivarya Media & Entertainment Pvt. Ltd.)",
        "Bihaan (Insight India)",
        "Magadh Putra (Gunjan Singh Entertainment)",
        "Echos of the Absent and Akhri Lesson (Kartina Entertainment & Sports Pvt. Ltd.)"
    ];

    const locations = [
        { title: "Barabar Hills", dist: "Jehanabad", img: "/BarabarHills.jpeg" },
        { title: "Gridhakut Hills", dist: "Rajgir", img: "/GridhakutHills.jpg" },
        { title: "Valmiki Tiger Reserve", dist: "West Champaran", img: "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2024/03/09/2681300-valmiki-tiger-reserve.jpg?im=Resize=(1200,900)" },
        { title: "Sher Shah Suri Tomb", dist: "Sasaram", img: "/SherShahSuriTomb.jpg" },
        { title: "Ruins of Vikramshila", dist: "Bhagalpur", img: "/Ruins of Vikramshila.jpg" },
        { title: "Tutla Bhawani", dist: "Rohtas", img: "/TutlaBhawaniWaterfall.png" },
    ];

    return (
        <div className="min-h-screen bg-white font-sans border ">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-[#a92b4e] py-24 px-4 text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/bannerBihar.png" alt="Bihar Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#a92b4e]/90"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <img src={Logo1} alt="Bihar Film Nigam" className="h-28 mx-auto mb-8 drop-shadow-xl" />
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                        Bihar: The Emerging Powerhouse of Indian Cinema
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-yellow-100 max-w-4xl mx-auto">
                        A land of rich heritage, iconic legends, and untold stories waiting to be captured.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">

                {/* Legends Section */}
                <div className="text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#891737]">Legends from Bihar</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                        Bihar has been home to some of the most iconic personalities who have shaped Indian film history.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {legends.map((legend, idx) => (
                            <span key={idx} className="px-4 py-2 bg-gray-100 text-[#a92b4e] rounded-full text-sm md:text-base font-medium hover:bg-[#a92b4e] hover:text-white transition-colors duration-300 shadow-sm border border-gray-200">
                                {legend}
                            </span>
                        ))}
                    </div>
                </div>

                {/* BSFDFC Section - Professional & Distinct */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 md:p-16 shadow-lg border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#a92b4e]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-800 mb-8">BSFDFC: Nurturing Bihar’s Cinematic Legacy</h2>
                        <p className="text-gray-600 leading-relaxed text-xl mb-6">
                            The Bihar State Film Development and Finance Corporation Ltd. (BSFDFC) continues to strengthen this legacy by promoting film culture and incentivizing regional cinema. Through landmark initiatives such as the Bihar Film Conclave, the Corporation provides a dynamic platform for national and international filmmakers.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-xl">
                            By fostering a creative and supportive ecosystem, BSFDFC is redefining Bihar’s cinematic identity — encouraging filmmakers to discover the state’s untold narratives, while simultaneously empowering local talent and technicians.
                        </p>
                    </div>
                </div>

                {/* Mission & Vision - Side by side, no icons */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Vision */}
                    <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-5 hover:scale-[1.01] transition-transform duration-300">
                        <img
                            src="/vision.png"
                            alt="Vision"
                            className="w-40 h-40 md:w-48 md:h-48 object-contain flex-shrink-0"
                        />
                        <div className="text-left">
                            <h3 className="text-xl font-semibold text-[#a92b4e] mb-2">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                                To transform Bihar into a prominent film destination, utilizing the power of cinema for cultural preservation and public awareness.
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-5 hover:scale-[1.01] transition-transform duration-300">
                        <img
                            src="/mission.png"
                            alt="Mission"
                            className="w-40 h-40 md:w-48 md:h-48 object-contain flex-shrink-0"
                        />
                        <div className="text-left">
                            <h3 className="text-xl font-semibold text-[#a92b4e] mb-2">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                                To foster excellence in cinema, promote the diversity of Indian culture, and facilitate a hassle-free filmmaking experience in Bihar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Objectives */}
                <div className="bg-white">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Key Objectives</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {objectives.map((obj, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="p-2 bg-[#a92b4e]/10 rounded-full shrink-0">
                                    <CheckCircle className="w-6 h-6 text-[#a92b4e]" />
                                </div>
                                <p className="text-gray-700 font-medium">{obj}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subsidy Structure */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Subsidy Structure & Incentives</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {subsidies.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
                                <div className="w-14 h-14 bg-[#a92b4e] rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Stories & Regional Cinema */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a92b4e] rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Star className="w-6 h-6 text-yellow-400" /> Implementation Success
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Since the introduction of the Bihar Film Policy, several national and international filmmakers have chosen Bihar for its authentic landscapes.
                        </p>
                        <ul className="space-y-3">
                            {successStories.map((story, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-gray-300 border-b border-gray-800 pb-2 last:border-0">
                                    <span className="w-1.5 h-1.5 bg-[#a92b4e] rounded-full"></span>
                                    {story}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#a92b4e]/5 rounded-3xl p-8 border border-[#a92b4e]/20">
                            <h3 className="text-xl font-bold text-[#a92b4e] mb-4">Regional Cinema Hub</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Bihar has become a hub for regional filmmaking, especially in Bhojpuri and Magahi cinema. Acclaimed films such as <em>Songhatiya</em>, <em>Suhagin Ke Senur</em>, and <em>Chatth</em> were shot across various districts, showcasing local talent and dialects.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                            <h3 className="text-xl font-bold text-[#a92b4e] mb-4">Documentary Films</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Documentary productions like <em>Bihar Ka Jalwa</em> highlight the state’s art, culture, and development narrative. These projects inspire filmmakers to explore Bihar's untold stories through a realistic lens.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ContactUs />
        </div>
    );
}

import React from 'react';
import {
    User, Users, Video, Pen, Coffee, UsersRound, Clapperboard,
    Film, Music, Camera, Mic, Zap, Lightbulb, Palette, Shirt,
    Truck, MapPin, Plane, Building, Scissors, Star, UserCircle,
    Sparkles, GraduationCap, FileText, CreditCard, CheckCircle
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import ContactUs from './ContactUs';

const ScholarshipAndExpenses = () => {
    const scholarshipDetails = [
        {
            id: '',
            text: 'Under Clause 9.13 of Bihar Film Promotion Policy 2024, annual scholarship is also provided to students from Bihar who are studying at Film & Television Institute, Pune, Satyajit Ray Film & Television Institute, Kolkata, National School of Drama, New Delhi, Rangshala, Bangalore, Amritlal, and Varanasi. Accordingly, annual scholarship will be considered for students studying in degree/diploma programs at these institutions.',
            icon: <GraduationCap className="w-6 h-6" />
        },
        {
            id: '',
            text: 'The scholarship will be provided after submitting the application along with proof of admission, nomination proof, Aadhar card, and detailed course fee receipts from the managing director.',
            icon: <FileText className="w-6 h-6" />
        },
        {
            id: '',
            text: 'As a form of scholarship, course fee (tuition fee only) will be paid, with direct payment to the institution.',
            icon: <CreditCard className="w-6 h-6" />
        }
    ];

    const eligibleExpenses = [
        { id: 1, name: 'Lead Actors', icon: <Star className="w-5 h-5" /> },
        { id: 2, name: 'Producer', icon: <UserCircle className="w-5 h-5" /> },
        { id: 3, name: 'Director', icon: <Clapperboard className="w-5 h-5" /> },
        { id: 4, name: 'Supporting Cast', icon: <Users className="w-5 h-5" /> },
        { id: 5, name: 'Writer', icon: <Pen className="w-5 h-5" /> },
        { id: 6, name: 'Entourage', icon: <UsersRound className="w-5 h-5" /> },
        { id: 7, name: 'Extras & Features', icon: <Users className="w-5 h-5" /> },
        { id: 8, name: 'Direction Department Fees', icon: <Video className="w-5 h-5" /> },
        { id: 9, name: 'Line Producer Fees', icon: <User className="w-5 h-5" /> },
        { id: 10, name: 'Sync Sound & Sync Security', icon: <Mic className="w-5 h-5" /> },
        { id: 11, name: 'Art Department Fees Including Wages', icon: <Palette className="w-5 h-5" /> },
        { id: 12, name: 'Costume Department Fees', icon: <Shirt className="w-5 h-5" /> },
        { id: 13, name: 'Make-up & Make-up Material', icon: <Sparkles className="w-5 h-5" /> },
        { id: 14, name: 'Choreographer Fees', icon: <Music className="w-5 h-5" /> },
        { id: 15, name: 'Photographer Fees', icon: <Camera className="w-5 h-5" /> },
        { id: 16, name: 'Camera & Equipment Hire', icon: <Camera className="w-5 h-5" /> },
        { id: 17, name: 'Sound Equipment Hire', icon: <Mic className="w-5 h-5" /> },
        { id: 18, name: 'Light & Grip Hire', icon: <Lightbulb className="w-5 h-5" /> },
        { id: 19, name: 'Generator Hire', icon: <Zap className="w-5 h-5" /> },
        { id: 20, name: 'Vanity Van, Walkies & Picture Vehicles Hire', icon: <Truck className="w-5 h-5" /> },
        { id: 21, name: 'Costume Hire', icon: <Shirt className="w-5 h-5" /> },
        { id: 22, name: 'Art, Set & Props Hire', icon: <Palette className="w-5 h-5" /> },
        { id: 23, name: 'Transport', icon: <Truck className="w-5 h-5" /> },
        { id: 24, name: 'Location', icon: <MapPin className="w-5 h-5" /> },
        { id: 25, name: 'Flights & Hotel Accommodation', icon: <Plane className="w-5 h-5" /> },
        { id: 26, name: 'Production Office Cost', icon: <Building className="w-5 h-5" /> },
        { id: 27, name: 'Post Production', icon: <Scissors className="w-5 h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-[#a92b4e] py-24 px-4 text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#a92b4e]/90"></div>
                    <img src="/bannerImgee.png" alt="Scholarship Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#a92b4e]/90"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="py-10">
                        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                            Scholarships & Eligible Production Expenses
                        </h1>
                        <p className="text-md md:text-xl font-light text-yellow-100 max-w-4xl mx-auto">
                            Empowering Bihar's future filmmakers through education support and transparent production cost guidelines.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">

                {/* Section 8: Scholarship for Students */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#891737] mb-8 text-center">Student Scholarship Program</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 text-lg">
                        Supporting talented students from Bihar pursuing education in premier film and television institutes across India.
                    </p>
                    <div className="space-y-5">
                        {scholarshipDetails.map((detail) => (
                            <div
                                key={detail.id}
                                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#a92b4e]/30 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#a92b4e] to-[#891737] rounded-full flex items-center justify-center text-white shadow-lg">
                                    {detail.icon}
                                </div>
                                <div className="flex-1">
                                    <span className="font-bold text-[#a92b4e] text-xl">{detail.id}</span>
                                    <p className="text-gray-700 text-base mt-2 leading-relaxed">{detail.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 9: Appendix "A" - Eligible Expenses */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#891737] mb-4 text-center">Eligible Production Expenses</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 text-base leading-relaxed">
                        (According to Bihar Film Promotion Policy–2024) The total project cost of web series/documentary/serial/OTT platform includes eligible expenses within the approved subsidies presented in the application submitted by the applicant with necessary expenditure incurred in the following expense items, which will be considered eligible:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {eligibleExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#a92b4e]/40 hover:bg-[#a92b4e]/5 hover:shadow-md transition-all duration-300 cursor-pointer group"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-[#a92b4e]/10 group-hover:bg-gradient-to-br group-hover:from-[#a92b4e] group-hover:to-[#891737] rounded-xl flex items-center justify-center text-[#a92b4e] group-hover:text-white transition-all duration-300 shadow-sm">
                                    {expense.icon}
                                </div>
                                <div className="flex-1">
                                    <span className="text-gray-500 text-xs font-semibold">{expense.id}.</span>
                                    <p className="text-gray-800 text-sm font-semibold leading-tight group-hover:text-[#891737] transition-colors">{expense.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#a92b4e]/5 to-[#891737]/5 border-l-4 border-[#a92b4e] p-6 rounded-r-2xl shadow-md">
                        <p className="text-gray-700 text-base leading-relaxed mb-3">
                            <span className="font-bold text-[#891737] text-lg">Note:</span> In addition to the above details, the Managing Director, Bihar State Film Development and Finance Corporation Limited, Patna will be authorized to consider including other eligible expense items in the provided list.
                        </p>
                        <p className="text-gray-700 text-base leading-relaxed">
                            All forms and appendices related to Film Shooting are available on the website of Bihar State Film Development and Finance Corporation at{' '}
                            <a href="https://film.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#a92b4e] hover:text-[#891737] underline font-semibold transition-colors">
                                film.bihar.gov.in
                            </a>
                        </p>
                    </div>
                </div>

            </div>

            <ContactUs />
        </div>
    );
};

export default ScholarshipAndExpenses;

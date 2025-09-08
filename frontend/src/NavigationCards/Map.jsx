import React, { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    LayersControl,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import { FiSearch, FiMapPin, FiArrowLeft } from "react-icons/fi";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

const redIcon = new L.Icon({
    iconUrl: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=home|ff0000",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [1, -34],
});

const places = [
    { name: "CineWorks Studios", type: "Film Production", lat: 25.45711, lng: 86.06521 },
    { name: "Silver Frame Productions", type: "Film Production", lat: 25.45217, lng: 86.07819 },
    { name: "Visionary Films Pvt. Ltd.", type: "Film Production", lat: 25.44437, lng: 86.03709 },
    { name: "DreamScape Entertainment", type: "Film Production", lat: 25.46654, lng: 86.0997 },
    { name: "Lights Camera Action Studios", type: "Film Production", lat: 25.4771, lng: 85.9926 },
    { name: "Urban Prop Masters", type: "Props Vendor", lat: 25.42066, lng: 86.11903 },
    { name: "Creative Set Rentals", type: "Props Vendor", lat: 25.44557, lng: 86.02732 },
    { name: "Scenic Design Depot", type: "Props Vendor", lat: 25.41804, lng: 86.10659 },
    { name: "Epic Props & Effects", type: "Props Vendor", lat: 25.47121, lng: 85.96212 },
    { name: "Cinema Artisans", type: "Props Vendor", lat: 25.62416, lng: 86.14468 },
    { name: "Set Decor Hub", type: "Props Vendor", lat: 25.59235, lng: 86.1613 },
    { name: "FilmCraft Equipment", type: "Props Vendor", lat: 25.37884, lng: 86.00514 },
    { name: "Golden Reel Props", type: "Props Vendor", lat: 25.40944, lng: 86.14995 },
    { name: "Starlight Production House", type: "Film Production", lat: 25.42561, lng: 86.13863 },
    { name: "Maverick Props Studio", type: "Props Vendor", lat: 25.42692, lng: 86.1366 },
    { name: "OnSet Essentials", type: "Props Vendor", lat: 25.37628, lng: 86.18749 },
    { name: "Backdrop Rentals Co.", type: "Props Vendor", lat: 25.41896, lng: 86.1152 },
    { name: "Classic Props Gallery", type: "Props Vendor", lat: 25.66817, lng: 86.1777 },
];

const categories = ["All", "Film Production", "Props Vendor"];

const FlyToLocation = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 14, { duration: 1.5 });
        }
    }, [lat, lng]);
    return null;
};

const Map = () => {
    const [selectedType, setSelectedType] = useState("All");
    const [search, setSearch] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [focusedPlace, setFocusedPlace] = useState(null);

    const filtered = places.filter(
        (p) =>
            (selectedType === "All" || p.type === selectedType) &&
            p.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.log("Geolocation error:", error)
        );
    }, []);

    const handlePlaceClick = (place) => {
        setFocusedPlace(place);
        setShowMap(true);
    };

    const handleBack = () => {
        setShowMap(false);
        setFocusedPlace(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto min-h-[38rem] max-h-[38rem] bg-gray-900 text-white flex rounded-xl overflow-hidden">
            
            {/* Sidebar */}
            <div className={`${showMap ? 'hidden md:block md:w-80' : 'w-full md:w-80'} bg-gray-800 flex flex-col`}>
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-purple-300 mb-3">Props & Studios</h2>
                    
                    {/* Search */}
                    <div className="relative mb-3">
                        <FiSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedType(type);
                                    setShowMap(false);
                                    setFocusedPlace(null);
                                }}
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                    selectedType === type
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Places List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <p className="text-xs text-gray-400 mb-3">
                        {filtered.length} locations
                    </p>
                    
                    {filtered.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <FiMapPin className="text-2xl mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No locations found</p>
                        </div>
                    ) : (
                        filtered.map((place, i) => (
                            <div
                                key={i}
                                onClick={() => handlePlaceClick(place)}
                                className="cursor-pointer bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-200 group"
                            >
                                <h4 className="font-medium text-sm text-white group-hover:text-purple-200 truncate">
                                    {place.name}
                                </h4>
                                <p className="text-xs text-gray-400 mt-1 flex items-center">
                                    <FiMapPin className="mr-1 text-xs" />
                                    {place.type}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Map Section */}
            {showMap && (
                <div className="flex-1 flex flex-col">
                    {/* Map Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
                        <button
                            onClick={handleBack}
                            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            <FiArrowLeft className="text-sm" />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        
                        {focusedPlace && (
                            <div className="bg-gray-700/50 px-3 py-2 rounded-lg">
                                <p className="text-sm font-medium text-purple-300 truncate max-w-48">
                                    {focusedPlace.name}
                                </p>
                                <p className="text-xs text-gray-400">{focusedPlace.type}</p>
                            </div>
                        )}
                    </div>

                    {/* Map Container */}
                    <div className="flex-1 relative">
                        <MapContainer
                            center={focusedPlace ? [focusedPlace.lat, focusedPlace.lng] : [25.43, 86.1]}
                            zoom={focusedPlace ? 14 : 11}
                            scrollWheelZoom={true}
                            className="w-full h-full"
                        >
                            <LayersControl position="topright">
                                <LayersControl.BaseLayer checked name="Street">
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Satellite">
                                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                                </LayersControl.BaseLayer>
                            </LayersControl>

                            {filtered.map((place, i) => (
                                <Marker key={i} position={[place.lat, place.lng]} icon={customIcon}>
                                    <Popup>
                                        <div className="text-center">
                                            <h4 className="font-semibold text-gray-800">{place.name}</h4>
                                            <p className="text-sm text-gray-600">{place.type}</p>
                                        </div>
                                    </Popup>
                                    <Tooltip direction="top" offset={[0, -30]} permanent>
                                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                                            focusedPlace?.name === place.name
                                                ? "bg-purple-600 text-white"
                                                : "bg-white text-gray-800"
                                        }`}>
                                            {place.name}
                                        </div>
                                    </Tooltip>
                                </Marker>
                            ))}
                            
                            {focusedPlace && <FlyToLocation lat={focusedPlace.lat} lng={focusedPlace.lng} />}
                            
                            {userLocation && (
                                <Marker position={[userLocation.lat, userLocation.lng]} icon={redIcon}>
                                    <Popup>
                                        <div className="text-center">
                                            <h4 className="font-semibold text-gray-800">Your Location</h4>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx global>{`
                .leaflet-tooltip {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

export default Map;

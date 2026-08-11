import { useEffect, useState } from "react";

import {
    MapContainer,
    Marker,
    TileLayer,
    useMapEvents,
} from "react-leaflet";

import L from "leaflet";

type LocationPickerProps = {
    latitude: number;
    longitude: number;
    onLocationChange: (
        latitude: number,
        longitude: number
    ) => void;
};

const markerIcon = new L.Icon({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({
    position,
    onLocationChange,
}: {
    position: [number, number];
    onLocationChange: (
        latitude: number,
        longitude: number
    ) => void;
}) {
    useMapEvents({
        click(event) {
            onLocationChange(
                event.latlng.lat,
                event.latlng.lng
            );
        },
    });

    return (
        <Marker
            position={position}
            draggable
            icon={markerIcon}
            eventHandlers={{
                dragend(event) {
                    const marker =
                        event.target;

                    const location =
                        marker.getLatLng();

                    onLocationChange(
                        location.lat,
                        location.lng
                    );
                },
            }}
        />
    );
}

function LocationPicker({
    latitude,
    longitude,
    onLocationChange,
}: LocationPickerProps) {
    const [position, setPosition] =
        useState<[number, number]>([
            latitude || 20.5937,
            longitude || 78.9629,
        ]);

    useEffect(() => {
        setPosition([
            latitude || 20.5937,
            longitude || 78.9629,
        ]);
    }, [latitude, longitude]);

    const handleLocationChange = (
        lat: number,
        lng: number
    ) => {
        setPosition([lat, lng]);
        onLocationChange(lat, lng);
    };

    return (
        <div className="space-y-4">
            <MapContainer
                center={position}
                zoom={5}
                scrollWheelZoom
                style={{
                    height: "400px",
                    width: "100%",
                    borderRadius: "16px",
                }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    position={position}
                    onLocationChange={
                        handleLocationChange
                    }
                />
            </MapContainer>

            <div className="rounded-xl bg-slate-100 p-4">
                <p>
                    <strong>Latitude:</strong>{" "}
                    {position[0].toFixed(6)}
                </p>

                <p>
                    <strong>Longitude:</strong>{" "}
                    {position[1].toFixed(6)}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                    Click anywhere on the map or
                    drag the marker to select your
                    hotel location.
                </p>
            </div>
        </div>
    );
}

export default LocationPicker;
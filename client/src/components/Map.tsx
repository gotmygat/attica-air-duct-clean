/**
 * ATTICA CLEANERS — Map Component
 * Uses Leaflet + OpenStreetMap (no API key required, works on Firebase)
 * Pin and view update reactively when city coordinates change (navigation fix)
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon paths broken by bundlers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: unknown) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 28.5383, lng: -81.3792 },
  initialZoom = 12,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Custom green pin icon factory
  const makeGreenIcon = () =>
    L.divIcon({
      className: "",
      html: `<div style="
        width:28px;height:28px;
        background:linear-gradient(135deg,#22c55e,#16a34a);
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
      "></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -32],
    });

  // Initialize map once
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = L.map(mapContainer.current, {
      center: [initialCenter.lat, initialCenter.lng],
      zoom: initialZoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([initialCenter.lat, initialCenter.lng], { icon: makeGreenIcon() })
      .addTo(map)
      .bindPopup(
        `<strong style="font-family:sans-serif;font-size:13px;">Attica Air Duct Cleaners</strong><br/>
         <span style="font-family:sans-serif;font-size:12px;color:#555;">Serving this area · (407) 990-1969</span>`
      );

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update pin and view whenever the city coordinates change (navigation between location pages)
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    const latlng: L.LatLngExpression = [initialCenter.lat, initialCenter.lng];
    mapRef.current.setView(latlng, initialZoom, { animate: true });
    markerRef.current.setLatLng(latlng);
  }, [initialCenter.lat, initialCenter.lng, initialZoom]);

  return (
    <div
      ref={mapContainer}
      className={cn("w-full h-[360px]", className)}
      style={{ zIndex: 0 }}
    />
  );
}

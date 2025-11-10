import { useEffect, useRef, useState, memo } from "react";
import L, { Map as LeafletMap, Marker } from "leaflet";
import { createPortal } from "react-dom";
import "leaflet/dist/leaflet.css";

interface MapWithAddressProps {
  onAddressSelect: (address: string) => void;
}

const MapWithAddress = ({ onAddressSelect }: MapWithAddressProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [center, setCenter] = useState<[number, number]>([10.3157, 123.8854]);

  const [pendingAddress, setPendingAddress] = useState<string>("");
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Initialize Leaflet map
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 13,
      doubleClickZoom: false, // 🚫 Disable Leaflet’s double-click zoom
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let clickDisabled = false; // Prevent spamming clicks

    map.on("click", async (e) => {
      if (clickDisabled) return;
      clickDisabled = true;

      const { lat, lng } = e.latlng;
      setPendingCoords([lat, lng]);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        setPendingAddress(
          data?.display_name || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
        );
      } catch {
        setPendingAddress(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
      }

      setShowModal(true);

      // Re-enable after short delay (or when modal closes)
      setTimeout(() => {
        clickDisabled = false;
      }, 1000);
    });

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [center]);

  // Get user location (initial only)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCenter([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("Geolocation blocked")
      );
    }
  }, []);

  const handleConfirm = () => {
    if (mapRef.current && pendingCoords) {
      const [lat, lng] = pendingCoords;
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }
      const marker = L.marker([lat, lng]).addTo(mapRef.current);
      markerRef.current = marker;
    }

    onAddressSelect(pendingAddress);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingAddress("");
    setPendingCoords(null);
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden border border-white/20">
        <div
          ref={mapContainerRef}
          id="leaflet-map"
          style={{ height: "250px", width: "100%" }}
        />
        <p className="text-sm text-gray-300 text-center mt-2">
          Click the map to select your address
        </p>
      </div>

      {/* Global Modal via Portal */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-white text-black rounded-xl p-6 shadow-2xl max-w-md w-[90%]">
              <h2 className="text-lg font-semibold mb-2">Confirm this address?</h2>
              <p className="text-sm mb-4">{pendingAddress}</p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default memo(MapWithAddress);

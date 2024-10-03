import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend as ChartLegend,
} from "chart.js";
import { reportFirestore } from "../security/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartLegend
);

// Define custom icons for different statuses
const verifiedIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Blue default marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const pendingIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png", // Red marker matching Leaflet style
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Component to center the map on the focused marker
const CenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15, { animate: true });
    }
  }, [position, map]);

  return null;
};

// Legend component
const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "topright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");

      const verifiedIconUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
      const pendingIconUrl =
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";

      div.innerHTML = `
        <div class="legend-item">
          <div class="legend-icon">
            <img src="${verifiedIconUrl}" alt="Verified marker" />
          </div>
          <div class="legend-label">Verified</div>
        </div>
        <div class="legend-item">
          <div class="legend-icon">
            <img src="${pendingIconUrl}" alt="Pending marker" />
          </div>
          <div class="legend-label">Pending</div>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    // Cleanup on unmount
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

const PublicMap = () => {
  const [location, setLocation] = useState([14.369995, 121.253925]); // Default center
  const [zoom, setZoom] = useState(11); // Default zoom level
  const [markers, setMarkers] = useState([]);
  const [barangayDiseaseData, setBarangayDiseaseData] = useState({
    labels: [],
    datasets: [],
  });
  const [diseaseClassData, setDiseaseClassData] = useState({
    labels: [],
    datasets: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedMarker, setFocusedMarker] = useState(null);

  // Predefined list of diseases
  const diseaseList = [
    "Aeromonas Septicemia",
    "Columnaris Disease",
    "Edwardsiella Ictaluri",
    "Epizootic Ulcerative Syndrome",
    "Flavobacterium",
    "Fungal Disease",
    "Ichthyophthirius",
    "Parasitic Disease",
    "Streptococcus",
    "Tilapia Lake Virus",
  ];

  const fetchReportsData = useCallback(() => {
    try {
      const reportsRef = collection(reportFirestore, "reports");

      return onSnapshot(
        reportsRef,
        (snapshot) => {
          const reports = snapshot.docs.map((doc) => doc.data());

          const newMarkers = reports
            .filter(
              (report) =>
                report.location &&
                report.location.latitude &&
                report.location.longitude
            )
            .map((report) => ({
              id: report.reportId,
              position: [report.location.latitude, report.location.longitude],
              details: {
                diseaseName: report.diseaseName,
                confidence: report.confidence,
                additionalInfo: report.additionalInfo,
                imageUrl: report.imageUrl,
                reportStatus: report.reportStatus,
                timestamp: report.timestamp,
                reportTown: report.reportTown,
                expertFeedback: report.expertFeedback,
              },
            }));

          setMarkers(newMarkers);
          if (newMarkers.length > 0) {
            setLocation(newMarkers[0].position);
            setZoom(13);
          }

          // Initialize disease counts with zero
          const diseaseCounts = {};
          diseaseList.forEach((disease) => {
            diseaseCounts[disease] = 0;
          });

          // Initialize barangay counts with zero
          const barangayCounts = {};

          // Process reports
          reports.forEach((report) => {
            // Process diseases
            const reportDiseaseName = report.diseaseName;

            if (reportDiseaseName) {
              const reportKey = reportDiseaseName.toLowerCase().substring(0, 5);

              diseaseList.forEach((disease) => {
                const diseaseKey = disease.toLowerCase().substring(0, 5);
                if (reportKey === diseaseKey) {
                  diseaseCounts[disease] += 1;
                }
              });
            }

            // Process barangays
            const barangay = report.reportTown || "Unknown";
            if (barangayCounts[barangay]) {
              barangayCounts[barangay] += 1;
            } else {
              barangayCounts[barangay] = 1;
            }
          });

          // Prepare labels and data for the disease class chart
          const diseaseLabels = diseaseList;
          const diseaseData = diseaseList.map(
            (disease) => diseaseCounts[disease]
          );

          // Use predefined colors or generate colors
          const diseaseBackgroundColors = [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(199, 199, 199, 0.6)",
            "rgba(255, 99, 71, 0.6)",
            "rgba(60, 179, 113, 0.6)",
            "rgba(106, 90, 205, 0.6)",
          ];

          setDiseaseClassData({
            labels: diseaseLabels,
            datasets: [
              {
                label: "Number of Cases",
                data: diseaseData,
                backgroundColor: diseaseBackgroundColors,
              },
            ],
          });

          // Prepare labels and data for the barangay disease chart
          const barangayLabels = Object.keys(barangayCounts);
          const barangayData = barangayLabels.map(
            (barangay) => barangayCounts[barangay]
          );

          setBarangayDiseaseData({
            labels: barangayLabels,
            datasets: [
              {
                label: "Number of Diseases per Barangay",
                data: barangayData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        },
        (error) => {
          console.error("Error fetching reports:", error);
        }
      );
    } catch (err) {
      console.error("Failed to fetch reports data:", err);
    }
  }, []);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  return (
    <div className="container mt-28 mx-auto px-4">
      {/* Added container and horizontal padding */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 w-full mb-4 md:mb-0">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Geo Mapping</h2>
            <div className="flex mb-4">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-md"
                placeholder="Search by disease name or place..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {}}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md"
              >
                Search
              </button>
            </div>
            <div
              className="map-container"
              style={{
                height: "750px",
                width: "100%",
                backgroundColor: "white",
              }}
            >
              <MapContainer
                center={location}
                zoom={zoom}
                style={{ height: "100%", width: "100%" }}
                className="rounded-md shadow-md"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {focusedMarker && (
                  <CenterMap position={focusedMarker.position} />
                )}
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={marker.position}
                    icon={
                      marker.details.reportStatus === "Verified"
                        ? verifiedIcon
                        : pendingIcon
                    }
                  >
                    <Popup>
                      <div>
                        <p>
                          <strong>Disease Name:</strong>{" "}
                          {marker.details.diseaseName}
                        </p>
                        <p>
                          <strong>Report Status:</strong>{" "}
                          {marker.details.reportStatus}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                <Legend />
              </MapContainer>
            </div>
          </div>
        </div>
        <div
          className="md:w-1/3 w-full bg-white p-4 overflow-y-auto shadow-md rounded-md"
          style={{ borderLeft: "1px solid #ddd", maxHeight: "904px" }}
        >
          <h2 className="text-base font-normal mb-4">
            Number of Diseases per Barangay
          </h2>
          <div style={{ height: "300px" }}>
            <Bar
              data={barangayDiseaseData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: false,
                    text: "Number of Diseases per Barangay",
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      autoSkip: false,
                      beginAtZero: true,
                    },
                  },
                },
              }}
            />
          </div>

          <h2 className="text-base font-normal mt-6 mb-4">
            Number of Diseases per Class
          </h2>
          <div style={{ height: "500px" }}>
            <Bar
              data={diseaseClassData}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: false,
                    text: "Disease Cases per Class",
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      autoSkip: false,
                      beginAtZero: true,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicMap;

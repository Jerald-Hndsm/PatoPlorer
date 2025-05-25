import React, { useState, useEffect } from 'react';
import { adminFirestore, userFirestore } from '../../firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { MdDashboard } from "react-icons/md";
import { TbEggs } from "react-icons/tb";
import { FaRegClipboard } from "react-icons/fa";
import { RiNumbersLine } from "react-icons/ri";
import { MdStackedLineChart } from "react-icons/md";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MainDashboard = () => {
  const [latestEggsCollected, setLatestEggsCollected] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [numberOfDucks, setNumberOfDucks] = useState(null);
  const [latestEggForecast, setLatestEggForecast] = useState(null);
  const [eggsProducedData, setEggsProducedData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    fetchLatestEggsCollected();
    fetchOrderCount();
    fetchNumberOfDucks();
    fetchLatestEggForecast();
    fetchEggsProducedData();
    fetchOrdersData();
  }, []);

  // Fetch latest eggs collected
  const fetchLatestEggsCollected = async () => {
    try {
      const inventoryRef = collection(userFirestore, "inventory");
      const q = query(inventoryRef, orderBy("date", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLatestEggsCollected(querySnapshot.docs[0].data().eggsCollected);
      }
    } catch (error) {
      console.error("❌ Error fetching latest eggs collected:", error);
    }
  };

  // Fetch order count
  const fetchOrderCount = async () => {
    try {
      const ordersRef = collection(userFirestore, "orders");
      const querySnapshot = await getDocs(ordersRef);
      setOrderCount(querySnapshot.size);
    } catch (error) {
      console.error("❌ Error fetching order count:", error);
    }
  };

  // Fetch "Number of Ducks" from inputData inside the latest forecast document
  const fetchNumberOfDucks = async () => {
    try {
      const forecastsRef = collection(adminFirestore, "forecasts");
      const q = query(forecastsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        console.log("📌 Firestore Document Data:", docData); // Debugging: Check the document structure

        // Access "Number of Ducks" inside inputData
        const ducksValue = docData.inputData?.["Number of Ducks"];

        if (ducksValue !== undefined) {
          console.log("✅ Fetched Number of Ducks:", ducksValue);
          setNumberOfDucks(ducksValue);
        } else {
          console.error("❌ Number of Ducks field is missing inside inputData!");
        }
      } else {
        console.error("❌ No forecast document found in Firestore.");
      }
    } catch (error) {
      console.error("❌ Error fetching number of ducks:", error);
    }
  };

  // Fetch latest egg forecast
  const fetchLatestEggForecast = async () => {
    try {
      const forecastsRef = collection(adminFirestore, "forecasts");
      const q = query(forecastsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLatestEggForecast(querySnapshot.docs[0].data().predictedEggs);
      }
    } catch (error) {
      console.error("❌ Error fetching latest forecast:", error);
    }
  };

  // Fetch historical data for eggs produced chart
  const fetchEggsProducedData = async () => {
    try {
      const inventoryRef = collection(userFirestore, "inventory");
      const querySnapshot = await getDocs(inventoryRef);
      const data = querySnapshot.docs.map(doc => ({
        date: doc.data().date,
        eggs: doc.data().eggsCollected
      }));
      setEggsProducedData(data);
    } catch (error) {
      console.error("❌ Error fetching eggs produced data:", error);
    }
  };

  // Fetch historical data for orders chart
  const fetchOrdersData = async () => {
    try {
      const ordersRef = collection(userFirestore, "orders");
      const querySnapshot = await getDocs(ordersRef);
      const data = querySnapshot.docs.map(doc => ({
        date: doc.data().date,
        count: 1
      }));
      setOrdersData(data);
    } catch (error) {
      console.error("❌ Error fetching orders data:", error);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 1600
      }
    }
  };

  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg h-[745px]">
      <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Dashboard <MdDashboard className="ml-2" />
      </h1>

      {/* Info Tiles */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-sky-800 p-2 shadow rounded flex flex-col justify-between">
          <h2 className="text-lg font-sans font-semibold text-white text-left h-20 flex">Eggs Produced <TbEggs className='pt-0.5 ml-1 translate-y-1'/> </h2>
          <p className="text-lg text-white mt-auto text-right font-sans">{latestEggsCollected ?? "Loading..."} Eggs</p>
        </div>
        <div className="bg-sky-800 p-2 shadow rounded flex flex-col justify-between">
          <h2 className="text-lg font-sans font-semibold text-white text-left h-20 flex">Orders <FaRegClipboard className='pt-0.5 ml-1 translate-y-1'/></h2>
          <p className="text-lg text-white mt-auto text-right font-sans">{orderCount ?? "Loading..."} Orders</p>
        </div>
        <div className="bg-sky-800 p-2 shadow rounded flex flex-col justify-between">
          <h2 className="text-lg font-sans font-semibold text-white text-left h-20 flex">Number of Ducks <RiNumbersLine className='pt-0.5 ml-1 translate-y-1'/></h2>
          <p className="text-lg text-white mt-auto text-right font-sans">{numberOfDucks ?? "Loading..."} Ducks</p>
        </div>
        <div className="bg-sky-800 p-2 shadow rounded flex flex-col justify-between">
          <h2 className="text-lg font-sans font-semibold text-white text-left h-20 flex">Egg Forecast Today <MdStackedLineChart className='pt-0.5 ml-1 translate-y-1'/></h2>
          <p className="text-lg text-white mt-auto text-right font-sans ">{latestEggForecast ?? "Loading..."} Eggs</p>
        </div>
      </div>

      {/* Charts Row: Eggs Produced & Orders */}
      <div className="grid grid-cols-2 gap-4">
        {/* Eggs Produced Chart */}
        <div className="bg-white p-9 rounded-lg shadow-md max-h-96">
          <h2 className="text-lg font-bold mb-2">Eggs Produced Over Time</h2>
          <Line
            data={{
              labels: eggsProducedData.map(d => d.date),
              datasets: [
                {
                  label: 'Eggs Produced',
                  data: eggsProducedData.map(d => d.eggs),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                }
              ]
            }}
            options={chartOptions}
          />
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-9 rounded-lg shadow-md max-h-96">
          <h2 className="text-lg font-bold mb-2">Orders Over Time</h2>
          <Line
            data={{
              labels: ordersData.map(d => d.date),
              datasets: [
                {
                  label: 'Orders',
                  data: ordersData.map(d => d.count),
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: true,
                }
              ]
            }}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

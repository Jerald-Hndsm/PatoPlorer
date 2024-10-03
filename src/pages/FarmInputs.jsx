import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FarmInputs = () => {
  // State to manage input data
  const [inputs, setInputs] = useState(() => {
    const savedInputs = localStorage.getItem('farmInputs');
    return savedInputs ? JSON.parse(savedInputs) : [];
  });

  const [form, setForm] = useState({
    inputName: '',
    category: 'Feeds',
    supplier: '',
    quantity: '',
    cost: '',
  });

  // State to manage editing an input
  const [editIndex, setEditIndex] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Format cost to pesos
  const formatCost = (cost) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(cost);
  };

  // Add or update input in the list and save in local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    const newInput = { ...form, quantity: parseInt(form.quantity) }; // Ensure quantity is a number
    let updatedInputs;

    if (editIndex !== null) {
      // Update existing input
      updatedInputs = inputs.map((input, index) =>
        index === editIndex ? newInput : input
      );
      setEditIndex(null); // Reset edit index after update
    } else {
      // Add new input
      updatedInputs = [...inputs, newInput];
    }

    setInputs(updatedInputs);
    localStorage.setItem('farmInputs', JSON.stringify(updatedInputs));

    // Reset form after submission
    setForm({
      inputName: '',
      category: 'Feeds',
      supplier: '',
      quantity: '',
      cost: '',
    });
  };

  // Function to remove all inputs
  const handleClear = () => {
    setInputs([]);
    localStorage.removeItem('farmInputs');
  };

  // Prepare data for the bar chart
  const chartData = () => {
    const categoryMap = inputs.reduce((acc, input) => {
      if (acc[input.category]) {
        acc[input.category] += input.quantity; // Accumulate quantity by category
      } else {
        acc[input.category] = input.quantity;
      }
      return acc;
    }, {});

    const categories = Object.keys(categoryMap);
    const quantities = Object.values(categoryMap);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Total Quantity',
          data: quantities,
          backgroundColor: categories.map((category) => {
            switch (category) {
              case 'Feeds':
                return 'rgba(75, 192, 192, 0.6)'; // Light Blue
              case 'Nutrients':
                return 'rgba(255, 99, 132, 0.6)'; // Red
              case 'Medicines':
                return 'rgba(255, 205, 86, 0.6)'; // Yellow
              case 'Sanitation':
                return 'rgba(54, 162, 235, 0.6)'; // Light Blue
              case 'Equipment':
                return 'rgba(153, 102, 255, 0.6)'; // Purple
              default:
                return 'rgba(201, 203, 207, 0.6)'; // Gray
            }
          }),
          barThickness: 20, // Set the thickness of the bars
        },
      ],
    };
  };

  // Function to start editing an input
  const handleEdit = (index) => {
    const inputToEdit = inputs[index];
    setForm(inputToEdit);
    setEditIndex(index);
  };

  return (
    <div className="p-8 mt-8">
      <h2 className="text-2xl mb-4">Farm Inputs</h2>

      {/* Bar Chart to display farm inputs by category */}
      <div className="mb-6" style={{ width: '100%', height: '300px' }}>
        <h3 className="text-xl mb-2">Farm Input Inventory Chart:</h3>
        <Bar
          data={chartData()}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Farm Inputs by Category',
              },
            },
            elements: {
              bar: {
                borderWidth: 2, // Optional: adjust border width if needed
              },
            },
          }}
          width={400}
          height={300}
        />
      </div>

      {/* Form for adding or editing inputs */}
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Input Name:</label>
            <input
              type="text"
              name="inputName"
              value={form.inputName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Category:</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option>Feeds</option>
              <option>Nutrients</option>
              <option>Medicines</option>
              <option>Sanitation</option>
              <option>Equipment</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Supplier:</label>
            <input
              type="text"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Cost:</label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {editIndex !== null ? 'Update Input' : 'Add Input'}
        </button>
      </form>

      {/* Table to display farm inputs */}
      {inputs.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-xl mb-2">Farm Input Inventory:</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Input Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Supplier</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Cost</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inputs.map((input, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{input.inputName}</td>
                  <td className="border p-2">{input.category}</td>
                  <td className="border p-2">{input.supplier}</td>
                  <td className="border p-2">{input.quantity}</td>
                  <td className="border p-2">{formatCost(input.cost)}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white py-1 px-2 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No inputs available.</p>
      )}

      {/* Button to clear all inputs */}
      <button onClick={handleClear} className="bg-red-500 text-white py-2 px-4 rounded">
        Clear All Inputs
      </button>
    </div>
  );
};

export default FarmInputs;

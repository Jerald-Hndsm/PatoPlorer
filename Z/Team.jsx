import React, { useEffect, useState } from "react";
import student1 from "../../assets/img/Jamolin.webp"; // replace with actual image paths
import student2 from "../../assets/img/Sabinet.webp"; // replace with actual image paths
import student3 from "../../assets/img/Martizano.webp"; // replace with actual image paths

const Team = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {


 
  }, []);

  const members = [
    {
      image: student1,
      title: "Team Leader",
      name: "Leigh Inna Jamolin",
      description:
        "Description of fish disease 1. Symptoms, causes, and treatment options.",
    },
    {
      image: student2,
      title: "Developer",
      name: "John Philip Sabinet",
      description:
        "Description of fish disease 2. Symptoms, causes, and treatment options.",
    },
    {
      image: student3,
      title: "Web Developer",
      name: "Francine Martizano",
      description:
        "Description of fish disease 3. Symptoms, causes, and treatment options.",
    },
  ];

  const openModal = (index) => {
    setSelectedArticle(index);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <section id="team">
      <div className="pt-20" style={{ userSelect: "none" }}>
        <div className="w-full bg-white overflow-hidden pt-20 px-4 pb-5">
          <p className="text-[#00003C] text-3xl text-center font-bold pb-8">
            Meet the
            <span style={{ color: "#00003C" }}> Fish</span>
            <span style={{ color: "#7b9fb8" }}>Lens </span> Team
          </p>
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {members.map((article, index) => (
              <div
                key={index}
                className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 transition-transform"
                role="button"
                tabIndex={0}
                onClick={() => openModal(index)}
                onKeyDown={(e) => e.key === "Enter" && openModal(index)}
              >
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "100%" }}
                >
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg cursor-pointer"
                    src={article.image}
                    alt={article.name}
                  />
                </div>
                <h2 className="text-2xl font-bold text-center py-4">
                  {article.name}
                </h2>
                <p className="text-center text-gray-600 px-4">
                  {article.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Modal Overlay */}
        {selectedArticle !== null && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg relative">
              <h2 className="text-2xl font-bold mb-4">
                {members[selectedArticle].name}
              </h2>
              <img
                className="w-full h-96 object-cover rounded-lg mb-4"
                src={members[selectedArticle].image}
                alt={members[selectedArticle].name}
              />
              <p className="text-gray-700">{members[selectedArticle].title}</p>
              <button
                className="mt-4 bg-[#00003C] text-white py-2 px-4 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;

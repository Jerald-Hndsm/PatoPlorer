import React, { useEffect, useState } from "react";
import { publishFirestore } from "../security/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const cacheKey = "cachedArticles";

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setArticles(JSON.parse(cachedData));
      setLoading(false);
    }

    const q = query(
      collection(publishFirestore, "articles"),
      orderBy("publishedAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newArticles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(newArticles);
      localStorage.setItem(cacheKey, JSON.stringify(newArticles));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("paste", preventDefault);
    document.addEventListener("contextmenu", preventDefault);

    return () => {
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("paste", preventDefault);
      document.removeEventListener("contextmenu", preventDefault);
    };
  }, []);

  const openModal = (article) => setSelectedArticle(article);
  const closeModal = () => setSelectedArticle(null);
  const scrollToTop = () => {
    if (selectedArticle) {
      document
        .getElementById("modalContent")
        .scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  const displayedArticles = articles.slice(0, 6);

  return (
    <section id="articles" className="pb-20 pt-16 px-4">
      <div className="max-w-[1240px] mx-auto" style={{ userSelect: "none" }}>
        <h1 className="text-4xl text-[#00003C] font-bold mb-8 text-center">
          Articles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => openModal(article)}
            >
              <img
                className="w-full h-60 object-cover"
                srcSet={`
                  ${article.newsImage}?w=150&h=120&fit=crop&q=50 150w,
                  ${article.newsImage}?w=300&h=240&fit=crop&q=50 300w,
                  ${article.newsImage}?w=600&h=480&fit=crop&q=50 600w
                `}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`${article.newsImage}?w=300&h=240&fit=crop&q=50`}
                alt={article.newsTitle}
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {article.newsTitle.length > 150
                    ? `${article.newsTitle.substring(0, 147)}...`
                    : article.newsTitle}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Posted on: {new Date(article.publishedAt).toLocaleString()}
                </p>
                {article.lastEditedAt && (
                  <p className="text-sm text-gray-500 mt-1">
                    Edited on: {new Date(article.lastEditedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {articles.length > 6 && (
          <div className="flex justify-center mt-8">
            <a
              href="/all-articles"
              className="text-[#00003C] rounded-md text-2xl font-medium px-6 py-3"
            >
              Show More
            </a>
          </div>
        )}

        {selectedArticle && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              id="modalContent"
              className="bg-white p-8 max-w-4xl w-full mx-4 rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh]"
            >
              <button
                className="absolute top-2 right-2 bg-[#00003C] text-white p-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
              <h2 className="text-2xl font-bold pt-3 mb-2">
                {selectedArticle.newsTitle}
              </h2>
              <p className="text-left text-gray-600 mb-4">
                By: {selectedArticle.author}
              </p>
              <img
                className="w-full h-fit object-cover rounded-lg mb-4"
                src={selectedArticle.newsImage} // Full-resolution image
                alt={selectedArticle.newsTitle}
              />
              <p className="text-gray-700" style={{ whiteSpace: "pre-wrap" }}>
                {selectedArticle.newsDetails}
              </p>
              <button
                className="sticky bottom-2 left-[calc(100%-1rem)] bg-[#00003C] text-white py-2 px-4 rounded-full shadow-lg"
                onClick={scrollToTop}
              >
                ↑ Top
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;

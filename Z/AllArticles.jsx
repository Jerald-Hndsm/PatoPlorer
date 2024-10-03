import React, { useEffect, useState, useCallback } from "react";
import { publishFirestore } from "../security/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Loader3 from "../other/loaders/Loader3";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const cacheKey = "allArticles";

  const fetchArticles = useCallback(async () => {
    try {
      // Check if the articles are in local storage
      const cachedArticles = localStorage.getItem(cacheKey);
      if (cachedArticles) {
        setArticles(JSON.parse(cachedArticles));
        setLoading(false);
        return;
      }

      const q = query(
        collection(publishFirestore, "articles"),
        orderBy("publishedAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const articlesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesList);
        localStorage.setItem(cacheKey, JSON.stringify(articlesList));
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

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

  if (loading) {
    return (
      <div>
        <Loader3 />
      </div>
    );
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.newsDetails.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-white py-20 px-4" style={{ userSelect: "none" }}>
      <div className="max-w-[1240px] mx-auto pt-4">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
          />
          <button
            onClick={() => navigate(-1)}
            className="ml-4 px-6 py-3 bg-[#00003C] text-white rounded-md"
          >
            Return Page
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                className="w-full h-60 object-cover"
                src={`${article.newsImage}?w=100&h=100&fit=crop`} // Load a low-resolution image
                alt={article.newsTitle}
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
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mx-1"
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 rounded-md mx-1 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mx-1"
            >
              Next
            </button>
          )}
        </div>

        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#00003C] text-white py-2 px-4 rounded-full shadow-lg"
        >
          ↑ Top
        </button>
      </div>
    </div>
  );
};

export default AllArticles;

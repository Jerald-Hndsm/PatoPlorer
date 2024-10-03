import React from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "35d9589c-de2f-442e-ae7b-b38831532117");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  };



  React.useEffect(() => {
 
  }, []);

  return (
    <div
      className="grid max-w-[1240px] mx-auto pt-20 pb-4"
      style={{ userSelect: "none" }}
    >
      <section
        id="contact"
        className="flex flex-col md:flex-row gap-8 justify-center items-start bg-white p-8"
      >
        {/* Left Side: Map */}
        <div className="flex-1 mt-20 hidden md:block">
          <div
            className="relative w-full border border-gray-200 rounded-lg"
            style={{ height: "720px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1148.845578579945!2d121.44873389194265!3d14.413294088771117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397f02b40f56581%3A0x4ef849bbf26fa3dd!2sLaguna%20State%20Polytechnic%20University%20-%20Siniloan%20(Host)%20Campus!5e0!3m2!1sen!2sph!4v1721660175341!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing the location of Laguna State Polytechnic University - Siniloan Campus"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex-1 max-w-md w-full mt-20 p-8 border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-center text-[#7b9fb8] mb-4">Contact us</h2>
          <h1 className="text-center text-2xl font-bold mb-6">Get in touch</h1>
          <p className="text-center mb-8">
            We'd love to hear from you. Please fill out this form.
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-black">Subject</label>
              <input
                name="subject"
                type="text"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="What is your concern"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Full Name</label>
              <input
                name="fullname"
                type="text"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Email</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Your@email.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Message</label>
              <textarea
                name="message"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Message"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" required className="mr-2" />
                <span className="text-black">
                  You agree to our friendly{" "}
                  <a href="/privacy-policy" className="text-[#ADD1E9]">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00003C] text-white py-2 rounded-md"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

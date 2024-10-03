import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();

  const handleBackToRegister = () => {
    navigate(-1);
  };

  useEffect(() => {


 
  }, []);

  return (
    <section className="flex justify-center items-center min-h-screen py-20 bg-white">
      <div
        className="max-w-4xl w-full mx-auto p-8 border border-gray-200 rounded-lg shadow-lg"
        style={{ userSelect: "none" }}
      >
        <h1 className="text-center text-3xl font-bold mb-6">Disclaimer</h1>
        <p className="mb-4">
          Welcome to FishLens. This Disclaimer outlines the limitations of
          liability regarding the use of our website and services. By using our
          services, you agree to the terms outlined in this Disclaimer.
        </p>

        <Section title="1. No Professional Advice">
          <p>
            The information provided on our website is for general informational
            purposes only. It is not intended as, and should not be construed
            as, professional advice. We recommend seeking the advice of a
            professional regarding your specific situation.
          </p>
        </Section>

        <Section title="2. Accuracy of Information">
          <p>
            While we strive to ensure that the information on our website is
            accurate and up to date, we make no representations, warranties, or
            guarantees, whether express or implied, that the content is
            accurate, complete, or up to date. Your use of the information on
            our website is at your own risk.
          </p>
        </Section>

        <Section title="3. External Links">
          <p>
            Our website may contain links to external websites that are not
            provided or maintained by FishLens. We do not guarantee the
            accuracy, relevance, timeliness, or completeness of any information
            on these external websites.
          </p>
        </Section>

        <Section title="4. Limitation of Liability">
          <p>
            In no event shall FishLens, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the website; (ii) any conduct or content
            of any third party on the website; (iii) any content obtained from
            the website; and (iv) unauthorized access, use, or alteration of
            your transmissions or content, whether based on warranty, contract,
            tort (including negligence), or any other legal theory, whether or
            not we have been informed of the possibility of such damage.
          </p>
        </Section>

        <Section title="5. 'As Is' and 'As Available' Disclaimer">
          <p>
            The website is provided on an "AS IS" and "AS AVAILABLE" basis. The
            website is provided without warranties of any kind, whether express
            or implied, including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement,
            or course of performance.
          </p>
          <p>
            FishLens does not warrant that (a) the website will function
            uninterrupted, secure, or available at any particular time or
            location; (b) any errors or defects will be corrected; (c) the
            website is free of viruses or other harmful components; or (d) the
            results of using the website will meet your requirements.
          </p>
        </Section>

        <Section title="6. Changes to This Disclaimer">
          <p>
            We may update this Disclaimer from time to time. We will notify you
            of any changes by posting the new Disclaimer on this page. You are
            advised to review this Disclaimer periodically for any changes.
          </p>
        </Section>

        <Section title="7. Contact Us">
          <p>
            If you have any questions about this Disclaimer, please contact us
            at:
          </p>
          <address className="mt-2">
            FishLens <br />
            Siniloan, Laguna <br />
            Email: fishlens.help@gmail.com <br />
            Phone: 09062442354
          </address>
        </Section>

        <button
          onClick={handleBackToRegister}
          className="w-full bg-[#00003C] text-white py-2 rounded-md mt-6"
        >
          Back to Page
        </button>
      </div>
    </section>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="font-bold text-2xl mb-2">{title}</h2>
    {children}
  </div>
);

export default Disclaimer;

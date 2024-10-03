import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TermsNCondition = () => {
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
        <h1 className="text-center text-3xl font-bold mb-6">
          Terms and Conditions
        </h1>
        <p className="mb-4">
          Welcome to FishLens. These Terms and Conditions outline the rules and
          regulations for the use of our application and services.
        </p>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using our application, you agree to be bound by
            these Terms and Conditions and our Privacy Policy. If you do not
            agree with any part of the terms, you must not use our application.
          </p>
        </Section>

        <Section title="2. Use of the Application">
          <p>
            You agree to use our application only for lawful purposes and in a
            way that does not infringe the rights of others or restrict or
            inhibit anyone else's use and enjoyment of the application.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              You must not misuse our application by knowingly introducing
              viruses, trojans, worms, logic bombs, or other material that is
              malicious or technologically harmful.
            </li>
            <li>
              You must not attempt to gain unauthorized access to our
              application, the server on which our application is stored, or any
              server, computer, or database connected to our application.
            </li>
          </ul>
        </Section>

        <Section title="3. Account Registration">
          <p>
            To access certain features of our application, you may need to
            register for an account. You agree to provide accurate, current, and
            complete information during the registration process and to update
            such information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for any
            activities or actions under your account. You agree to notify us
            immediately of any unauthorized use of your account.
          </p>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            Unless otherwise stated, FishLens owns the intellectual property
            rights for all material on this application. All intellectual
            property rights are reserved. You may access this from our
            application for your own personal use subjected to restrictions set
            in these terms and conditions.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>You must not republish material from our application.</li>
            <li>
              You must not sell, rent, or sub-license material from our
              application.
            </li>
            <li>
              You must not reproduce, duplicate, or copy material from our
              application.
            </li>
            <li>You must not redistribute content from our application.</li>
          </ul>
        </Section>

        <Section title="5. User Content">
          <p>
            Our application may allow you to post, link, store, share, and
            otherwise make available certain information, text, graphics,
            videos, or other material ("User Content"). You are responsible for
            the User Content that you post and for ensuring that it does not
            violate any laws or the rights of any person.
          </p>
          <p>
            By posting User Content, you grant FishLens a non-exclusive,
            worldwide, royalty-free, perpetual, and irrevocable license to use,
            reproduce, modify, publish, translate, distribute, and display such
            content in any media.
          </p>
        </Section>

        <Section title="6. Termination">
          <p>
            We may terminate or suspend your access to our application
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach these Terms
            and Conditions.
          </p>
          <p>
            Upon termination, your right to use the application will cease
            immediately. If you wish to terminate your account, you may simply
            discontinue using the application.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            In no event shall FishLens, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the application; (ii) any conduct or
            content of any third party on the application; (iii) any content
            obtained from the application; and (iv) unauthorized access, use, or
            alteration of your transmissions or content, whether based on
            warranty, contract, tort (including negligence), or any other legal
            theory, whether or not we have been informed of the possibility of
            such damage.
          </p>
        </Section>

        <Section title="8. Disclaimer">
          <p>
            Your use of the application is at your sole risk. The application is
            provided on an "AS IS" and "AS AVAILABLE" basis. The application is
            provided without warranties of any kind, whether express or implied,
            including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement,
            or course of performance.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of FishLens, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            application, and supersede and replace any prior agreements we might
            have had between us regarding the application.
          </p>
        </Section>

        <Section title="10. Changes to Terms and Conditions">
          <p>
            We may update our Terms and Conditions from time to time. We will
            notify you of any changes by posting the new Terms and Conditions on
            this page. You are advised to review these Terms and Conditions
            periodically for any changes. Changes to these Terms and Conditions
            are effective when they are posted on this page.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
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

export default TermsNCondition;

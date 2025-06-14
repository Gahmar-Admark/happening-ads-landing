// pages/_app.js (or component location)
import { useEffect, useState } from 'react';
import { getFaqs } from "../../../services/service.js";

export default function AccordionExample() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Dynamically import Bootstrap JS on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
  getFaqs()
    .then((data) => {
      console.log('Fetched FAQs:', data); // 👈 Check the actual structure
      setFaqs(data.data);
    })
    .catch(console.error);
}, []);


  return (
    <section className="light_grey_bg offering_section faq_section">
      <div className="container">
        <h2 className="page_heading text-center mb-5" data-aos="fade-up" data-aos-delay="200">FAQ</h2>
        <div className="row">
          <div className="col-md-12">
            <div className="accordion" id="accordionExample">
              {faqs.map((faq, index) => {
                const collapseId = `collapse${index}`;
                const headingId = `heading${index}`;

                return (
                  <div className="accordion-item" key={faq.id || index}>
                    <h2 className="accordion-header" id={headingId}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded="false"
                        aria-controls={collapseId}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className="accordion-collapse collapse"
                      aria-labelledby={headingId}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
              {faqs.length === 0 && (
                <div className="text-center p-4">No FAQs available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

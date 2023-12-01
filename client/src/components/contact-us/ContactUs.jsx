import React, {useState} from "react";

export default function ContactUs() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setFormSubmitted(true); 
  };

    return (
        <div>
          <section id="contact-details">
            <div className="details">
              <h2>Visit one of our agency location or contact us today</h2>
              <h3>Head Office</h3>
              <div>
                <li>
                  <i className="far fa-map" />
                  <p>Sofia, Bulgaria</p>
                </li>
                <li>
                  <i className="far fa-envelope" />
                  <p>mycar@gmail.com</p>
                </li>
                <li>
                  <i className="far fa-phone-alt" />
                  <p>+359 048585881</p>
                </li>
                <li>
                  <i className="far fa-clock" />
                  <p>Monday to Saturday: 9.00am to 16.pm</p>
                </li>
              </div>
            </div>
            <div className="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42.6977!2d23.3219!3d42.6977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sbg!2sfi!5e0!3m2!1sbg!2sfi!16z15
              " width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </section>
          <section id="form-details">
          {formSubmitted ? (
          <h1>Form Submitted! Thank you for your message.</h1>
        ) : (
          <form onSubmit={handleSubmit}>
            <span>LEAVE A MESSAGE</span>
            <h2>We love to hear from you</h2>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="E-mail" />
            <input type="text" placeholder="Subject" />
            <textarea
              name="yourTextArea"
              id="yourTextAreaId"
              cols={30}
              rows={10}
              placeholder="Your Message"
              defaultValue={""}
            />
            <button className="normal" type="submit">
              Submit
            </button>
          </form>
        )}
            <div className="people">
              <h1>Our Team</h1>
              <div>
                <img src="/images/MV5BNjg3ZjZhNzEtNWE3OC00MTlkLWIyNDQtZDc0ZTVjMTlhNzRkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" alt="" />
                <p><span>Mark Oliver</span> Senior Marketing Maneger <br />Phone: +000 123 000 77 88 <br />Email: contact@example.com</p>
              </div>
              <div>
                <img src="/images/500x500.jpeg" alt="" />
                <p><span>Alissa Aliston.</span> Photographer <br />Phone: +000 123 000 77 88 <br />Email: contact@example.com</p>
              </div>
              <div>
                <img src="/images/1200px-Tom_Hardy_by_Gage_Skidmore.jpeg" alt="" />
                <p><span>Tom Swarc</span> Senior Web Developer <br />Phone: +000 123 000 77 88 <br />Email: contact@example.com</p>
              </div>
            </div>
          </section>
        </div>
      );
}
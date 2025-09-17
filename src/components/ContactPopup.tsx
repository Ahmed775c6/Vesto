import { Component, JSX, onCleanup } from "solid-js";
import "./styles/contactPopup.css"

interface ContactPopupProps {
  onClose: () => void;
}

const ContactPopup: Component<ContactPopupProps> = (props) => {
  // Handle escape key to close popup
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      props.onClose();
    }
  };

  // Add event listener when component mounts
  document.addEventListener("keydown", handleKeyDown);
  
  // Clean up event listener when component unmounts
  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });

  // Handle background click to close popup
  const handleBackgroundClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  // Function to handle email click
  const handleEmailClick = () => {
    window.location.href = "mailto:support@vestoapp.com";
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  // Function to handle Telegram click
  const handleTelegramClick = () => {
    window.open("https://t.me/vestoapp", "_blank");
  };

  return (
    <div class="contact-popup-overlay" onClick={handleBackgroundClick}>
      <div class="contact-popup-content">
        <div class="contact-popup-header">
          <h2>Contact Us</h2>
          <button class="close-button" onClick={props.onClose}>
            &times;
          </button>
        </div>
        
        <div class="contact-popup-body">
          <p>We'd love to hear from you! Reach out to us through any of these channels:</p>
          
          <div class="contact-methods">
            <div class="contact-method" onClick={handleEmailClick}>
              <div class="contact-icon">✉️</div>
              <div class="contact-info">
                <h3>Email</h3>
                <p>support@vestoapp.com</p>
              </div>
            </div>
            
            <div class="contact-method" onClick={handleWhatsAppClick}>
              <div class="contact-icon">💚</div>
              <div class="contact-info">
                <h3>WhatsApp</h3>
                <p>+1 (234) 567-890</p>
              </div>
            </div>
            
            <div class="contact-method" onClick={handleTelegramClick}>
              <div class="contact-icon">📮</div>
              <div class="contact-info">
                <h3>Telegram</h3>
                <p>@vestoapp</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-popup-footer">
          <p>We typically respond within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
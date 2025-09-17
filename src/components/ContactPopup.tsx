import { Component, JSX, onCleanup } from "solid-js";

interface ContactPopupProps {
  onClose: () => void;
}

// Gmail Icon Component
const GmailIcon = () => (
  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-5.727V12.91H24V5.457zM5.455 5.455C2.443 5.455 0 7.896 0 10.909v8.727c0 .904.732 1.636 1.636 1.636h5.727V12.91H2.182v-2.728h5.727V5.455H5.455zM21.818 0H2.182C.982 0 0 .982 0 2.182v1.636h12V7.09h12V2.182C24 .982 23.018 0 21.818 0z"/>
  </svg>
);

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
  </svg>
);

// Telegram Icon Component
const TelegramIcon = () => (
  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
  </svg>
);

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
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div class="bg-white dark:bg-gray-800 rounded-sm w-11/12 max-w-[450px] shadow-xl overflow-hidden animate-popIn">
        <div class="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-primary">
          <h2 class="m-0 text-xl font-semibold text-gray-800 dark:text-gray-200">Contact Us</h2>
          <button 
            class="bg-transparent border-none text-2xl cursor-pointer text-gray-100 p-0 w-8 h-8 flex justify-center items-center rounded-full transition-colors hover:bg-white hover:text-gray-800 "
            onClick={props.onClose}
          >
            &times;
          </button>
        </div>
        
        <div class="p-5">
          <p class="mt-0 mb-6 text-gray-600 dark:text-gray-400">
            We'd love to hear from you! Reach out to us through any of these channels:
          </p>
          
          <div class="flex flex-col gap-4">
            {/* Email/Gmail Option */}
            <div 
              class="flex items-center p-4 rounded-sm bg-gray-50 cursor-pointer transition-all border border-transparent hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-0.5 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-600"
              onClick={handleEmailClick}
            >
              <div class="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <GmailIcon />
              </div>
              <div>
                <h3 class="m-0 mb-1 text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h3>
                <p class="m-0 text-gray-600 dark:text-gray-400 text-sm">support@vestoapp.com</p>
              </div>
            </div>
            
            {/* WhatsApp Option */}
            <div 
              class="flex items-center p-4 rounded-sm bg-gray-50 cursor-pointer transition-all border border-transparent hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-0.5 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-600"
              onClick={handleWhatsAppClick}
            >
              <div class="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <WhatsAppIcon />
              </div>
              <div>
                <h3 class="m-0 mb-1 text-lg font-semibold text-gray-800 dark:text-gray-200">WhatsApp</h3>
                <p class="m-0 text-gray-600 dark:text-gray-400 text-sm">+1 (234) 567-890</p>
              </div>
            </div>
            
            {/* Telegram Option */}
            <div 
              class="flex items-center p-4 rounded-sm bg-gray-50 cursor-pointer transition-all border border-transparent hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-0.5 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-600"
              onClick={handleTelegramClick}
            >
              <div class="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <TelegramIcon />
              </div>
              <div>
                <h3 class="m-0 mb-1 text-lg font-semibold text-gray-800 dark:text-gray-200">Telegram</h3>
                <p class="m-0 text-gray-600 dark:text-gray-400 text-sm">@vestoapp</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-4 border-t border-gray-200 text-center bg-blue-600 dark:border-gray-700 dark:bg-gray-700">
          <p class="m-0 text-sm text-white dark:text-gray-300">We typically respond within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
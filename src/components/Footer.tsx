import ContactPopup from "./ContactPopup";
import { Show,createSignal } from "solid-js";
const Footer = () => {
      const [showContact, setShowContact] = createSignal(false);
  return (
  <footer class="w-full  bottom-0 left-0 z-10 bg-white/80 dark:bg-slate-900/80 p-6 flex items-center justify-center text-center">
     <div class="mt-auto   ">
          <p class="text-center  text-gray-500 text-sm">
            Need help?{" "}
            <button 
              type="button" 
              class="text-[#4169E1] bg-transparent transition-all hover:underline hover:text-[#5A7DFF]"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
         
          </p>
        </div>
  <Show when={showContact()}>
        <ContactPopup onClose={() => setShowContact(false)} />
      </Show>
  </footer>
  )
}

export default Footer

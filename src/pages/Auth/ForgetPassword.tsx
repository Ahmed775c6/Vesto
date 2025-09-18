import { createSignal, Show, Component } from "solid-js";
import LoadingPopup from "../../components/LoadingAuthification";
import ContactPopup from "../../components/ContactPopup";
interface FormErrors {
  email?: string;
  submit?: string;
}


const ForgetPassword: Component = () => {
  const [email, setEmail] = createSignal("");
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [showLoading, setShowLoading] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [showContact, setShowContact] = createSignal(false);
  // Validate form inputs
  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    
    if (!email()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setIsSubmitting(true);
    setShowLoading(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      setShowLoading(false);
      return;
    }
    
    try {
      // Add a small delay to show the loading popup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate sending reset email (replace with actual Tauri command)
      console.log("Sending reset email to:", email());
      
      // Simulate successful submission
      setIsSubmitted(true);
      setErrors({});
      
    } catch (error) {
      setErrors({ submit: "Failed to send reset email. Please try again." });
      console.error("Reset password error:", error);
    } finally {
      setIsSubmitting(false);
      setShowLoading(false);
    }
  }

  function handleBackToLogin() {
    // Navigate back to login page
    window.location.href = "/";
  }

  return (
    <main class="w-full h-screen flex">
      <div class="w-full bg-image-101 h-full hidden md:block relative">
        {/* Background image would be here */}
      </div>
      
      <div class="w-full h-full flex bg-gray-900 flex-col gap-6 p-8 overflow-y-auto">
        <div class="text-center">
          <h1 class="text-3xl dark:text-white text-gray-900 font-semibold mb-2">
            Forgot Password?
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            {isSubmitted() 
              ? "Check your email for reset instructions" 
              : "Enter your email to reset your password"
            }
          </p>
        </div>

        <Show when={!isSubmitted()}>
          <form onSubmit={handleSubmit} class="space-y-6">
            <div>
              <label class="flex gap-3 text-gray-300 mb-2">
                Email Address : <span class="text-rose-500 text-xl">*</span>
              </label>
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                class="p-4 rounded-sm br dark:bg-gray-800 bg-gray-100 w-full border border-gray-300 dark:border-gray-600 text-white placeholder-gray-400" 
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                classList={{ "border-rose-500": !!errors().email }}
                disabled={isSubmitting()}
              />
              <Show when={errors().email}>
                <p class="text-rose-500 text-sm mt-1">{errors().email}</p>
              </Show>
            </div>

            <Show when={errors().submit}>
              <p class="text-rose-500 text-sm text-center">{errors().submit}</p>
            </Show>

            <button 
              type="submit" 
              class="bg-[#4169E1] text-white py-3 px-6 rounded-sm w-full hover:bg-[#5A7DFF] transition-colors disabled:opacity-50 font-medium"
              disabled={isSubmitting()}
            >
              {isSubmitting() ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
            
          </form>
        </Show>

        <Show when={isSubmitted()}>
          <div class="text-center p-6 bg-gray-800 rounded-sm">
            <div class="text-[#48D1CC] text-9xl mb-2">✓</div>
            <h3 class="text-xl font-semibold text-white mb-2">
              Reset Link Sent!
            </h3>
            <p class="text-gray-400 mb-4">
              We've sent a password reset link to <strong class="text-white">{email()}</strong>
            </p>
            <p class="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>

          <button 
            onClick={handleBackToLogin}
            class="bg-[#4169E1] text-white py-3 px-6 rounded-sm w-full hover:bg-[#5A7DFF] transition-colors font-medium"
          >
            Back to Login
          </button>
        </Show>

        <div class="text-center mt-8">
          <button 
            onClick={handleBackToLogin}
            class="text-[#4169E1] hover:text-[#5A7DFF] p-2 transition-colors hover:underline text-sm"
          >
            ← Back to Sign In
          </button>
        </div>

  <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-center text-gray-500 text-sm">
            Need help?{" "}
            <button 
              type="button" 
              class="thover:text-[#5A7DFF] text-[#4169E1] transition-colors  hover:underline"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
          </p>
        </div>
      </div>
  <Show when={showContact()}>
        <ContactPopup onClose={() => setShowContact(false)} />
      </Show>

      {/* Loading Popup */}
      <Show when={showLoading()}>
        <LoadingPopup action="Sending reset link" msg="Please wait while we process your request" />
      </Show>
    </main>
  );
};

export default ForgetPassword;
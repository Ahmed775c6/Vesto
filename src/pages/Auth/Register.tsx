import { createSignal, Show, Component } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import ContactPopup from "../../components/ContactPopup";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  submit?: string;
}

const Register: Component = () => {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [company, setCompany] = createSignal("");
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [showContact, setShowContact] = createSignal(false);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  // Validate form inputs
  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    
    if (!name()) newErrors.name = "Name is required";
    if (!email()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password()) {
      newErrors.password = "Password is required";
    } else if (password().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
      setGreetMsg(await invoke("greet", { name: name() }));
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", { 
        name: name(), 
        email: email(), 
        password: password(), 
        company: company() 
      });
      
      // Reset form after successful submission
      setName("");
      setEmail("");
      setPassword("");
      setCompany("");
      setErrors({});
    } catch (error) {
      setErrors({ submit: "Failed to submit form. Please try again." });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main class="w-full h-screen flex">
      <div class="w-full bg-image-101 h-full hidden md:block relative">
   
      </div>
      <form onSubmit={handleSubmit} class="w-full h-full flex bg-gray-900 flex-col gap-3 p-6 overflow-y-auto">
        <h1 class="text-3xl dark:text-white text-gray-900 font-semibold">Welcome to Vesto ✌️</h1>
        <p class="text-gray-600 dark:text-gray-400">Create your account to get started</p>

        <div class="mt-4">
          <label class="flex gap-3">
            Your name : <span class="text-rose-500 text-xl">*</span>
          </label>
          <input 
            type="text" 
            placeholder="your name ... " 
            class="p-4 rounded-md dark:bg-gray-900 bg-gray-100 w-full mt-1 border border-gray-300 dark:border-gray-600" 
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            classList={{ "border-rose-500": !!errors().name }}
          />
          <Show when={errors().name}>
            <p class="text-rose-500 text-sm mt-1">{errors().name}</p>
          </Show>
        </div>

        <div>
          <label class="flex gap-3">
            Email : <span class="text-rose-500 text-xl">*</span>
          </label>
          <input 
            type="email" 
            placeholder="your email ... " 
            class="p-4 rounded-md dark:bg-gray-900 bg-gray-100 w-full mt-1 border border-gray-300 dark:border-gray-600" 
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            classList={{ "border-rose-500": !!errors().email }}
          />
          <Show when={errors().email}>
            <p class="text-rose-500 text-sm mt-1">{errors().email}</p>
          </Show>
        </div>

        <div>
          <label class="flex gap-3">
            Password : <span class="text-rose-500 text-xl">*</span>
          </label>
          <input 
            type="password" 
            placeholder="your password ... " 
            class="p-4 rounded-md dark:bg-gray-900 bg-gray-100 w-full mt-1 border border-gray-300 dark:border-gray-600" 
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            classList={{ "border-rose-500": !!errors().password }}
          />
          <Show when={errors().password}>
            <p class="text-rose-500 text-sm mt-1">{errors().password}</p>
          </Show>
        </div>

        <div>
          <label>Your Company Name :</label>
          <input 
            type="text" 
            placeholder="your Company name ... " 
            class="p-4 rounded-md dark:bg-gray-900 bg-gray-100 w-full mt-1 border border-gray-300 dark:border-gray-600" 
            value={company()}
            onInput={(e) => setCompany(e.currentTarget.value)}
          />
        </div>

        <Show when={errors().submit}>
          <p class="text-rose-500 text-sm">{errors().submit}</p>
        </Show>

        <button 
          type="submit" 
          class="bg-[#4169E1] text-white py-2 px-4 rounded-md mt-2 hover:bg-[#5A7DFF] transition-colors disabled:opacity-50"
          disabled={isSubmitting()}
        >
          {isSubmitting() ? "Creating Account..." : "Create Account"}
        </button>

        <p class="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/" class="hover:text-[#5A7DFF] text-[#4169E1] transition-colors hover:underline">Sign In</a>
        </p>

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
      </form>

      <Show when={showContact()}>
        <ContactPopup onClose={() => setShowContact(false)} />
      </Show>
    </main>
  );
};

export default Register;
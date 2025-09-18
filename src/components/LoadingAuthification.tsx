
const LoadingPopup = ({action,msg} : {action :string , msg : string}) => {
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-t-[#4169E1] border-gray-300 rounded-full animate-spin mb-4"></div>
        <p class="text-white text-lg font-medium">{action}...</p>
        <p class="text-gray-400 text-sm">{msg}</p>
      </div>
    </div>
  );
};
export default LoadingPopup;
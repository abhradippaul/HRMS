import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://img1.wsimg.com/isteam/ip/3e831d92-2dff-475c-b103-226f46aca147/logo.png/:/rs=w:195,h:75,cg:true,m/cr=w:195,h:75/qt=q:95"
            alt="Zoho Logo"
            className="h-10"
          />
        </div>

        {/* Sign-in Header */}
        <h2 className="text-xl font-semibold text-center mb-2">Sign in</h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          to access People
        </p>

        {/* Input Field */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address or mobile number"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            // variant="secondary"
            // type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            Next
          </Button>
        </form>

        {/* Smart Sign-in */}
        <div className="flex justify-end mt-4">
          <button className="flex items-center text-blue-600 hover:text-blue-700 space-x-2">
            <span>✨</span>
            <span>Try smart sign-in</span>
          </button>
        </div>

        {/* Social Sign-in */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500 mb-4">
            Sign in using
          </p>
          <div className="flex justify-center space-x-4">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <img src="/icons/google.svg" alt="Google" className="h-6 w-6" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="h-6 w-6"
              />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <img
                src="/icons/microsoft.svg"
                alt="Microsoft"
                className="h-6 w-6"
              />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <img src="/icons/github.svg" alt="GitHub" className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Sign-up link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don’t have a Zoho account?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up now
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-400 text-center">
          © 2024, Zoho Corporation Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default App;

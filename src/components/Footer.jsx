import { Link } from "react-router-dom";
import { Home, UserPlus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white bg-opacity-90 dark:bg-gray-800 w-full py-4 fixed bottom-0 left-0">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex justify-center items-center space-x-20"> {/* Distância reduzida */}
          <Link to="/" aria-label="Go to Main Tab" className="p-2">
            <Home className="h-6 w-6 md:h-5 md:w-5" />
          </Link>
          <Link to="/register-drink" aria-label="Register for Publication" className="p-2">
            <UserPlus className="h-6 w-6 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

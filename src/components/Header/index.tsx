import { LayoutDashboard, LogIn, User, ChevronDown, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router";

const carBrands = [
  { name: "Totota", href: "/cars/sedans" },
  { name: "FORD", href: "/cars/suvs" },
  { name: "Nissan", href: "/cars/hatchbacks" },
  { name: "Honda", href: "/cars/pickup" },
  { name: "Mazda", href: "/cars/minivans" },
  { name: "Mercedes", href: "/cars/sports" },
];

export function Header() {
  const { signed, loadingAuth, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 lg:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <h1 className="text-red-600 text-2xl md:text-3xl font-bold">LowPrice</h1>
            <span className="text-slate-900 text-2xl md:text-3xl font-bold">Cars</span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-700 hover:text-red-600 transition-colors font-medium">
              Marcas
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
              {carBrands.map((brand) => (
                <Link
                  key={brand.name}
                  to={brand.href}
                  className="block px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/deals" className="text-slate-700 hover:text-red-600 transition-colors font-medium">
            Promoções
          </Link>
          <Link to="/about" className="text-slate-700 hover:text-red-600 transition-colors font-medium">
            Sobre
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {signed === false && loadingAuth === false && (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <LogIn size={18} />
              Entrar
            </Link>
          )}
          {signed && loadingAuth === false && (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-black font-semibold text-sm">{user?.name}</span>
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors">
                <User size={20} />
              </button>
              <Link
                className="bg-red-600 hover:bg-red-700 h-10 w-10 flex items-center justify-center rounded-lg transition-colors"
                to="/dashboard"
              >
                <LayoutDashboard color="white" size={20} />
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-700 hover:text-red-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col p-4 gap-2">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-600 px-2">Marcas</p>
              {carBrands.map((brand) => (
                <Link
                  key={brand.name}
                  to={brand.href}
                  className="block px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {brand.name}
                </Link>
              ))}
            </div>
            <Link
              to="/deals"
              className="block px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Promoções
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            {signed === false && loadingAuth === false && (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn size={18} />
                Entrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

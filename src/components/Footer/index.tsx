import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
                   <h3 className="text-red-600 text-xl md:text-2xl font-bold">LowPrice<span className="text-black">Cars🏎</span></h3>
            <p className="text-gray-300 text-sm">
              Encontre o carro dos seus sonhos com facilidade e segurança.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-red-600 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-red-600 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-red-600 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-red-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+258" className="flex items-center gap-2 text-gray-300 hover:text-red-600 transition-colors">
                <Phone size={18} />
                <span className="text-sm">+258 84 000 0000</span>
              </a>
              <a href="mailto:info@automarket.com" className="flex items-center gap-2 text-gray-300 hover:text-red-600 transition-colors">
                <Mail size={18} />
                <span className="text-sm">info@automarket.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={18} />
                <span className="text-sm">Maputo, Moçambique</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} AutoMarket. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
              Termos de Serviço
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

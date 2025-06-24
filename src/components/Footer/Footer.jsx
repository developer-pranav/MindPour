import React from 'react';
import { BlogLogo } from '../index';
import { FaGithub, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 w-full">
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-600 space-y-4">
        <div className="flex items-center space-x-2">
          <span>© {new Date().getFullYear()} Pranav</span>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/developer-pranav"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://instagram.com/developer.pranav"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
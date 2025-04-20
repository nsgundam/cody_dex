export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 text-sm py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono">© 2025 CODYDEX. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/nurunat.suttibutr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Facebook
            </a>
            <a
              href="https://github.com/nsgundam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              GitHub
            </a>
            <a
              href="mailto:narunat.su66@rsu.ac.th"
              className="hover:text-yellow-400 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
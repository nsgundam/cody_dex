"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { name: "HTML", href: "/html" },
    { name: "CSS", href: "/css" },
    { name: "JavaScript", href: "/javascript" },
    { name: "Java", href: "/java" },
    { name: "Python", href: "/python" },
  ];

  return (
    <main className="bg-cyan-900 text-white min-h-screen">
      <nav className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl text-yellow-400 font-mono font-bold">CODY DEX</div>

          <div className="relative group hidden md:flex space-x-6 text-lg font-medium">
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="font-mono cursor-pointer hover:text-yellow-400 transition">
                Explore Lessons
              </div>

              {showDropdown && (
                <div className="absolute top-full mt-0 left-0 bg-white text-black rounded shadow-lg z-10 w-48">
                  {languages.map((lang) => (
                    <Link
                      key={lang.name}
                      href={lang.href}
                      className="block px-4 py-2 hover:bg-yellow-100 hover:text-yellow-500"
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="font-mono hover:text-yellow-400 transition">
              Practice Coding
            </a>
          </div>
        </div>
      </nav>

      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">
          Let's learn code with{" "}
          <span className="text-yellow-400">CODY DEX</span>
        </h1>
        <p className="text-lg text-gray-300 font-mono max-w-2xl mx-auto">
          Code, Practice, Build, Your developer journey starts here 🌱
        </p>
      </section>

      {languages.map((lang) => (
        <LanguageSection key={lang.name} language={lang} />
      ))}
    </main>
  );
}

function LanguageSection({ language }) {
  const sampleCodes = {
    HTML: `<!DOCTYPE html>
<html>
  <head>
    <title>HTML Tutorial</title>
  </head>
  <body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>`,

    CSS: `body {
  background-color: lightblue;
}
h1 {
  color: white;
  text-align: center;
}
p {
  font-family: verdana;
}`,

    JavaScript: `let x = 5;
let y = 10;
let sum = x + y;
console.log("Sum:", sum);`,

    Java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

    Python: `def greet(name):
  print(f"Hello, {name}!")
greet("World")`,
  };

  const bgColorMap = {
    HTML: "bg-green-100",
    CSS: "bg-yellow-100",
    JavaScript: "bg-blue-100",
    Java: "bg-purple-100",
    Python: "bg-pink-200",
  };

  return (
    <section className={`${bgColorMap[language.name]} py-16`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-mono font-bold text-black mb-2">
            {language.name}
          </h2>
          <p className="text-black font-mono mb-4">
            {getLanguageDescription(language.name)}
          </p>
          <div className="space-y-2">
            <Link href={language.href}>
              <button className="bg-green-500 text-white font-mono px-4 py-2 rounded">
                Learn {language.name}
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded shadow-lg p-6">
          <pre className="text-left text-sm text-gray-800 overflow-x-auto">
            <code>{sampleCodes[language.name]}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function getLanguageDescription(language) {
  switch (language) {
    case "HTML":
      return "The language for building web pages";
    case "CSS":
      return "The language for styling web pages";
    case "JavaScript":
      return "The language for making web pages interactive";
    case "Java":
      return "A powerful object-oriented programming language";
    case "Python":
      return "A popular language for AI, data science, and web development";
    default:
      return "";
  }
}

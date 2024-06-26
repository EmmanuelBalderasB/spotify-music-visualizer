/* eslint-disable react/prop-types */
import NavItem from "./NavItem";

const navItems = [
  { href: "#home", text: "HOME" },
  { href: "#about", text: "ABOUT" },
  { href: "#faq", text: "FAQ" },
  { href: "#contact", text: "CONTACT" },
];

export default function Navbar(props) {
  return (
    <nav className="flex flex-row justify-evenly w-full p-2 bg-black bg-opacity-0">
      {navItems.map((item, i) => (
        <NavItem
          handler={() => props.handler(item.text.toLowerCase())}
          key={i}
          href={item.href}
          text={item.text}
          styling="px-4 py-2
          rounded animate-fade-in border-2 border-yellow-100
          text-yellow-100 hover:bg-yellow-100 
          hover:text-black hover:bg-yellow-100 duration-300 bg-black"
        />
      ))}
    </nav>
  );
}

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()


  const isLoggedIn = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const user_image = JSON.parse(user)


  const logout =  () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem("user")
      navigate('/signin')


    }catch(err) {
      console.log("Something went wrong while logging out ")
    }
  }


  // console.log("is loggedn", isLoggedIn)

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">AI</span>
            </div>
            <span className="font-bold text-xl">InterviewPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="#testimonials" className="text-foreground hover:text-primary transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <img src={user_image?.avatar} alt="image" className="h-[2.5rem] w-[2.5rem] rounded-full" />
            ): (
              <Link to="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>

            )}
            
            <Link to={isLoggedIn ? '/interview' : 'signin'}>
              <Button variant="hero">Get Started</Button>
            </Link>

            {
              isLoggedIn && (
                <div className="text-gray-700 pl-12 cursor-pointer rounded-md" onClick={logout}>
                  Logout
                </div>
              )
            }
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#features"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="#testimonials"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <div className="pt-4 space-y-2">
              <Link to="/signin" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="hero" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/**
 * Navbar Component
 * Main navigation bar with logo, links, and mobile menu
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChefHat, Search, User, BookmarkIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchDialog } from './SearchDialog';
import { useAuth } from '@/context';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Recipes', path: '/recipes' },
    { name: 'Submit Recipe', path: '/submit' },
    { name: 'Categories', path: '/categories' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // Check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="font-display text-xl lg:text-2xl font-bold">
                TastyBites
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Saved Recipes */}
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
              </Link>

              {/* User Menu / Login */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" className="gap-2">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                      <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-destructive"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="font-medium">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="my-2 border-border" />
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                      <span className="font-medium">{user?.name}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full font-medium">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Navbar;

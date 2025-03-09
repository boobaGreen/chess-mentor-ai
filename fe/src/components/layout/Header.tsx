import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Crown,
  Home,
  Play,
  Puzzle,
  Calendar,
  Eye,
  List,
  User,
  LogOut,
  Box,
  Menu,
  X,
  Users,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleCommunityMenu = () => {
    setCommunityOpen(!communityOpen);
  };

  // Dynamic navigation items based on auth state
  const navItems = [
    { to: "/", icon: <Home className="h-4 w-4" />, label: "Home" },
    { to: "/partita", icon: <Play className="h-4 w-4" />, label: "Play" },
    { to: "/puzzle", icon: <Puzzle className="h-4 w-4" />, label: "Puzzle" },

    // Protected routes - only show if user is authenticated
    ...(user
      ? [
          {
            to: "/tutor",
            icon: <Eye className="h-4 w-4" />,
            label: "Watch",
          },
          {
            to: "/sandbox",
            icon: <Box className="h-4 w-4" />,
            label: "SandBox",
          },
          {
            to: "/dashboard",
            icon: <List className="h-4 w-4" />,
            label: "Dashboard",
          },
        ]
      : []),

    // Community dropdown - always visible
    {
      type: "dropdown",
      label: "Community",
      icon: <Users className="h-4 w-4" />,
      items: [
        {
          to: "/events",
          icon: <Calendar className="h-4 w-4" />,
          label: "Eventi",
        },
        {
          to: "/friends",
          icon: <UserPlus className="h-4 w-4" />,
          label: "Friends",
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="font-bold">Chess Mentor AI</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => {
              if (item.type === "dropdown") {
                return (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-sm font-medium transition-colors hover:text-primary px-2 py-1 -mx-2"
                      >
                        <div className="flex items-center gap-1">
                          {item.icon} {item.label}
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-40 bg-white border border-gray-200 shadow-md"
                      align="end"
                    >
                      {item.items.map((subItem, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link to={subItem.to} className="w-full">
                            <div className="flex items-center gap-2">
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              } else {
                return (
                  <Link
                    key={item.to}
                    to={item.to || "#"}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    <div className="flex items-center gap-1">
                      {item.icon} {item.label}
                    </div>
                  </Link>
                );
              }
            })}
          </nav>

          {/* User Menu / Login Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full overflow-hidden p-0 border-1 hover:cursor-pointer"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata?.full_name || "Profile"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${
                          user.user_metadata?.full_name || "User"
                        }&background=random`;
                      }}
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white border border-gray-200 shadow-md"
                align="end"
                forceMount
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    {user.email && (
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navItems.map((item, index) => {
            if (item.type === "dropdown") {
              return (
                <div key={index}>
                  <button
                    className="flex items-center justify-between w-full gap-2 px-4 py-3 hover:bg-gray-100 border-b border-gray-100"
                    onClick={toggleCommunityMenu}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        communityOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {communityOpen && (
                    <div className="bg-gray-50">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.to}
                          className="flex items-center gap-2 px-8 py-3 hover:bg-gray-100 border-b border-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.icon}
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  key={item.to}
                  to={item.to || "#"}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      )}
    </header>
  );
};

export default Header;

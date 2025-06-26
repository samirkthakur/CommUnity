import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "../../components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from '../../components/mode-toggle'
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "sonner";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    })
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  }

  const handleProtectedNav = (path: string) => {
    if (!user) {
      toast.error("You must be logged in to access this section.");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="border-b shadow-sm bg-background py-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList className="space-x-12">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <button onClick={() => handleProtectedNav("/events")} className="cursor-pointer">
                  Events
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/create">Create Event</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="space-x-12">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button onClick={() => handleProtectedNav("/profile")} className="cursor-pointer">
                    Profile
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button onClick={handleLogout} className="cursor-pointer">
                      Logout
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-6"></div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

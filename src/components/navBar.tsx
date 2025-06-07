import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "../../components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ModeToggle } from '../../components/mode-toggle'

const Navbar = () => {
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
              <Link to="/events">Events</Link>
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
              <Link to="/profile">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
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

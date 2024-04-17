import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Icons } from "./ui/icons"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"


export function Navbar() {
    const [cartCount, setCartCount] = React.useState(1)
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList className="space-between">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <Icons.logo className="h-6 w-6" />
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                our webshop
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed T-Shirts with environment and sustainability in mind.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/admin" title="Admin">
                                    Login to view, edit & add products, (admin only)
                                </ListItem>
                                <ListItem href="/" title="Admin">
                                    Read more
                                </ListItem>
                                <ListItem href="/" title="Admin">
                                    Contact us
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger><img src="../../public/cart.svg" className="h-4" alt="" /><span className="relative text-xs mb-2 ml-1">{cartCount}</span></NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <h1>Cart</h1>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/" title="Cart" showRemoveButton={true}>
                                    T shirt white
                                </ListItem>
                                <ListItem href="/" title="Cart" showRemoveButton={true}>
                                    T shirt black
                                </ListItem>
                                <ListItem href="/" title="Cart" showRemoveButton={true}>
                                    T shirt purple
                                </ListItem>
                                <Button className="mt-6 bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black">Checkout</Button>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Separator />
        </>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { showRemoveButton?: boolean }
>(({ className, title, children, showRemoveButton, ...props }, ref) => {
    return (
        <li className="flex justify-between items-center hover:bg-accent hover:text-accent-foreground">
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        className
                    )}
                    {...props}
                >
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
            {showRemoveButton && (
                <button className="text-xs h-6 bg-white text-black border border-black px-3 py-1 hover:bg-black hover:text-white">
                    Remove
                </button>
            )}
        </li>
    );
});

ListItem.displayName = "ListItem";


ListItem.displayName = "ListItem"

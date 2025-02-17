"use client";

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteInfo } from "@/lib/constants";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const subMenuItemsOne = [
  {
    title: "Blog",
    description: "The latest industry news, updates, and info",
    icon: <Book className="size-5 shrink-0" />,
  },
  {
    title: "Company",
    description: "Our mission is to innovate and empower the world",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Careers",
    description: "Browse job listing and discover our workspace",
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Support",
    description:
      "Get in touch with our support team or visit our community forums",
    icon: <Zap className="size-5 shrink-0" />,
  },
];

const subMenuItemsTwo = [
  {
    title: "Help Center",
    description: "Get all the answers you need right here",
    icon: <Zap className="size-5 shrink-0" />,
  },
  {
    title: "Contact Us",
    description: "We are here to help you with any questions you have",
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Status",
    description: "Check the current status of our services and APIs",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Terms of Service",
    description: "Our terms and conditions for using our services",
    icon: <Book className="size-5 shrink-0" />,
  },
];

const Navbar = () => {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="flex items-center gap-2 relative">
                <Image
                  src={siteInfo.logo}
                  fill
                  className="h-8 w-auto"
                  alt="logo"
                />
                <span className="text-lg font-semibold">{siteInfo.name}</span>
              </div>
            </Link>
            <div className="flex items-center">
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/">
                Home
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="text-muted-foreground">
                    <NavigationMenuTrigger>
                      <span>Products</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-80 p-3">
                        <NavigationMenuLink>
                          {subMenuItemsOne.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                className={cn(
                                  "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                                href="#">
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="text-muted-foreground">
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-80 p-3">
                        <NavigationMenuLink>
                          {subMenuItemsTwo.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                className={cn(
                                  "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                                href="#">
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/write">
                Write
              </Link>
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/posts">
                Blog
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <Unauthenticated>
              <SignInButton>
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button size="sm">Sign up</Button>
              </SignUpButton>
            </Unauthenticated>

            <Authenticated>
              <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>

                <UserButton />

                <SignOutButton>
                  <Button variant="outline">Log out</Button>
                </SignOutButton>
              </div>
            </Authenticated>

            <ModeToggle />
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 relative">
                <Image
                  src={siteInfo.logo}
                  fill
                  className="h-8 w-auto"
                  alt="logo"
                />
                <span className="text-lg font-semibold">{siteInfo.name}</span>
              </div>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/">
                      <SheetClose asChild>
                        <div className="flex items-center gap-2 relative">
                          <Image
                            src={siteInfo.logo}
                            fill
                            className="h-8 w-auto"
                            alt="logo"
                          />
                          <span className="text-lg font-semibold">
                            {siteInfo.name}
                          </span>
                        </div>
                      </SheetClose>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-6 mt-6 flex flex-col gap-4">
                  <Link href="/" className="font-semibold">
                    <SheetClose asChild>Home</SheetClose>
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className="py-0 font-semibold hover:no-underline text-base">
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="mt-2">
                        {subMenuItemsOne.map((item, idx) => (
                          <SheetClose key={idx} asChild>
                            <Link href="#">
                              <div className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <SheetClose asChild>
                    <Link href="/write" className="font-semibold">
                      Write
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/posts" className="font-semibold">
                      Blog
                    </Link>
                  </SheetClose>
                </div>
                <div className="border-t py-4">
                  <div className="grid grid-cols-2 justify-start">
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#">
                        Press
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#">
                        Contact
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#">
                        Imprint
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#">
                        Sitemap
                      </Link>
                    </SheetClose>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Unauthenticated>
                    <SignInButton>
                      <SheetClose asChild>
                        <Button variant="outline">Log in</Button>
                      </SheetClose>
                    </SignInButton>
                    <SignUpButton>
                      <SheetClose asChild>
                        <Button>Sign up</Button>
                      </SheetClose>
                    </SignUpButton>
                  </Unauthenticated>

                  <Authenticated>
                    <SheetClose asChild>
                      <UserButton />
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/dashboard" className="w-full">
                        <Button className="w-full">Dashboard</Button>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <SignOutButton>
                        <Button variant="outline">Log out</Button>
                      </SignOutButton>
                    </SheetClose>
                  </Authenticated>

                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

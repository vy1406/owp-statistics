'use client'
import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    User,
    Button
} from "@nextui-org/react";
import styled from "styled-components";

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession();
    const isLoggedIn = session ? true : false;
    
    const menuItems = [
        { name: "All Applications", href: "/application", isAllowed: true },
        { name: "My Applications", href: "/application/my", isAllowed: isLoggedIn },
        { name: "New Application", href: "/application/new", isAllowed: isLoggedIn },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item.name}-${index}`}>
                        {item.isAllowed ?
                            <Link
                                className="w-full"
                                href={item.href}
                                size="lg"
                            >
                                {item.name}
                            </Link> :
                            <WrapDesktop>
                                <Span>{item.name}</Span>
                                <Hint>( must be logged in )</Hint>
                            </WrapDesktop>
                        }
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                {isLoggedIn ?
                    <>
                        <User name={session?.user?.username || 'Guest'} />
                    </>
                    :
                    <>
                        <NavbarItem >
                            <Link href="/signin">Sign In</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/signup" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                }

            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        {item.isAllowed ?
                            <Link
                                className="w-full"
                                href={item.href}
                                size="lg"
                            >
                                {item.name}
                            </Link> :
                            <WrapMobile>
                                <Span>{item.name}</Span>
                                <Hint>( must be logged in )</Hint>
                            </WrapMobile>
                        }
                    </NavbarMenuItem>
                ))}
                {isLoggedIn &&
                    <NavbarMenuItem >
                        <Link
                            size="sm"
                            onClick={() => signOut()}
                        >
                            LogOut
                        </Link>
                    </NavbarMenuItem>}
            </NavbarMenu>
        </Navbar>
    );
}

const Hint = styled.div`
    font-size: 0.6rem;
    margin-left: 10px;
`
const WrapMobile = styled.div`
    display:flex;
    flex-gap: 10px;
`

const WrapDesktop = styled(WrapMobile)`
    flex-direction: column;
`



const Span = styled.span`
`
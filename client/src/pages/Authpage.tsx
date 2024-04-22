import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { AccountCreation, AuthCredentials, PasswordCheck } from '@/models/classes/customer'
import PasswordWarning from '@/components/passwordWarning'
import axios, { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'

const Authpage = () => {
    const [newCustomer, setNewCustomer] = useState<AccountCreation>(new AccountCreation("", "", "", "", "", ""))
    const [passwords, setPasswords] = useState<PasswordCheck>(new PasswordCheck("", "", true))
    const [authCredentials, setAuthCredentials] = useState<AuthCredentials>(new AuthCredentials("", ""))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
    }

    const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const handleCheckPasswordMatches = () => {
            if (passwords.password1 === passwords.password2) {
                setPasswords(prev => ({ ...prev, matches: true }));
            } else {
                setPasswords(prev => ({ ...prev, matches: false }));
            }
        };
        handleCheckPasswordMatches();
    }, [passwords.password1, passwords.password2])


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (passwords.matches && newCustomer.address && newCustomer.country && newCustomer.email && newCustomer.postcode && newCustomer.state) {
            setNewCustomer({ ...newCustomer, password: passwords.password1 })
        }

        //TODO fix backend and start auth process.
        try {
            const res = await axios.post("http://localhost:3000/auth/create", newCustomer)
            toast({
                title: "Account created!",
                description: "Please log in to continue"
            })
            console.log(res)
            setNewCustomer(new AccountCreation("", "", "", "", "", ""))
            setPasswords(new PasswordCheck("", "", false))
        } catch (error) {

            if (axios.isAxiosError(error) && error.response?.status === 409) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "An account with this email already exists!",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "An unknown error occured during account creation!",
                })
            }
            console.log(error)
        }

    }

    const handleAuthOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthCredentials({ ...authCredentials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            const res = await axios.post("http://localhost:3000/auth/login", authCredentials)
            toast({
                title: "You are logged in!",
                description: "You have been logged in, enjoy shopping!",
            })
            console.log(res)
            setAuthCredentials(new AuthCredentials("", ""))

        } catch (error) {
            //TODO catch error when username is incorrect, currently only throwing correct error when password is incorrect.
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                toast({
                    title: "There has been a problem logging in!",
                    description: "Your credentials were incorrect",
                })
                console.log(error)

            } else {
                toast({
                    title: "There has been a problem logging in!",
                    description: "Unknown error logging in",
                })
                console.log(error)
            }
        }
    }




    return (
        <div className='flex justify-center'>
            <Tabs defaultValue="Register" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Register">Register</TabsTrigger>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="Register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription>
                                Register your account for a quick checkout.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input value={newCustomer.email} onChange={handleChange} id="email" name="email" type="email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password {!passwords.matches && <PasswordWarning />}
                                </Label>
                                <Input value={passwords.password1} onChange={handlePassWordChange} name="password1" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Confirm password</Label>
                                <Input value={passwords.password2} onChange={handlePassWordChange} name="password2" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Address</Label>
                                <Input value={newCustomer.address} onChange={handleChange} id="address" name="address" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">State</Label>
                                <Input value={newCustomer.state} onChange={handleChange} id="state" name="state" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="country">Country</Label>
                                <Input value={newCustomer.country} onChange={handleChange} id="coutry" name="country" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Postcode</Label>
                                <Input value={newCustomer.postcode} onChange={handleChange} id="postcode" name="postcode" />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={(e) => handleSubmit(e)}>Register</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="Login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login here to access your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={handleAuthOnChange} value={authCredentials.email} id="email" name="email" type="email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">Password</Label>
                                <Input onChange={handleAuthOnChange} value={authCredentials.password} id="password" name="password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={(e) => handleLogin(e)}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}


export default Authpage
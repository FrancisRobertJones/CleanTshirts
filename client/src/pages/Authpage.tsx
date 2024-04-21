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
import { AccountCreation, PasswordCheck } from '@/models/classes/customer'
import PasswordWarning from '@/components/passwordWarning'
import axios from 'axios'

const Authpage = () => {
    const [newCustomer, setNewCustomer] = useState<AccountCreation>(new AccountCreation("", "", "", "", "", 0))
    const [passwords, setPasswords] = useState<PasswordCheck>(new PasswordCheck("", "", true))


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

        if(passwords.matches && newCustomer.address && newCustomer.country && newCustomer.email && newCustomer.postcode && newCustomer.state){
            setNewCustomer({...newCustomer, password: passwords.password1})
        } 

        //TODO fix backend and start auth process.
        /* const res = await axios.post() */
    }



    return (
        <div className='flex justify-center'>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
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
                                <Input onChange={handleChange} id="email" name="email" type="email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password {!passwords.matches && <PasswordWarning />}
                                </Label>
                                <Input onChange={handlePassWordChange}  name="password1" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Confirm password</Label>
                                <Input onChange={handlePassWordChange}  name="password2" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Address</Label>
                                <Input onChange={handleChange} id="address" name="address" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">State</Label>
                                <Input onChange={handleChange} id="state" name="state" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="country">Country</Label>
                                <Input onChange={handleChange} id="coutry" name="country" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Postcode</Label>
                                <Input onChange={handleChange} id="postcode" name="postcode" />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={(e) => handleSubmit(e)}>Register</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
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
                                <Input id="email" name="email" type="email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">Password</Label>
                                <Input id="password" name="password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}


export default Authpage
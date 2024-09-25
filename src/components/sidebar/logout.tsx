"use client";
import React from 'react'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { SignOutApi } from '@/service/authService';

export default function Logout({isExpanded}: Readonly<{isExpanded: boolean}>) {
    const { toast } = useToast();
    const logout = async () => {
        await SignOutApi();
    }

    const onLogout = async () => {
        try {
            await logout();
            toast({
                title: "Success",
                description: "You have successfully logged out",
            });
        } catch (error: unknown) {
            toast({
                variant: "destructive",
                title: "Error",
                description: (error as Error).message,
            });
        }
      }

  return (
    <div>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut/>
          <p className={cn("", isExpanded ? "" : "hidden")}>logout</p>
        </Button>
      </div>
  )
}

"use client";
import React from 'react'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/state/authState';
import { useToast } from '@/hooks/use-toast';

export default function Logout({isExpanded}: Readonly<{isExpanded: boolean}>) {
    const { toast } = useToast();
    const logout = useAuthStore((state) => state.logout);

    const onLogout = async () => {
        try {
            await logout();
            toast({
                title: "Success",
                description: "You have successfully logged out",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
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

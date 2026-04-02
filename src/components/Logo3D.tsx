"use client"

import React from 'react'
import { UtensilsCrossed } from 'lucide-react'

export default function Logo3D() {
    return (
        <div className="relative flex items-center justify-center transition-all hover:scale-105 duration-300 group" style={{ zIndex: 50 }}>
            <UtensilsCrossed 
                className="h-10 w-10 sm:h-12 sm:w-12 text-[#1a4731] dark:text-primary drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" 
                strokeWidth={1.5}
            />
        </div>
    )
}

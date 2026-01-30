import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

export function formatDateTime(date: Date | string): string {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '')

    // Format as international number
    if (cleaned.length >= 10) {
        return `+${cleaned}`
    }

    return phone
}

export function validatePhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10 && cleaned.length <= 15
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str
    return str.substring(0, length) + '...'
}

export function calculateDeliveryRate(delivered: number, total: number): number {
    if (total === 0) return 0
    return Math.round((delivered / total) * 100)
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function replaceVariables(template: string, variables: Record<string, string>): string {
    let result = template

    Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        result = result.replace(regex, value)
    })

    return result
}

export function extractVariables(template: string): string[] {
    const regex = /{{(\w+)}}/g
    const matches = template.matchAll(regex)
    return Array.from(matches, m => m[1])
}

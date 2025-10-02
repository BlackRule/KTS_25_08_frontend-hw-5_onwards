import type { Metadata } from 'next'
import LoginSignup from '@/shared/features/auth/LoginSignup'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return <LoginSignup type="signIn" />
}

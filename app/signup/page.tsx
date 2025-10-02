import type { Metadata } from 'next'
import LoginSignup from '@/shared/features/auth/LoginSignup'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignupPage() {
  return <LoginSignup type="signUp" />
}

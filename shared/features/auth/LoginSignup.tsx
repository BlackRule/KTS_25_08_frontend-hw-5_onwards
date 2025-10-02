'use client'

import { Alert } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/shared/components/Button'
import Input from '@/shared/components/Input'
import { postForgotPassword, postSignIn, postSignUp } from '@/shared/api'
import { useAuthStore } from '@/shared/stores'
import { translation, type Language } from '@/shared/utils/translation'
import styles from './LoginSignup.module.scss'

const language: Language = 'en'

type LoginSignupProps = {
  type: 'signIn' | 'signUp'
}

const LoginSignup = ({ type }: LoginSignupProps) => {
  const router = useRouter()
  const authStore = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (type === 'signIn') {
        const resp = await postSignIn(email, password)
        authStore.setSignedIn(resp)
        router.push('/')
      } else {
        await postSignUp(email, password)
        router.push('/login')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : translation[language].unknown_error
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      await postForgotPassword(email)
      alert(translation[language].password_reset_email_sent)
    } catch (err) {
      const message = err instanceof Error ? err.message : translation[language].unknown_error
      setError(message)
    }
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder={translation[language].email}
          name="email"
          required
          type="email"
          onChange={setEmail}
          value={email}
          className={styles.input}
        />
        <Input
          placeholder={translation[language].password}
          name="password"
          required
          type="password"
          onChange={setPassword}
          value={password}
          className={styles.input}
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Button type="submit" loading={isSubmitting}>
          {translation[language][type === 'signUp' ? 'signUp' : 'login']}
        </Button>
      </form>
      {type === 'signIn' ? (
        <>
          <p>
            {translation[language].noAcc}{' '}
            <Link href="/signup">{translation[language].signUp}</Link>
          </p>
          <button type="button" className={styles.forgot} onClick={handleResetPassword}>
            {translation[language].forgot_password}
          </button>
        </>
      ) : (
        <p>
          {translation[language].haveAcc}{' '}
          <Link href="/login">{translation[language].login}</Link>
        </p>
      )}
    </main>
  )
}

export default LoginSignup

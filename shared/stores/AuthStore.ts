import { makeAutoObservable } from 'mobx'
import { setAuthToken, type SignInResponse } from '@/shared/api'

export type AuthUser = {
  email: string
  username: string
  jwt: string
}

const STORAGE_KEY = 'auth_user'

export default class AuthStore {
  user: AuthUser | null = null

  constructor() {
    makeAutoObservable(this)
    this.load()
    setAuthToken(this.user?.jwt ?? null)
  }

  private load() {
    if (typeof window === 'undefined') {
      return
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser
        if (parsed && parsed.email && parsed.username && parsed.jwt) {
          this.user = parsed
        }
      }
    } catch (_) {
      // ignore
    }
  }

  private persist() {
    if (typeof window === 'undefined') {
      return
    }
    try {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (_) {
      // ignore storage errors
    }
  }

  setSignedIn(resp: SignInResponse) {
    this.user = {
      email: resp.user.email,
      username: resp.user.username,
      jwt: resp.jwt,
    }
    setAuthToken(this.user.jwt)
    this.persist()
  }

  signOut() {
    this.user = null
    setAuthToken(null)
    this.persist()
  }
}

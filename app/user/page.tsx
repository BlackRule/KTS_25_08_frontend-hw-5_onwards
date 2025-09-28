'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import Button from '@/shared/components/Button'
import Text from '@/shared/components/Text'
import { useAuthStore } from '@/shared/stores'
import { translation } from '@/shared/utils/translation'
import styles from '@/shared/features/user/User.module.scss'

const language = 'en' as const

const UserPage = observer(() => {
  const router = useRouter()
  const authStore = useAuthStore()
  const user = authStore.user

  if (!user) {
    return (
      <nav className={styles.nav}>
        <Button onClick={() => router.push('/login')}>{translation[language].login}</Button>
      </nav>
    )
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.details}>
        <Text tag="p" view="p-18">
          <strong>{translation[language].email}:</strong> {user.email}
        </Text>
        <Text tag="p" view="p-18">
          <strong>{translation[language].login_label}:</strong> {user.username}
        </Text>
      </div>
      <Button
        onClick={() => {
          authStore.signOut()
          router.push('/')
        }}
      >
        {translation[language].logout}
      </Button>
    </nav>
  )
})

export default UserPage

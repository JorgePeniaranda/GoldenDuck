import { logout } from '@/api'

export default function onLogout (): void {
  logout().then(() => {
    window.location.href = '/'
  }).catch((err) => {
    console.error(err)
  })
}

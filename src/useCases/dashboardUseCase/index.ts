import { Api } from '@/api'

function onLogout (): void {
  Api.auth
    .logout()
    .then(() => {
      window.location.href = '/'
    })
    .catch(err => {
      console.error(err)
    })
}

export const DashboardUseCase = {
  onLogout
} as const

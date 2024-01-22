export const AsideIcons = {
  messages: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m5 8.75l-2.75-3.1q-.425-.5-.162-1.075Q2.35 4 3 4h17q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20H7q-.825 0-1.412-.587Q5 18.825 5 18ZM9 13h9q.425 0 .712-.288Q19 12.425 19 12t-.288-.713Q18.425 11 18 11H9q-.425 0-.712.287Q8 11.575 8 12t.288.712Q8.575 13 9 13Zm0 3h6q.425 0 .713-.288Q16 15.425 16 15t-.287-.713Q15.425 14 15 14H9q-.425 0-.712.287Q8 14.575 8 15t.288.712Q8.575 16 9 16Zm0-6h9q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8H9q-.425 0-.712.287Q8 8.575 8 9t.288.712Q8.575 10 9 10Z"
      />
    </svg>
  ),
  notifications: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71z"
      />
    </svg>
  ),
}

export const NavLinks = {
  panel: [
    { href: '/dashboard', text: 'Tu dinero' },
    { href: '/dashboard/expenses', text: 'Gastos' },
    { href: '/dashboard/cards', text: 'Tus tarjetas' },
  ],
  services: [
    { href: '/dashboard/payment', text: 'Pagar' },
    { href: '/dashboard/investments', text: 'Inverciones' },
    { href: '/dashboard/transfers', text: 'Transferencias' },
    { href: '/dashboard/loans', text: 'Prestamos' },
    { href: '/dashboard/fixed-terms', text: 'Plazos fijos' },
  ],
  support: [
    { href: '/dashboard/support-chat', text: 'Chat con soporte' },
    { href: '/dashboard/faq', text: 'Preguntas frecuentes' },
  ],
}

export const NavIcons = {
  panel: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="oklch(59.49% 0.173 272.59)"
        d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3"
      />
    </svg>
  ),
  services: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="oklch(68.93% 0.193 34.38)"
        d="M28 24.005v-2a12.01 12.01 0 0 0-11-11.95v-2.05h3v-2h-8v2h3v2.05a12.01 12.01 0 0 0-11 11.95v2H2v2h28v-2Zm-12-12a10.017 10.017 0 0 1 9.798 8H6.202a10.017 10.017 0 0 1 9.798-8m-10 10h20v2H6Z"
      />
    </svg>
  ),
  support: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m12 22l-.25-3h-.25q-3.55 0-6.025-2.475T3 10.5q0-3.55 2.475-6.025T11.5 2q1.775 0 3.313.662t2.7 1.825q1.162 1.163 1.824 2.7T20 10.5q0 1.875-.612 3.6t-1.676 3.2q-1.062 1.475-2.525 2.675T12 22m-.525-6.025q.425 0 .725-.3t.3-.725q0-.425-.3-.725t-.725-.3q-.425 0-.725.3t-.3.725q0 .425.3.725t.725.3M10.75 12.8h1.5q0-.75.15-1.05t.95-1.1q.45-.45.75-.975t.3-1.125q0-1.275-.862-1.913T11.5 6q-1.1 0-1.85.613T8.6 8.1l1.4.55q.125-.425.475-.837T11.5 7.4q.675 0 1.013.375t.337.825q0 .425-.25.763t-.6.687q-.875.75-1.062 1.188T10.75 12.8"
      />
    </svg>
  ),
}

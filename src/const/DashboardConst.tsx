import React from 'react'

export const Currency = 'ARS'

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
  )
}

export const NavLinks = {
  panel: [
    { href: '/dashboard', text: 'Tu dinero' },
    { href: '/dashboard/expenses', text: 'Gastos' },
    { href: '/dashboard/cards', text: 'Tus tarjetas' }
  ],
  services: [
    { href: '/dashboard/payment', text: 'Pagar' },
    { href: '/dashboard/investments', text: 'Inverciones' },
    { href: '/dashboard/transfers', text: 'Transferencias' },
    { href: '/dashboard/loans', text: 'Prestamos' },
    { href: '/dashboard/fixed-terms', text: 'Plazos fijos' }
  ],
  support: [
    { href: '/dashboard/support-chat', text: 'Chat con soporte' },
    { href: '/dashboard/faq', text: 'Preguntas frecuentes' }
  ]
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
  )
}

export const cardsIcons = {
  Money: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"
        />
      </svg>
    ),
    color: 'oklch(68.85% 0.15 146.54)'
  },
  Graph: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M8.5 9L7.4 6.6L5 5.5l2.4-1.1L8.5 2l1.1 2.4L12 5.5L9.6 6.6L8.5 9Zm6.5 3l-.95-2.05L12 9l2.05-.95L15 6l.95 2.05L18 9l-2.05.95L15 12ZM4 14l-.95-2.05L1 11l2.05-.95L4 8l.95 2.05L7 11l-2.05.95L4 14Zm.5 6.5L3 19l7.5-7.5l4 4l7.1-7.975l1.4 1.4l-8.5 9.575l-4-4l-6 6Z"
        />
      </svg>
    ),
    color: 'oklch(86.06% 0.173 91.94)'
  },
  Expenses: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M230.33 141.06a24.43 24.43 0 0 0-21.24-4.23l-41.84 9.62A28 28 0 0 0 140 112H89.94a31.82 31.82 0 0 0-22.63 9.37L44.69 144H16a16 16 0 0 0-16 16v40a16 16 0 0 0 16 16h104a7.93 7.93 0 0 0 1.94-.24l64-16a6.94 6.94 0 0 0 1.19-.4L226 182.82l.44-.2a24.6 24.6 0 0 0 3.93-41.56ZM16 160h24v40H16Zm203.43 8.21l-38 16.18L119 200H56v-44.69l22.63-22.62A15.86 15.86 0 0 1 89.94 128H140a12 12 0 0 1 0 24h-28a8 8 0 0 0 0 16h32a8.32 8.32 0 0 0 1.79-.2l67-15.41l.31-.08a8.6 8.6 0 0 1 6.3 15.9ZM164 96a36 36 0 0 0 5.9-.48a36 36 0 1 0 28.22-47A36 36 0 1 0 164 96m60-12a20 20 0 1 1-20-20a20 20 0 0 1 20 20m-60-44a20 20 0 0 1 19.25 14.61a36 36 0 0 0-15 24.93A20.42 20.42 0 0 1 164 80a20 20 0 0 1 0-40"
        />
      </svg>
    ),
    color: 'oklch(63.68% 0.208 25.33)'
  }
}

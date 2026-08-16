/**
 * ContactIcons — pequenos ícones line-art (mesmo traço fino do resto do
 * site: stroke currentColor, strokeWidth 1.4) para os chips de contato
 * (WhatsApp, e-mail, Instagram). Sem preenchimento, herdam a cor do texto.
 */
export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
      <path
        d="M6.2 17.5L4 20l2.6-.7a8 8 0 1 0-3-3l-.4 2.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.7c0 3.4 3 6.3 6.3 6.3.5 0 .9-.5.9-1v-.9c0-.3-.2-.5-.4-.6l-1.6-.7c-.2-.1-.5 0-.6.2l-.4.5c-1-.5-1.8-1.3-2.3-2.3l.5-.4c.2-.1.3-.4.2-.6l-.7-1.6c-.1-.2-.3-.4-.6-.4h-.9c-.5 0-1 .4-1 .9v.6z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 6.5l8 6.5 8-6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

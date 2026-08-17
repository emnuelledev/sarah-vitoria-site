import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// createClient() lança erro síncrono se a URL/chave estiverem vazias — o que
// derrubaria o site inteiro (tela branca) assim que este módulo fosse
// carregado, antes até do React renderizar. Se as env vars não estiverem
// configuradas (esquecimento comum ao configurar um novo ambiente de deploy,
// já que .env é gitignored), preferimos um aviso no console + o site
// continuar de pé (as chamadas ao Supabase falham normalmente, com os
// estados de erro que as páginas já tratam) a um crash total.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase não configurado — defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas variáveis de ambiente (veja .env.example). O site vai carregar, mas nada que depende do backend vai funcionar até isso ser corrigido.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)

export default supabase

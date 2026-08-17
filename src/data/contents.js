// ============================================================================
// contents.js
// Os artigos em si agora vêm do banco (tabela `contents`, ver
// src/lib/content.js e supabase/schema.sql) — editáveis pelo painel
// /admin/conteudos. Este arquivo guarda só a lista fixa de categorias usada
// no filtro da página Conteúdos e no select do formulário do admin.
// ============================================================================

export const categories = ['Todos', 'Comportamento', 'Nutrição', 'Rotina', 'Saúde']

export default categories

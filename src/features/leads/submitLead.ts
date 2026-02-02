import { supabaseClient } from '../../lib/supabaseClient'

export type LeadPayload = {
  name: string
  company: string
  email: string
  whatsapp: string
  city: string
  teamSize: string
  message: string
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!supabaseClient) {
    throw new Error(
      'Formulário em modo demonstração. Configure o Supabase para receber solicitações.',
    )
  }

  const { error } = await supabaseClient.from('public.leads').insert(payload)

  if (error) {
    throw new Error(`Falha ao salvar lead: ${error.message}`)
  }
}

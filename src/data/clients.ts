export type Client = {
  name: string
  initials: string
  logoUrl: string
}

export const clients: Client[] = [
  { name: 'Unimed', initials: 'UNI', logoUrl: '/partners/unimed.png' },
  { name: 'BMW', initials: 'BMW', logoUrl: '/partners/bmw.svg' },
  { name: 'Hospital Dona Helena', initials: 'HDH', logoUrl: '/partners/hospital-dona-helena.svg' },
  { name: 'Nidec', initials: 'NID', logoUrl: '/partners/nidec.png' },
]

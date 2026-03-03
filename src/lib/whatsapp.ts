const DEFAULT_WHATSAPP_NUMBER = '5547991072458'

export function buildWhatsAppLink(message: string, phoneNumber = DEFAULT_WHATSAPP_NUMBER) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

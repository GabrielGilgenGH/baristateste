import placeholderImage from '../assets/placeholders/product-placeholder.svg'
import type { Machine } from '../data/machines/catalog'

export function resolveMachineImage(machine: Machine): string {
  if (machine.imageUrl) return machine.imageUrl
  if (machine.imageKey) return `/maquinas/${machine.imageKey}`
  return placeholderImage
}

export { placeholderImage as machinePlaceholderImage }

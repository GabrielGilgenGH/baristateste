import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Section } from '../components/ui/Section'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'

const featureSamples = [
  {
    title: 'Token-based spacing',
    description: 'Keep vertical rhythm predictable with existing spacing scale and consistent max widths.',
  },
  {
    title: 'Consistent contrast',
    description: 'Use brand text colors and border opacity levels for hierarchy instead of random one-off values.',
  },
  {
    title: 'Interaction states',
    description: 'Validate hover, focus-visible, and disabled states before moving any style update to production.',
  },
]

export function UIPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-10 sm:px-6">
      <Card className="rounded-2xl border-brand-copper/40 bg-brand-surfaceSoft/65 p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">Internal / Dev Only</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-brand-espresso sm:text-4xl">UI Playground</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/92">
          This route is reserved for design exploration and component QA. It is not linked in navigation and should not
          be used as a production page.
        </p>
      </Card>

      <Section
        title="Typography"
        description="Quick check for heading scale, body readability, and muted copy hierarchy."
      >
        <Card className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold leading-tight text-brand-espresso">Heading Display</h2>
            <h3 className="text-2xl font-semibold text-brand-charcoal">Section Heading</h3>
            <p className="text-base leading-relaxed text-brand-charcoal/95">
              Body copy should stay clear at long lengths and keep contrast balanced against dark surfaces.
            </p>
            <p className="text-sm text-brand-charcoal/70">Muted support copy for helper text and secondary metadata.</p>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/60">Small / Label / Metadata</p>
          </div>
          <div className="rounded-2xl border border-brand-warmGray/45 bg-brand-base/35 p-5">
            <p className="text-sm font-semibold text-brand-charcoal">Typographic note</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/85">
              Use this area to validate pairings between text size and line height at mobile and desktop widths.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Buttons" description="Primary, secondary, ghost, disabled, and loading state preview.">
        <Card className="space-y-4 p-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="ghost">Ghost Action</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" disabled aria-busy="true">
              <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-brand-ink/55 border-t-brand-ink" />
              Loading
            </Button>
          </div>
        </Card>
      </Section>

      <Section
        title="Form Controls"
        description="Input, textarea, and select states. Use keyboard navigation to validate focus rings."
      >
        <Card className="space-y-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-brand-charcoal">
              Default Input
              <Input placeholder="Company name" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-brand-charcoal">
              Error Input
              <Input className="border-red-500/70 focus-visible:outline-red-400/80" defaultValue="Missing value" />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-brand-charcoal">
              Select
              <Select defaultValue="maquinas">
                <option value="maquinas">Máquinas</option>
                <option value="produtos">Produtos</option>
                <option value="suporte">Suporte</option>
              </Select>
            </label>
            <label className="space-y-2 text-sm font-semibold text-brand-charcoal">
              Textarea
              <Textarea rows={4} placeholder="Write a short request..." />
            </label>
          </div>
        </Card>
      </Section>

      <Section title="Cards" description="Default, elevated, and bordered card treatments.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70">Default</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-espresso">Standard Surface</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/88">
              Balanced for general content blocks and compact summaries.
            </p>
          </Card>
          <Card className="border-brand-copper/40 p-6 shadow-medium">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70">Elevated</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-espresso">Premium Emphasis</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/88">
              Use when a card must carry stronger visual weight.
            </p>
          </Card>
          <Card className="border-brand-charcoal/40 bg-brand-surface/70 p-6 shadow-none">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70">Bordered</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-espresso">Low Elevation</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/88">
              Works well for dense data and grouped controls.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Section Blocks" description="Hero-like intro, feature grid, and CTA composition samples.">
        <div className="space-y-6">
          <Card className="rounded-[2rem] border-brand-copper/35 bg-brand-surfaceSoft/65 p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">Hero Pattern</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-brand-espresso">
              Build and validate premium sections before touching production pages.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-charcoal/90">
              Keep hierarchy clean, spacing intentional, and interactions tested with keyboard + hover states.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary">Primary CTA</Button>
              <Button variant="secondary">Secondary CTA</Button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {featureSamples.map((item) => (
              <Card key={item.title} className="p-5">
                <h3 className="text-lg font-semibold text-brand-espresso">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/88">{item.description}</p>
              </Card>
            ))}
          </div>

          <Card className="rounded-[2rem] border-brand-copper/35 bg-brand-base/40 p-8">
            <h3 className="text-2xl font-semibold text-brand-espresso">CTA Block</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-charcoal/88">
              This block helps validate final call-to-action density, button placement, and responsive spacing.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary">Request Proposal</Button>
              <Button variant="ghost">Preview Variant</Button>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}

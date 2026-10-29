export default function SectionHeading({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  )
}

import { JsonLdScript } from 'next-seo'

type StructuredDataProps = {
  data: Record<string, unknown>
  id: string
}

/** Renders safe JSON-LD using next-seo's App Router-compatible script component. */
export default function StructuredData({ data, id }: StructuredDataProps) {
  return <JsonLdScript data={data} scriptKey={id} id={id} />
}

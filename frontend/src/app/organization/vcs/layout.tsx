import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "版本控制设置",
  description:
    "Configure version control system integrations for your organization",
}

export default function VCSSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

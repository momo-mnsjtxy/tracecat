import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "凭证 | 工作区",
}

export default function CredentialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

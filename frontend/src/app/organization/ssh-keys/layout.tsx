import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SSH 密钥 | 组织",
}

export default function SSHKeysLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

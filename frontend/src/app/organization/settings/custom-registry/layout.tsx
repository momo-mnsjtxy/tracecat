import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "自定义注册表 | 组织",
}

export default function CustomRegistryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

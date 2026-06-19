"use client"

import {
  BotIcon,
  ChevronLeftIcon,
  GitBranchIcon,
  GlobeIcon,
  KeyRoundIcon,
  LockIcon,
  LogInIcon,
  LogsIcon,
  Settings2,
  UsersIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"
import { useScopeCheck } from "@/components/auth/scope-guard"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEntitlements } from "@/hooks/use-entitlements"

export function OrganizationSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { hasEntitlement } = useEntitlements()
  const customRegistryEnabled = hasEntitlement("custom_registry")
  const gitSyncEnabled = hasEntitlement("git_sync")
  const serviceAccountsEnabled = hasEntitlement("service_accounts")

  // Scope checks for org sidebar items
  const canViewSettings = useScopeCheck("org:settings:read")
  const canViewServiceAccounts = useScopeCheck("org:service_account:read")
  const canViewMembers = useScopeCheck("org:member:read")

  const navSettings = [
    {
      title: "自定义注册表",
      url: "/organization/settings/custom-registry",
      icon: GitBranchIcon,
      isActive: pathname?.includes("/organization/settings/custom-registry"),
      visible: canViewSettings === true,
      locked: !customRegistryEnabled,
    },
    {
      title: "SAML (SSO)",
      url: "/organization/settings/sso",
      icon: LockIcon,
      isActive: pathname?.includes("/organization/settings/sso"),
      visible: canViewSettings === true,
      locked: false,
    },
    {
      title: "域名",
      url: "/organization/settings/domains",
      icon: GlobeIcon,
      isActive: pathname?.includes("/organization/settings/domains"),
      visible: canViewSettings === true,
      locked: false,
    },
    {
      title: "应用设置",
      url: "/organization/settings/app",
      icon: Settings2,
      isActive: pathname?.includes("/organization/settings/app"),
      visible: canViewSettings === true,
      locked: false,
    },
    {
      title: "审计日志",
      url: "/organization/settings/audit",
      icon: LogsIcon,
      isActive: pathname?.includes("/organization/settings/audit"),
      visible: canViewSettings === true,
      locked: false,
    },
    {
      title: "智能体",
      url: "/organization/settings/agent",
      icon: BotIcon,
      isActive: pathname?.includes("/organization/settings/agent"),
      visible: canViewSettings === true,
      locked: false,
    },
    {
      title: "Git 同步",
      url: "/organization/vcs",
      icon: GitBranchIcon,
      isActive: pathname?.includes("/organization/vcs"),
      visible: canViewSettings === true,
      locked: !gitSyncEnabled,
    },
    // MCP settings page not yet implemented — hidden until route exists
    // {
    //   title: "MCP",
    //   url: "/organization/settings/mcp",
    //   icon: LinkIcon,
    //   isActive: pathname?.includes("/organization/settings/mcp"),
    // },
  ]

  const navSecrets = [
    {
      title: "SSH 密钥",
      url: "/organization/ssh-keys",
      icon: KeyRoundIcon,
      isActive: pathname?.includes("/organization/ssh-keys"),
      visible: canViewSettings === true,
    },
  ]

  const navManage = [
    {
      title: "成员",
      url: "/organization/members",
      icon: UsersIcon,
      isActive: pathname?.includes("/organization/members"),
      visible: canViewMembers === true,
    },
    {
      title: "会话",
      url: "/organization/sessions",
      icon: LogInIcon,
      isActive: pathname?.includes("/organization/sessions"),
      visible: canViewMembers === true,
    },
    {
      title: "服务账户",
      url: "/organization/settings/service-accounts",
      icon: KeyRoundIcon,
      isActive: pathname?.includes("/organization/settings/service-accounts"),
      visible: canViewServiceAccounts === true && serviceAccountsEnabled,
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/workspaces" className="text-muted-foreground">
                <ChevronLeftIcon />
                <span>返回工作区</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navSettings.some((item) => item.visible === true) && (
          <SidebarGroup>
            <SidebarGroupLabel>设置</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navSettings
                  .filter((item) => item.visible === true)
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.locked ? (
                        <SidebarMenuBadge>
                          <LockIcon aria-hidden="true" className="size-3.5" />
                          <span className="sr-only">Requires upgrade</span>
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {navSecrets.some((item) => item.visible === true) && (
          <SidebarGroup>
            <SidebarGroupLabel>密钥</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navSecrets
                  .filter((item) => item.visible === true)
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {navManage.some((item) => item.visible === true) && (
          <SidebarGroup>
            <SidebarGroupLabel>管理</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navManage
                  .filter((item) => item.visible === true)
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

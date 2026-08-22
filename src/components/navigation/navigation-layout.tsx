import { MenuItems } from '@/components/navigation/menu-items'
import { MobilePopover } from '@/components/navigation/mobile-popover'
import { Navigation } from '@/components/navigation/navigation'
import {
  NavigationAuth,
  NavigationAuthButton,
} from '@/components/navigation/navigation-auth'
import { SearchDialog } from '@/components/navigation/search-dialog'
import { Container } from '@/components/ui/container'
import { Suspense } from 'react'

export function NavigationLayout() {
  return (
    <Navigation>
      <Container
        as="nav"
        className="flex items-center justify-between gap-x-3 pt-2 pb-5"
      >
        <MobilePopover className="sm:hidden">
          <MenuItems closePopover className="flex-col" />
        </MobilePopover>
        <MenuItems className="max-sm:hidden" />
        <div className="flex items-center gap-3">
          <Suspense
            fallback={
              <NavigationAuthButton aria-label="Loading account status" />
            }
          >
            <NavigationAuth />
          </Suspense>
          <SearchDialog />
        </div>
      </Container>
    </Navigation>
  )
}

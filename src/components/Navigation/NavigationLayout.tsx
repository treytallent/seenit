import { SearchDialog } from '@/components/Navigation/SearchDialog'
import { Container } from '@/components/ui/container'
import { Suspense } from 'react'
import { MenuItems } from './MenuItems'
import { MobilePopover } from './MobilePopover'
import { Navigation } from './Navigation'
import { NavigationAuth, NavigationAuthButton } from './NavigationAuth'

export function NavigationLayout() {
  return (
    <Navigation>
      <Container
        as="nav"
        className="flex items-center justify-between gap-x-3 py-2"
      >
        <MobilePopover className="sm:hidden">
          <MenuItems closePopover className="flex-col" />
        </MobilePopover>

        <MenuItems className="max-sm:hidden" />

        <div className="flex items-center gap-3">
          <Suspense fallback={<NavigationAuthButton />}>
            <NavigationAuth />
          </Suspense>
          <SearchDialog />
        </div>
      </Container>
    </Navigation>
  )
}

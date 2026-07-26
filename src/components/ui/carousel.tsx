'use client'

/**
 * Modified Carousel from shadcn/ui
 *
 * @link https://ui.shadcn.com/docs/components/carousel
 */

import { Button } from '@/components/ui/button'
import ClassNames from 'embla-carousel-class-names'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

export type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

export function Carousel({
  controls,
  content,
  className,
  opts,
  setApi,
}: {
  controls?: React.ReactNode
  content: React.ReactNode
  className?: string
} & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
    },
    [
      ClassNames({
        snapped: ['', ''],
        inView: 'opacity-100',
        draggable: '',
        dragging: '',
        loop: '',
      }),
    ]
  )

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        data-slot="carousel"
        className={twMerge(
          // Base styles
          'group/carousel relative isolate grid grid-cols-1 grid-rows-1 overflow-hidden',
          // Edge masks
          '[--mask-from:100%]',
          // Spacing between carousel items @link https://ui.shadcn.com/docs/components/carousel#spacing
          '[--gap:--spacing(3)]',
          className
        )}
        role="region"
        aria-roledescription="carousel"
      >
        <div
          data-slot="carousel-controls"
          className="col-1 row-1 px-(--body-x)"
        >
          <div className="relative mx-auto h-full w-full max-w-7xl not-group-hover/carousel:*:data-[slot=carousel-control]:opacity-0">
            {controls}
          </div>
        </div>
        <div
          className={twJoin(
            'col-1 row-1 px-(--body-x)',
            canScrollPrev && 'mask-l-from-(--mask-from)',
            canScrollNext && 'mask-r-from-(--mask-from)'
          )}
        >
          <div className="mx-auto max-w-7xl">{content}</div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<'ul'>>) {
  const { carouselRef } = useCarousel()

  return (
    <div
      data-slot="carousel-content"
      ref={carouselRef}
      className={twMerge(
        '-translate-x-(--gap) **:data-[slot=carousel-item]:pl-(--gap)',
        className
      )}
    >
      <ul {...props} data-slot="carousel-content-container" className="flex">
        {children}
      </ul>
    </div>
  )
}

export function CarouselItem({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<'li'>>) {
  const { api } = useCarousel()

  return (
    <li
      {...props}
      aria-roledescription="slide"
      data-slot="carousel-item"
      data-api-ready={api ? true : null}
      className={twMerge(
        'shrink-0 transition-opacity',
        // Size
        'basis-(--basis) [--basis:calc(100%)]',
        // This is a workaround that forces the initial render to match the post-mount client state because embla carousel currently lacks SSR support.
        // Using media queries the inital-opacity variable is modified for array indexes that should be visible at that screen size.
        // After the embla API is set by the parent component, the position of carousel items is known relative to the viewport so their opacity is now automatically set by the ClassNames plugin.
        '[--initial-opacity:40%] not-data-api-ready:opacity-(--initial-opacity)',
        '[--dimmed-opacity:40%] data-api-ready:not-[.opacity-100]:opacity-(--dimmed-opacity)',
        className
      )}
    >
      {children}
    </li>
  )
}

export function CarouselPrev({
  size = 'sm',
  color = 'light-opacity',
  className,
}: Omit<React.ComponentProps<typeof Button>, 'children'>) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      size={size}
      color={color}
      data-slot="carousel-control"
      className={twMerge(
        'absolute top-1/2 -left-[calc(var(--gap)*2)] -translate-y-1/2 disabled:hidden',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
    >
      <ChevronLeft />
    </Button>
  )
}

export function CarouselNext({
  size = 'sm',
  color = 'light-opacity',
  className,
}: Omit<React.ComponentProps<typeof Button>, 'children'>) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      size={size}
      color={color}
      data-slot="carousel-control"
      className={twMerge(
        'absolute top-1/2 -right-(--gap) -translate-y-1/2 disabled:hidden',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
    >
      <ChevronRight />
    </Button>
  )
}

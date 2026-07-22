'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/src/lib/utils'

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>
  itemCount: number
  selectedIndex: number
  isReady: boolean
  isAtStart: boolean
  isAtEnd: boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) throw new Error('Carousel components must be used inside Carousel')
  return context
}

function getScrollStep(viewport: HTMLDivElement) {
  const content = viewport.firstElementChild
  const firstItem = content?.firstElementChild as HTMLElement | null
  const secondItem = content?.children[1] as HTMLElement | undefined

  if (!firstItem) return viewport.clientWidth
  return secondItem ? secondItem.offsetLeft - firstItem.offsetLeft : firstItem.offsetWidth
}

function Carousel({ className, children }: { className?: string; children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [itemCount, setItemCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const update = () => {
      const step = getScrollStep(viewport)
      setItemCount(viewport.firstElementChild?.children.length ?? 0)
      setSelectedIndex(step ? Math.round(viewport.scrollLeft / step) : 0)
      setIsAtStart(viewport.scrollLeft <= 1)
      setIsAtEnd(viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1)
      setIsReady(true)
    }

    update()
    viewport.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      viewport.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollTo = (index: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollTo({ left: getScrollStep(viewport) * index, behavior: 'smooth' })
  }

  const value = {
    viewportRef,
    itemCount,
    selectedIndex,
    isReady,
    isAtStart,
    isAtEnd,
    scrollPrev: () => scrollTo(Math.max(selectedIndex - 1, 0)),
    scrollNext: () => scrollTo(Math.min(selectedIndex + 1, Math.max(itemCount - 1, 0))),
    scrollTo,
  }

  return (
    <CarouselContext.Provider value={value}>
      <div data-slot="carousel" className={cn('relative', className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { viewportRef } = useCarousel()
  return (
    <div ref={viewportRef} data-slot="carousel-viewport" className="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none">
      <div data-slot="carousel-content" className={cn('flex gap-6', className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="carousel-item" className={cn('min-w-0 shrink-0 grow-0 basis-full snap-start min-[850px]:basis-[calc(50%-0.75rem)]', className)} {...props} />
}

function CarouselButton({ direction, className, ...props }: React.ComponentProps<'button'> & { direction: 'prev' | 'next' }) {
  const { isReady, selectedIndex, isAtEnd, scrollPrev, scrollNext } = useCarousel()
  const isPrev = direction === 'prev'
  const disabled = isReady && (isPrev ? selectedIndex === 0 : isAtEnd)

  return (
    <button
      type="button"
      data-slot={`carousel-${direction}`}
      className={cn('inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-[var(--warm)] hover:text-[var(--warm-deep)] disabled:pointer-events-none disabled:opacity-35', isPrev ? 'right-14' : 'right-0', className)}
      onClick={isPrev ? scrollPrev : scrollNext}
      disabled={disabled}
      {...props}
    />
  )
}

function CarouselIndicators({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="carousel-indicators" className={cn('flex justify-center gap-2', className)} {...props} />
}

function CarouselIndicator({ index, className, ...props }: React.ComponentProps<'button'> & { index: number }) {
  const { selectedIndex, scrollTo } = useCarousel()
  return (
    <button
      type="button"
      aria-label={`Gå till projekt ${index + 1}`}
      aria-current={selectedIndex === index ? 'true' : undefined}
      data-slot="carousel-indicator"
      className={cn('h-2 w-2 rounded-full bg-[var(--line)] transition-all', selectedIndex === index && 'w-6 bg-[var(--warm)]', className)}
      onClick={() => scrollTo(index)}
      {...props}
    />
  )
}

export {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselIndicator,
  CarouselIndicators,
  CarouselItem,
}

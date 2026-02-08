import * as React from 'react'
import { Circle } from './icons/circle'

export function ListDivider({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Circle>>) {
  const maybeInsertDivider = (index: number) => index > 0

  return (
    <>
      {React.Children.map(children, (child, index) =>
        child && maybeInsertDivider(index) ? (
          <>
            <Circle {...props} />
            {child}
          </>
        ) : (
          child
        )
      )}
    </>
  )
}

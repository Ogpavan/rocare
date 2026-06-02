import type { ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

type PopupProps = {
  open: boolean
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
  className?: string
}

export function Popup({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  className,
}: PopupProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#464855]/35 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className={cn(
          'max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-md border bg-card text-card-foreground admin-card-shadow',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b p-5">
          <div>
            <h2 id="popup-title" className="text-lg font-semibold text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close popup"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={17} strokeWidth={1.75} />
          </button>
        </div>
        <div className="max-h-[calc(90vh-150px)] overflow-y-auto p-5">{children}</div>
        {footer ? <div className="flex flex-wrap justify-end gap-2 border-t p-4">{footer}</div> : null}
      </div>
    </div>
  )
}

import '@/app/globals.css'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { Toaster as DefaultToaster } from 'sonner'

export function Toaster() {
  return (
    <DefaultToaster
      toastOptions={{
        classNames: {
          toast:
            'border-0! gap-x-2! bg-obsidian-900! rounded-2xl! shadow-lg! ring-1 ring-white/10 ring-inset text-white! *:data-[icon]:size-6! *:data-[icon]:ml-0.5! *:data-[icon]:mr-0! **:data-[slot=icon]:m-0! **:data-[slot=icon]:size-6!',
          title: 'text-base/5  font-semibold!',
        },
      }}
      icons={{
        success: <CheckCircleIcon className="text-green-400" />,
        error: <ExclamationCircleIcon className="text-red-400" />,
        warning: <ExclamationTriangleIcon className="text-yellow-300" />,
        loading: (
          <svg
            className="animate-spin"
            aria-hidden="true"
            data-slot="icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              strokeWidth="2"
              className="stroke-purple-vivid-600/50"
            />
            <path
              d="M12 3C7.02944 3 3 7.02944 3 12C3 14.3809 3.92452 16.5459 5.43414 18.1555"
              strokeWidth="2"
              className="stroke-purple-vivid-400"
            />
          </svg>
        ),
      }}
    />
  )
}

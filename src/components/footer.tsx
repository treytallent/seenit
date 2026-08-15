import { Link } from '@/components/ui/link'
import { Text } from '@/components/ui/text'
import { TmdbLogoAltShort } from '@/components/ui/icons/tmdb-logo-alt-short'

/**
 * @link https://developer.themoviedb.org/docs/faq#what-are-the-attribution-requirements
 */
export function Footer() {
  return (
    <footer className="bg-linear-to-t from-white/2.5 pt-32 pb-8">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-y-12">
        <div className="space-y-3">
          <Link
            href="https://developer.themoviedb.org/docs/getting-started"
            className="block w-full"
          >
            <TmdbLogoAltShort className="mx-auto" height={20} />
          </Link>
          <Text className="text-center">
            This product uses the The Movie Database (TMDb) API but is not
            endorsed or certified by TMDb.
          </Text>
        </div>
        <Link
          href="https://github.com/treytallent"
          className="text-base/6 text-obsidian-400 sm:text-sm/6"
        >
          Trey Tallent - 2026
        </Link>
      </div>
    </footer>
  )
}

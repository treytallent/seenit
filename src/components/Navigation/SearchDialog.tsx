import { Button } from '@/components/ui/button'
import { Input, InputGroup } from '@/components/ui/input'
import { Combobox, ComboboxInput } from '@headlessui/react'
import { Search } from 'lucide-react'

// todo: dialog
export function SearchDialog() {
  return (
    <>
      <div className="relative w-full max-sm:hidden">
        <Combobox onChange={() => null}>
          <InputGroup>
            <Search className="text-obsidian-400" />
            <ComboboxInput
              as={Input}
              focusRing={false}
              placeholder="Search..."
              className={'rounded-full *:[input]:rounded-full'}
            />
          </InputGroup>
        </Combobox>
      </div>

      {/* Start of mobile only */}
      <Button size="sm" className="sm:hidden">
        <Search />
      </Button>
    </>
  )
}

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'



 function Selector({data, selected, setSelected}) {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? data
      : data.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="mx-3 w-52">
      <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')} >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-none'
            )}
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
            readOnly
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl bg-neutral-900 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-2000 ease-in data-[leave]:data-[closed]:opacity-0 z-30'
          )}
        >
          {filteredPeople.map((person, index) => (
            <ComboboxOption
              key={index}
              value={person}
              className=" flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
export default Selector 
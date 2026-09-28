/**
 * Un groupe de boutons où un seul choix est actif.
 * `fieldset` + `aria-pressed` suffisent : pas besoin d'une librairie.
 */
interface Option {
  value: string
  label: string
  hint?: string
}

interface ChoiceButtonsProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  columns?: 2 | 3
}

export default function ChoiceButtons({ label, value, onChange, options, columns = 3 }: ChoiceButtonsProps) {
  return (
    <fieldset className="choice">
      <legend>{label}</legend>
      <div className={columns === 2 ? 'choice-grid two' : 'choice-grid'} role="group">
        {options.map((option) => {
          const selected = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              className={selected ? 'choice-btn on' : 'choice-btn'}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
            >
              {option.label}
              {option.hint ? <small>{option.hint}</small> : null}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

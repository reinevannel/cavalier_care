interface NyxBubbleProps {
  text: string
  className?: string
}

export default function NyxBubble({ text, className = '' }: NyxBubbleProps) {
  return (
    <div className={`nyx-bubble ${className}`} key={text}>
      <span style={{ marginRight: '6px', fontSize: '14px' }}>🐾</span>
      {text}
    </div>
  )
}

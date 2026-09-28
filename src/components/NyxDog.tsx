import { useState } from 'react'

/**
 * Portrait de Nyx des Prés.
 * Dessiné d'après ses photos : blenheim (chataîn et blanc),
 * grande liste blanche, oreilles longues et soyeuses, yeux ronds.
 * Le léger relief vient d'un dégradé + d'une rotation CSS (perspective),
 * pas d'une librairie 3D — plus simple à lire quand on apprend React.
 */
export type Expression = 'happy' | 'content' | 'sad' | 'toofull' | 'tired' | 'excited'

interface NyxDogProps {
  expression?: Expression
  size?: number
  animate?: boolean
  /** Incline le portrait avec la souris, comme une figurine. */
  tilt?: boolean
  className?: string
}

const mouths: Record<Expression, string> = {
  happy: 'M 108,168 Q 124,184 140,168',
  content: 'M 112,170 Q 124,180 136,170',
  sad: 'M 110,178 Q 124,166 138,178',
  toofull: 'M 114,172 Q 124,168 134,172',
  tired: 'M 114,172 Q 124,178 134,172',
  excited: 'M 104,166 Q 124,190 144,166',
}

function Eye({ cx, cy, expression }: { cx: number; cy: number; expression: Expression }) {
  const sleepy = expression === 'tired' || expression === 'toofull'
  const sad = expression === 'sad'
  const excited = expression === 'excited'
  const r = excited ? 11.5 : sad ? 8.6 : 10.2

  if (sleepy) {
    const droop = expression === 'tired' ? 4 : 2
    return (
      <g>
        <path
          d={`M ${cx - r} ${cy - 1} Q ${cx} ${cy + droop} ${cx + r} ${cy - 1}`}
          stroke="#3A2014"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r + 2} ${cy + 1} Q ${cx} ${cy + droop + 3} ${cx + r - 2} ${cy + 1}`}
          stroke="#C47A52"
          strokeWidth="1.4"
          fill="#F6E4D4"
          strokeLinecap="round"
        />
      </g>
    )
  }

  return (
    <g>
      <ellipse cx={cx} cy={cy + (sad ? 1 : 0)} rx={r + 1.4} ry={r + 1.6} fill="#F4E7DA" />
      <ellipse cx={cx} cy={cy + (sad ? 1 : 0)} rx={r} ry={r * 1.08} fill="#1A0C08" />
      <ellipse cx={cx} cy={cy + (sad ? 2 : 1)} rx={r * 0.62} ry={r * 0.7} fill="#0C0604" />
      <circle cx={cx + r * 0.32} cy={cy - r * 0.32} r={excited ? 3.3 : 2.5} fill="#fff" />
      <circle cx={cx - r * 0.28} cy={cy + r * 0.35} r="1.15" fill="#fff" opacity="0.55" />
    </g>
  )
}

export default function NyxDog({
  expression = 'happy',
  size = 180,
  animate = true,
  tilt = false,
  className = '',
}: NyxDogProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const showTongue = expression === 'happy' || expression === 'excited'
  const wagClass =
    animate && (expression === 'happy' || expression === 'excited' || expression === 'content')
      ? expression === 'excited'
        ? 'animate-wag animate-wag-fast'
        : 'animate-wag'
      : ''

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt) return
    const box = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - box.left) / box.width - 0.5
    const py = (e.clientY - box.top) / box.height - 0.5
    setRot({ x: py * -12, y: px * 16 })
  }

  return (
    <div
      className={`${animate ? 'animate-float' : ''} ${className}`}
      style={{ width: size, height: size * 1.18, perspective: '900px' }}
      onMouseMove={onMove}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: tilt ? 'transform 180ms ease-out' : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 260 310"
          width="100%"
          height="100%"
          role="img"
          aria-label={`Nyx des Prés, Cavalier King Charles blenheim — humeur ${expression}`}
          style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 18px rgba(61,43,31,0.16))' }}
        >
          <defs>
            <radialGradient id="nyx-coat" cx="38%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#E3925C" />
              <stop offset="42%" stopColor="#C4622A" />
              <stop offset="100%" stopColor="#8A3414" />
            </radialGradient>
            <radialGradient id="nyx-head" cx="42%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E7A06C" />
              <stop offset="50%" stopColor="#C56A32" />
              <stop offset="100%" stopColor="#8E3A16" />
            </radialGradient>
            <linearGradient id="nyx-ear" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="#D47842" />
              <stop offset="45%" stopColor="#A3481E" />
              <stop offset="100%" stopColor="#6A2810" />
            </linearGradient>
            <radialGradient id="nyx-white" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F3E4D6" />
            </radialGradient>
            <linearGradient id="nyx-tail" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#C4622A" />
              <stop offset="35%" stopColor="#FFF8F2" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          <ellipse cx="128" cy="292" rx="74" ry="10" fill="rgba(61,43,31,0.10)" />

          {/* Queue blanche, très Nyx : panache clair, base châtain */}
          <g className={wagClass} style={{ transformOrigin: '150px 228px' }}>
            <path
              d="M150 228 C178 214 214 188 228 150 C236 128 220 118 206 128 C186 142 176 168 168 196"
              stroke="url(#nyx-tail)"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M168 196 C190 176 214 158 222 140"
              stroke="#fff"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* Corps assis */}
          <ellipse cx="126" cy="236" rx="74" ry="50" fill="url(#nyx-coat)" />
          <ellipse cx="108" cy="228" rx="34" ry="36" fill="url(#nyx-white)" />
          <path
            d="M92 214 C100 200 128 196 140 210 C132 230 108 242 92 230 Z"
            fill="#fff"
            opacity="0.55"
          />

          {/* Pattes avant blanches */}
          <ellipse cx="100" cy="268" rx="15" ry="22" fill="url(#nyx-white)" />
          <ellipse cx="138" cy="270" rx="15" ry="22" fill="url(#nyx-white)" />
          <ellipse cx="100" cy="286" rx="16" ry="8" fill="#F7EDE4" />
          <ellipse cx="138" cy="288" rx="16" ry="8" fill="#F7EDE4" />
          <path d="M92 284 h16 M90 288 h18" stroke="#E4D0C0" strokeWidth="1" strokeLinecap="round" />
          <path d="M130 286 h16 M128 290 h18" stroke="#E4D0C0" strokeWidth="1" strokeLinecap="round" />

          {/* Oreilles longues, tombantes, un peu ondulées */}
          <path
            d="M86 112 C58 124 34 162 32 206 C30 238 42 268 62 274 C78 278 92 264 96 242 C102 210 100 164 104 136 C106 122 98 112 86 112 Z"
            fill="url(#nyx-ear)"
          />
          <path
            d="M80 140 C64 160 52 196 54 226 C62 248 78 252 84 232 C90 206 88 168 90 146"
            stroke="#F0C2A0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M164 108 C196 122 222 160 220 206 C218 240 204 270 184 274 C166 278 152 262 150 238 C146 204 152 160 146 132 C144 116 152 106 164 108 Z"
            fill="url(#nyx-ear)"
          />
          <path
            d="M176 138 C194 160 204 198 200 228 C192 250 174 252 170 230 C164 204 168 166 164 144"
            stroke="#F0C2A0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Tête */}
          <circle cx="124" cy="118" r="60" fill="url(#nyx-head)" />
          <ellipse cx="100" cy="96" rx="22" ry="14" fill="#fff" opacity="0.16" />

          {/* Liste blanche : front étroit, museau large — le dessin de Nyx */}
          <path
            d="M114 64 C124 58 136 66 136 86 C136 102 130 112 124 116 C118 112 112 102 112 86 C112 74 112 68 114 64 Z"
            fill="url(#nyx-white)"
          />
          <path
            d="M92 132 C98 118 112 114 124 116 C136 114 152 120 158 136 C164 154 156 176 124 184 C92 176 84 154 92 132 Z"
            fill="url(#nyx-white)"
          />
          {/* Taches châtain autour des yeux, comme un masque ouvert */}
          <path d="M78 108 C90 96 108 100 112 114 C100 122 84 120 78 108 Z" fill="#B85A28" opacity="0.95" />
          <path d="M170 106 C158 96 140 100 136 116 C148 124 166 120 170 106 Z" fill="#B85A28" opacity="0.95" />

          <Eye cx={96} cy={116} expression={expression} />
          <Eye cx={150} cy={116} expression={expression} />

          {expression === 'sad' && (
            <g>
              <path d="M82 100 Q92 106 104 102" stroke="#7A3012" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M166 100 Q156 106 144 102" stroke="#7A3012" strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="86" cy="128" rx="3" ry="4.5" fill="#8ECAE6" opacity="0.55" />
            </g>
          )}
          {expression === 'excited' && (
            <g>
              <path d="M80 96 Q92 90 106 96" stroke="#F6E2D0" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M168 96 Q156 90 142 96" stroke="#F6E2D0" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* Nez court, brillant */}
          <path d="M112 150 Q124 144 136 150 Q140 160 124 166 Q108 160 112 150 Z" fill="#1A0C08" />
          <ellipse cx="118" cy="152" rx="3" ry="2" fill="#fff" opacity="0.45" />
          <path d="M124 166 L124 172" stroke="#5C3318" strokeWidth="1.4" strokeLinecap="round" />

          <path d={mouths[expression]} stroke="#6A3418" strokeWidth="2.1" fill="none" strokeLinecap="round" />
          {showTongue && <ellipse cx="124" cy="180" rx={expression === 'excited' ? 8 : 6.5} ry="5.5" fill="#E48B86" />}

          <ellipse cx="86" cy="142" rx="9" ry="5" fill="#E7A088" opacity="0.28" />
          <ellipse cx="162" cy="142" rx="9" ry="5" fill="#E7A088" opacity="0.28" />

          {/* Fin collier noir, comme sur ses photos de promenade, médaille caramel */}
          <path d="M96 176 Q124 190 154 174" stroke="#2A211C" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="124" cy="188" r="6.5" fill="#C4A37A" stroke="#8B6F5C" strokeWidth="1" />
          <circle cx="124" cy="188" r="2.2" fill="#FFFBF7" />
        </svg>
      </div>
    </div>
  )
}

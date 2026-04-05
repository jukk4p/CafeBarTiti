import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a4731',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z" />
          <path d="M15 15 3.3 3.3a2 2 0 1 0-2.8 2.8L12.2 17.8a2 2 0 0 0 2.8 0l0 0" />
          <path d="m2 2 8 8" />
          <path d="m16 16 5 5" />
          <path d="m18 14 3 3" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}

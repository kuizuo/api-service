declare module 'qrcode/lib/core/qrcode.js' {
  interface QRCodeOptions {
    errorCorrectionLevel?: string
    maskPattern?: number
    toSJISFunc?: (code: string) => number
    version?: number
  }

  export function create(data: string | unknown[], options?: QRCodeOptions): unknown
}

declare module 'qrcode/lib/renderer/svg-tag.js' {
  interface SVGOptions {
    color?: {
      dark?: string
      light?: string
    }
    margin?: number
    scale?: number
    width?: number
  }

  export function render(qrData: unknown, options?: SVGOptions): string
}

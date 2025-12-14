import { useEffect, useMemo, useState } from 'react'
import { Button, ActiveButton } from '@/components/ui/button'
import { LucideClipboard, LucideCheck } from 'lucide-react'
import {CopyCodeBox} from "@/components/ui/box";

type DemoPrettyPgfplotsProps = {
    title: string
    subtitle: string
    basePath?: string
}

type Variant = 'pgf' | 'pretty'
type PrettyColors = 'default' | 'custom' | 'cyclelist'

const DEFAULT_BASE = '/demos/prettypgfplots/line'

export default function DemoPrettyPgfPlots({
                                               title, subtitle,
                                               basePath = DEFAULT_BASE,
                                           }: DemoPrettyPgfplotsProps) {
    const [variant, setVariant] = useState<Variant>('pgf')
    const [colors, setColors] = useState<PrettyColors>('default')
    const [tex, setTex] = useState('')
    const [svg, setSvg] = useState('')

    const [loadingTex, setLoadingTex] = useState(false)
    const [errTex, setErrTex] = useState<string | null>(null)

    const { svgUrl, texUrl, dataUrl } = useMemo(() => {
        const dataUrl = `${basePath}/data.tsv`

        if (variant === 'pgf') {
            return {
                svgUrl: `${basePath}/pgf_default.svg`,
                texUrl: `${basePath}/pgf_default.tex`,
                dataUrl,
            }
        }

        const suffix =
            colors === 'default'
                ? 'pretty_default'
                : colors === 'custom'
                    ? 'pretty_custom'
                    : 'pretty_cyclelist'

        return {
            svgUrl: `${basePath}/${suffix}.svg`,
            texUrl: `${basePath}/${suffix}.tex`,
            dataUrl,
        }
    }, [variant, colors, basePath])

    useEffect(() => {
        let cancelled = false
        setLoadingTex(true)
        setErrTex(null)

        fetch(texUrl)
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.text()
            })
            .then((t) => {
                if (cancelled) return
                setTex(t.replace(/\{data\/line\.tsv\}/g, '{data.tsv}'))
                setLoadingTex(false)
            })
            .catch(() => {
                if (cancelled) return
                setErrTex('Could not load LaTeX source.')
                setTex('')
                setLoadingTex(false)
            })

        return () => {
            cancelled = true
        }
    }, [texUrl])

    useEffect(() => {
        let cancelled = false
        setSvg('')

        fetch(svgUrl)
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.text()
            })
            .then((txt) => {
                if (!cancelled) setSvg(txt)
            })
            .catch(() => {
                if (!cancelled) setSvg('')
            })

        return () => {
            cancelled = true
        }
    }, [svgUrl])

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="txt-preset-9 text-gray-700">{title}</div>
                <div className="flex gap-2">
                    <ActiveButton active={variant === 'pgf'} onClick={() => setVariant('pgf')}>
                        pgfplots
                    </ActiveButton>
                    <ActiveButton active={variant === 'pretty'} onClick={() => setVariant('pretty')}>
                        prettyplots
                    </ActiveButton>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
                <div className="relative min-w-0 flex-[1_1_0%] flex flex-col gap-2 pb-10">
                    <div className="txt-preset-10 text-gray-500">LaTeX</div>

                    {loadingTex && <div className="txt-preset-9 text-gray-500">Loading…</div>}
                    {errTex && <div className="txt-preset-9 text-red-600">{errTex}</div>}
                    {!loadingTex && !errTex && <CopyCodeBox code={tex} />}

                    {variant === 'pretty' && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-2">
                            <span className="txt-preset-10 text-gray-500">colors</span>
                            <Pill active={colors === 'default'} onClick={() => setColors('default')} label="default" />
                            <Pill active={colors === 'custom'} onClick={() => setColors('custom')} label="custom" />
                            <Pill active={colors === 'cyclelist'} onClick={() => setColors('cyclelist')} label="cyclelist" />
                        </div>
                    )}

                    <a
                        href={dataUrl}
                        download
                        className="absolute bottom-2 right-2 rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100"
                    >
                        ↓ data.tsv
                    </a>
                </div>

                <div className="min-w-0 flex-[1_1_0%] flex flex-col gap-2">
                    <div className="txt-preset-10 text-gray-500">Preview</div>

                    <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white p-3">
                        {svg ? (
                            <div
                                className="inline-svg w-full overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        ) : (
                            <div className="txt-preset-9 text-gray-500">Loading preview…</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}



function Pill({
                  active,
                  onClick,
                  label,
              }: {
    active: boolean
    onClick: () => void
    label: string
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                active
                    ? 'border-gray-400 bg-white text-gray-900'
                    : 'border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100'
            }`}
        >
            {label}
        </button>
    )
}

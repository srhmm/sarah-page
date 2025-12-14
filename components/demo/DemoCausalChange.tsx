import { useEffect, useMemo, useState } from 'react'
import { ActiveButton } from '@/components/ui/button'
import { CopyCodeBox } from '@/components/ui/box'

type DemoCausalChangeProps = {
    title: string
    subtitle: string
    basePath?: string
}

type Mode = 'continuous' | 'context' | 'time'

type TopicLikeStep = {
    it?: number
    source?: number | null
    added_edges?: Array<[number, number]> | Array<{ from: number; to: number }>
    pruned_edges?: Array<[number, number]> | Array<{ from: number; to: number }>
    edges?: Array<[number, number]> | Array<{ from: number; to: number }>
    graph_edges?: Array<[number, number]> | Array<{ from: number; to: number }>
}

type TopicLikeHistory = {
    nodes: number[]
    node_names?: string[]
    steps?: TopicLikeStep[]
    true_edges?: Array<{ from: number; to: number }> | Array<[number, number]>
}

const DEFAULT_BASE = '/demos/causalchange'

export default function DemoCausalChange({
                                             title, subtitle,
                                             basePath = DEFAULT_BASE,
                                         }: DemoCausalChangeProps) {
    const [mode, setMode] = useState<Mode>('continuous')

    const [code, setCode] = useState('')
    const [loadingCode, setLoadingCode] = useState(false)
    const [errCode, setErrCode] = useState<string | null>(null)

    const [data, setData] = useState<TopicLikeHistory | null>(null)
    const [loadingData, setLoadingData] = useState(false)
    const [errData, setErrData] = useState<string | null>(null)

    const { pyUrl, jsonUrl } = useMemo(() => {
        const folder =
            mode === 'continuous' ? 'continuous' : mode === 'context' ? 'context' : 'time'
        const stem =
            mode === 'continuous' ? 'run_continuous' : mode === 'context' ? 'run_context' : 'run_time'
        return {
            pyUrl: `${basePath}/${folder}/${stem}.py`,
            jsonUrl: `${basePath}/${folder}/${stem}.json`,
        }
    }, [mode, basePath])

    useEffect(() => {
        let cancelled = false
        setLoadingCode(true)
        setErrCode(null)

        fetch(pyUrl)
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.text()
            })
            .then((txt) => {
                if (cancelled) return
                setCode(txt)
                setLoadingCode(false)
            })
            .catch(() => {
                if (cancelled) return
                setErrCode('Could not load python file.')
                setCode('')
                setLoadingCode(false)
            })

        return () => {
            cancelled = true
        }
    }, [pyUrl])

    useEffect(() => {
        let cancelled = false
        setLoadingData(true)
        setErrData(null)

        fetch(jsonUrl)
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then((j) => {
                if (cancelled) return
                setData(j)
                setLoadingData(false)
            })
            .catch(() => {
                if (cancelled) return
                setErrData('Could not load json output.')
                setData(null)
                setLoadingData(false)
            })

        return () => {
            cancelled = true
        }
    }, [jsonUrl])

    const highlighted = code

    const edges = useMemo(() => {
        if (!data) return []
        return deriveFinalEdges(data)
    }, [data])

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="txt-preset-9 text-gray-700">{title}</div>

                <div className="flex gap-2">
                    <ActiveButton active={mode === 'continuous'} onClick={() => setMode('continuous')}>
                        continuous
                    </ActiveButton>
                    <ActiveButton active={mode === 'context'} onClick={() => setMode('context')}>
                        multi-context
                    </ActiveButton>
                    <ActiveButton active={mode === 'time'} onClick={() => setMode('time')}>
                        time series
                    </ActiveButton>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
                <div className="min-w-0 flex-[1_1_0%] flex flex-col gap-2">
                    <div className="txt-preset-10 text-gray-500">Python</div>

                    {loadingCode && <div className="txt-preset-9 text-gray-500">Loading…</div>}
                    {errCode && <div className="txt-preset-9 text-red-600">{errCode}</div>}

                    {!loadingCode && !errCode && (
                        <CopyCodeBox code={code} highlightedHtml={highlighted} langClass="language-python" />
                    )}
                </div>

                <div className="min-w-0 flex-[1_1_0%] flex flex-col gap-2">
                    <div className="txt-preset-10 text-gray-500">Output graph</div>

                    <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white p-3">
                        {loadingData && <div className="txt-preset-9 text-gray-500">Loading…</div>}
                        {errData && <div className="txt-preset-9 text-red-600">{errData}</div>}

                        {!loadingData && !errData && data && (
                            <GraphPreview nodes={data.nodes ?? []} nodeNames={data.node_names} edges={edges} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}



function deriveFinalEdges(data: TopicLikeHistory): Array<{ from: number; to: number }> {
    const steps = data.steps ?? []
    if (steps.length === 0) return []

    const last = steps[steps.length - 1]
    const snap =
        last.graph_edges ?? last.edges ?? last.graph_edges ?? last.edges

    if (snap && Array.isArray(snap)) {
        return normalizeEdges(snap)
    }

    const E = new Map<string, { from: number; to: number }>()
    for (const st of steps) {
        if (st.added_edges) {
            for (const e of normalizeEdges(st.added_edges)) E.set(`${e.from}->${e.to}`, e)
        }
        if (st.pruned_edges) {
            for (const e of normalizeEdges(st.pruned_edges)) E.delete(`${e.from}->${e.to}`)
        }
    }
    return [...E.values()]
}

function normalizeEdges(
    edges: Array<[number, number]> | Array<{ from: number; to: number }>
): Array<{ from: number; to: number }> {
    return edges.map((e: any) => {
        if (Array.isArray(e)) return { from: Number(e[0]), to: Number(e[1]) }
        return { from: Number(e.from), to: Number(e.to) }
    })
}

function GraphPreview({
                          nodes,
                          nodeNames,
                          edges,
                      }: {
    nodes: number[]
    nodeNames?: string[]
    edges: Array<{ from: number; to: number }>
}) {
    const W = 520
    const H = 320
    const cx = W / 2
    const cy = H / 2
    const r = Math.min(W, H) * 0.33

    const positions = useMemo(() => {
        const n = nodes.length
        const pos = new Map<number, { x: number; y: number }>()
        nodes.forEach((id, i) => {
            const a = (2 * Math.PI * i) / Math.max(1, n) - Math.PI / 2
            pos.set(id, { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) })
        })
        return pos
    }, [nodes, cx, cy, r])

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
            <defs>
                <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M0,0 L9,3 L0,6 Z" />
                </marker>
            </defs>

            {edges.map((e, idx) => {
                const a = positions.get(e.from)
                const b = positions.get(e.to)
                if (!a || !b) return null

                const mx = (a.x + b.x) / 2
                const my = (a.y + b.y) / 2
                const dx = b.x - a.x
                const dy = b.y - a.y
                const len = Math.max(1, Math.hypot(dx, dy))
                const nx = -dy / len
                const ny = dx / len
                const bend = 18

                const qx = mx + nx * bend
                const qy = my + ny * bend

                return (
                    <path
                        key={idx}
                        d={`M ${a.x} ${a.y} Q ${qx} ${qy} ${b.x} ${b.y}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        markerEnd="url(#arrow)"
                        opacity={0.85}
                    />
                )
            })}

            {nodes.map((id) => {
                const p = positions.get(id)
                if (!p) return null
                const label = nodeNames?.[id] ?? String(id)
                return (
                    <g key={id} transform={`translate(${p.x},${p.y})`}>
                        <circle r="16" fill="white" stroke="currentColor" strokeWidth="1.5" />
                        <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="12"
                        >
                            {label}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

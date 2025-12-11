import { useEffect, useMemo, useState } from 'react'

type DemoTopicProps = {
    title: string
    dataUrl: string
}

type TopicEdge = {
    from: number
    to: number
    gain?: number
    diff?: number
}

type TrueEdge = {
    from: number
    to: number
}

type SourceSelection = {
    candidates: number[]
    improvement_matrix: (number | null)[][]
    delta_matrix: (number | null)[][]
    best_delta: (number | null)[]
    ranking: { node: number; best_delta: number | null }[]
}

type TopicStep = {
    iteration: number
    source: number
    topological_order: number[]
    remaining_candidates: number[]
    source_selection: SourceSelection
    added_edges: TopicEdge[]
    pruned_edges: TopicEdge[]
    outgoing_scores: {
        from: number
        to: number
        gain: number
        significant: boolean
    }[]
    incoming_scores: { from: number; to: number; diff: number }[]
}

type TopicData = {
    nodes: number[]
    node_names: string[]
    steps: TopicStep[]
    true_edges?: TrueEdge[]
}

type PositionedNode = {
    id: number
    name: string
    x: number
    y: number
}

type Phase = 'initial' | 'highlight' | 'edges'

export default function DemoTopic({ title, dataUrl }: DemoTopicProps) {
    const [data, setData] = useState<TopicData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [flatStepIndex, setFlatStepIndex] = useState(0)
    const [showTruth, setShowTruth] = useState(false)

    // load JSON
    useEffect(() => {
        setError(null)
        setData(null)
        setFlatStepIndex(0)
        setShowTruth(false)

        fetch(dataUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`)
                }
                return res.json()
            })
            .then((json: TopicData) => {
                setData(json)
            })
            .catch((err) => {
                console.error(err)
                setError('Could not load TOPIC demo data.')
            })
    }, [dataUrl])

    const layout = useNodeLayout(data)

    const { phase, iterationIndex, totalFlatSteps } = useFlatStepState(
        data,
        flatStepIndex,
    )

    const {
        edgesBeforeIteration,
        edgesAtIteration,
        addedThisIteration,
        prunedThisIteration,
    } = useEdgesForPhase(data, iterationIndex, phase)

    const currentStep = data && data.steps[iterationIndex]
    const maxFlatIndex = totalFlatSteps - 1

    const handleNext = () => {
        setFlatStepIndex((prev) => Math.min(prev + 1, maxFlatIndex))
    }

    const handlePrev = () => {
        setFlatStepIndex((prev) => Math.max(prev - 1, 0))
    }

    if (error) {
        return (
            <div className="flex flex-col gap-2">
                <div className="txt-preset-9 text-gray-700">{title}</div>
                <div className="txt-preset-9 text-red-600">{error}</div>
            </div>
        )
    }

    if (!data || !layout || !currentStep) {
        return (
            <div className="flex flex-col gap-2">
                <div className="txt-preset-9 text-gray-700">{title}</div>
                <div className="txt-preset-9 text-gray-500">
                    Loading TOPIC interactive demo…
                </div>
            </div>
        )
    }

    const { nodes } = layout
    const { source, topological_order, source_selection } = currentStep

    const stepLabel = `Step ${flatStepIndex + 1} / ${totalFlatSteps}`
    const phaseLabel =
        phase === 'initial'
            ? 'Initial: only nodes are visible.'
            : phase === 'highlight'
                ? `Iteration ${iterationIndex + 1}: chosen source is highlighted.`
                : `Iteration ${iterationIndex + 1}: edges are added and pruned.`

    const edgesToRender =
        phase === 'edges' ? edgesAtIteration : edgesBeforeIteration

    const hasTruth = !!(data.true_edges && data.true_edges.length > 0)

    return (
        <div className="flex flex-col gap-3">
            {/* Header + controls */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                    <div className="txt-preset-9 text-gray-700">{title}</div>
                    <div className="txt-preset-10 text-gray-500">{stepLabel}</div>
                    <div className="txt-preset-10 text-gray-400">{phaseLabel}</div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={flatStepIndex === 0}
                        className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 disabled:opacity-40 hover:bg-gray-100"
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={flatStepIndex === maxFlatIndex}
                        className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 disabled:opacity-40 hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Short description */}
            <p className="txt-preset-9 text-gray-500">
                TOPIC discovers a topological ordering by repeatedly picking a source
                node, adding outgoing edges by score, and pruning incoming edges. First
                you see the nodes, then the chosen source, then the edges added/pruned
                for that iteration.
            </p>

            {/* Main content: graph + side panel */}
            <div className="flex flex-col gap-3 md:flex-row">
                {/* Algorithm graph */}
                <div className="flex-1 flex justify-center">
                    <TopicGraph
                        nodes={nodes}
                        edges={edgesToRender}
                        source={phase === 'initial' ? null : source}
                        addedThisStep={phase === 'edges' ? addedThisIteration : []}
                        prunedThisStep={phase === 'edges' ? prunedThisIteration : []}
                    />
                </div>

                {/* Side panel: order + ranking + truth toggle */}
                <div className="w-full md:w-64 flex flex-col gap-3">
                    <OrderStrip
                        nodes={nodes}
                        order={phase === 'initial' ? [] : topological_order}
                        remaining={
                            phase === 'initial'
                                ? data.nodes
                                : currentStep.remaining_candidates
                        }
                        source={phase === 'initial' ? null : source}
                    />
                    <RankingPanel
                        nodes={nodes}
                        sourceSelection={source_selection}
                        source={phase === 'initial' ? null : source}
                    />

                    {hasTruth && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowTruth((prev) => !prev)}
                                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100"
                            >
                                {showTruth ? 'Hide ground-truth graph' : 'Show ground-truth graph'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Expandable ground-truth section */}
            {hasTruth && showTruth && (
                <div className="flex flex-col gap-1 mt-1">
                    <div className="txt-preset-10 text-gray-500">
                        Ground-truth causal graph
                    </div>
                    <div className="flex justify-center">
                        <TrueGraph nodes={nodes} edges={data.true_edges!} />
                    </div>
                </div>
            )}

            <div className="txt-preset-10 text-gray-400">
                Tip: use the stepper to see TOPIC&apos;s reasoning: which node is
                selected as a source, which edges are added, and which parents get
                pruned.
            </div>
        </div>
    )
}

/* ---------- Layout helpers ---------- */

function useNodeLayout(data: TopicData | null) {
    return useMemo(() => {
        if (!data) return null

        const width = 360
        const height = 220
        const n = data.nodes.length
        if (n === 0) return { width, height, nodes: [] as PositionedNode[] }

        const horizontalPadding = 40
        const usableWidth = width - 2 * horizontalPadding
        const stepX = usableWidth / Math.max(1, n - 1)
        const centerY = height / 2

        const nodes: PositionedNode[] = data.nodes.map((id, idx) => ({
            id,
            name: data.node_names[idx] ?? String(id),
            x: horizontalPadding + stepX * idx,
            y: centerY,
        }))

        return { width, height, nodes }
    }, [data])
}

/**
 * Flattened step index:
 *  - 0: initial (only nodes)
 *  - for iteration i in [0, T-1]:
 *      1 + 2*i: highlight source at iteration i
 *      2 + 2*i: show edges/pruning at iteration i
 */
function useFlatStepState(
    data: TopicData | null,
    flatStepIndex: number,
): { phase: Phase; iterationIndex: number; totalFlatSteps: number } {
    return useMemo(() => {
        const stepsCount = data?.steps.length ?? 0
        if (!data || stepsCount === 0) {
            return { phase: 'initial', iterationIndex: 0, totalFlatSteps: 1 }
        }

        const totalFlatSteps = 1 + stepsCount * 2

        if (flatStepIndex <= 0) {
            return { phase: 'initial', iterationIndex: 0, totalFlatSteps }
        }

        const s = flatStepIndex - 1
        const iter = Math.min(Math.floor(s / 2), stepsCount - 1)
        const sub = s % 2 // 0 = highlight, 1 = edges

        const phase: Phase = sub === 0 ? 'highlight' : 'edges'

        return { phase, iterationIndex: iter, totalFlatSteps }
    }, [data, flatStepIndex])
}

/**
 * Build edges for:
 *  - phase 'highlight': show edges from all *previous* iterations
 *  - phase 'edges': show edges including this iteration's additions/pruning
 */
function useEdgesForPhase(
    data: TopicData | null,
    iterationIndex: number,
    phase: Phase,
): {
    edgesBeforeIteration: TopicEdge[]
    edgesAtIteration: TopicEdge[]
    addedThisIteration: TopicEdge[]
    prunedThisIteration: TopicEdge[]
} {
    return useMemo(() => {
        if (!data || data.steps.length === 0) {
            return {
                edgesBeforeIteration: [],
                edgesAtIteration: [],
                addedThisIteration: [],
                prunedThisIteration: [],
            }
        }

        const steps = data.steps
        const iter = Math.min(Math.max(iterationIndex, 0), steps.length - 1)

        const edgeMapBefore = new Map<string, TopicEdge>()
        steps.slice(0, iter).forEach((step) => {
            step.added_edges.forEach((e) => {
                const key = `${e.from}->${e.to}`
                edgeMapBefore.set(key, { from: e.from, to: e.to, gain: e.gain })
            })
            step.pruned_edges.forEach((e) => {
                const key = `${e.from}->${e.to}`
                edgeMapBefore.delete(key)
            })
        })

        const edgesBeforeIteration = Array.from(edgeMapBefore.values())

        const edgeMapAt = new Map(edgeMapBefore)
        const current = steps[iter]
        current.added_edges.forEach((e) => {
            const key = `${e.from}->${e.to}`
            edgeMapAt.set(key, { from: e.from, to: e.to, gain: e.gain })
        })
        current.pruned_edges.forEach((e) => {
            const key = `${e.from}->${e.to}`
            edgeMapAt.delete(key)
        })

        const edgesAtIteration = Array.from(edgeMapAt.values())

        const addedThisIteration = current.added_edges
        const prunedThisIteration = current.pruned_edges

        return {
            edgesBeforeIteration:
                phase === 'edges' ? edgesAtIteration : edgesBeforeIteration,
            edgesAtIteration,
            addedThisIteration,
            prunedThisIteration,
        }
    }, [data, iterationIndex, phase])
}

/* ---------- True graph (with curved edges) ---------- */

type TrueGraphProps = {
    nodes: PositionedNode[]
    edges: TrueEdge[]
}

function TrueGraph({ nodes, edges }: TrueGraphProps) {
    const width = 360
    const height = 220

    const nodeById = useMemo(() => {
        const map = new Map<number, PositionedNode>()
        nodes.forEach((n) => map.set(n.id, n))
        return map
    }, [nodes])

    return (
        <svg
            width={width}
            height={height}
            className="bg-white rounded-md border border-gray-100"
        >
            <defs>
                <marker
                    id="arrowhead-true"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                >
                    <polygon points="0 0, 6 3, 0 6" fill="#9ca3af" />
                </marker>
            </defs>

            {edges.map((e, idx) => {
                const from = nodeById.get(e.from)
                const to = nodeById.get(e.to)
                if (!from || !to) return null

                const dx = to.x - from.x
                const dy = to.y - from.y
                const len = Math.sqrt(dx * dx + dy * dy) || 1
                const ux = dx / len
                const uy = dy / len

                const startX = from.x + ux * 14
                const startY = from.y + uy * 14
                const endX = to.x - ux * 14
                const endY = to.y - uy * 14

                const midX = (startX + endX) / 2
                const midY = (startY + endY) / 2
                const offset = 18 + Math.min(24, Math.abs(dx) * 0.15)
                const ctrlX = midX
                const ctrlY = midY - offset

                const d = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`

                return (
                    <path
                        key={idx}
                        d={d}
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth={1.4}
                        markerEnd="url(#arrowhead-true)"
                    />
                )
            })}

            {nodes.map((n) => (
                <g key={n.id}>
                    <circle
                        cx={n.x}
                        cy={n.y}
                        r={7}
                        fill="#ffffff"
                        stroke="#9ca3af"
                        strokeWidth={1.2}
                    />
                    <text
                        x={n.x}
                        y={n.y + 7 + 12}
                        textAnchor="middle"
                        className="txt-preset-10"
                        fill="#4b5563"
                    >
                        {n.name}
                    </text>
                </g>
            ))}
        </svg>
    )
}

/* ---------- Algorithm graph (curved edges) ---------- */

type TopicGraphProps = {
    nodes: PositionedNode[]
    edges: TopicEdge[]
    source: number | null
    addedThisStep: TopicEdge[]
    prunedThisStep: TopicEdge[]
}

function TopicGraph({
                        nodes,
                        edges,
                        source,
                        addedThisStep,
                        prunedThisStep,
                    }: TopicGraphProps) {
    const width = 360
    const height = 220

    const nodeById = useMemo(() => {
        const map = new Map<number, PositionedNode>()
        nodes.forEach((n) => map.set(n.id, n))
        return map
    }, [nodes])

    const addedSet = useMemo(() => {
        const s = new Set<string>()
        addedThisStep.forEach((e) => s.add(`${e.from}->${e.to}`))
        return s
    }, [addedThisStep])

    const prunedSet = useMemo(() => {
        const s = new Set<string>()
        prunedThisStep.forEach((e) => s.add(`${e.from}->${e.to}`))
        return s
    }, [prunedThisStep])

    return (
        <svg
            width={width}
            height={height}
            className="bg-white rounded-md border border-gray-100"
        >
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                >
                    <polygon points="0 0, 6 3, 0 6" fill="#9ca3af" />
                </marker>
                <marker
                    id="arrowhead-added"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                >
                    <polygon points="0 0, 6 3, 0 6" fill="#16a34a" />
                </marker>
                <marker
                    id="arrowhead-pruned"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                >
                    <polygon points="0 0, 6 3, 0 6" fill="#dc2626" />
                </marker>
            </defs>

            {/* curved edges */}
            {edges.map((e, idx) => {
                const from = nodeById.get(e.from)
                const to = nodeById.get(e.to)
                if (!from || !to) return null

                const key = `${e.from}->${e.to}`
                const isAddedNow = addedSet.has(key)
                const isPrunedNow = prunedSet.has(key)

                const dx = to.x - from.x
                const dy = to.y - from.y
                const len = Math.sqrt(dx * dx + dy * dy) || 1
                const ux = dx / len
                const uy = dy / len

                const startX = from.x + ux * 14
                const startY = from.y + uy * 14
                const endX = to.x - ux * 14
                const endY = to.y - uy * 14

                const midX = (startX + endX) / 2
                const midY = (startY + endY) / 2
                const baseOffset = 16
                const extra = Math.min(24, Math.abs(dx) * 0.15)
                const offset = baseOffset + extra
                const ctrlX = midX
                const ctrlY = midY - offset

                const d = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`

                let stroke = '#9ca3af'
                let marker = 'url(#arrowhead)'
                let strokeWidth = 1.2
                let dash: string | undefined

                if (isAddedNow) {
                    stroke = '#16a34a'
                    marker = 'url(#arrowhead-added)'
                    strokeWidth = 1.6
                } else if (isPrunedNow) {
                    stroke = '#dc2626'
                    marker = 'url(#arrowhead-pruned)'
                    strokeWidth = 1.4
                    dash = '4 2'
                }

                return (
                    <path
                        key={idx}
                        d={d}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeDasharray={dash}
                        markerEnd={marker}
                    />
                )
            })}

            {/* nodes */}
            {nodes.map((n) => {
                const isSource = source !== null && n.id === source
                const radius = isSource ? 10 : 8
                const fill = isSource ? '#2563eb' : '#ffffff'
                const stroke = isSource ? '#2563eb' : '#9ca3af'
                const strokeWidth = isSource ? 2 : 1.2

                return (
                    <g key={n.id}>
                        <circle
                            cx={n.x}
                            cy={n.y}
                            r={radius}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                        />
                        <text
                            x={n.x}
                            y={n.y + radius + 12}
                            textAnchor="middle"
                            className="txt-preset-10"
                            fill="#4b5563"
                        >
                            {n.name}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

/* ---------- Order strip ---------- */

type OrderStripProps = {
    nodes: PositionedNode[]
    order: number[]
    remaining: number[]
    source: number | null
}

function OrderStrip({ nodes, order, remaining, source }: OrderStripProps) {
    const nameMap = useMemo(() => {
        const m = new Map<number, string>()
        nodes.forEach((n) => m.set(n.id, n.name))
        return m
    }, [nodes])

    return (
        <div className="flex flex-col gap-1">
            <div className="txt-preset-10 text-gray-500">
                Topological order (so far)
            </div>
            <div className="flex flex-wrap gap-1">
                {order.map((id) => (
                    <span
                        key={id}
                        className="rounded-full bg-blue-50 px-2 py-0.5 txt-preset-10 text-blue-700 border border-blue-200"
                    >
            {nameMap.get(id) ?? id}
          </span>
                ))}
                {order.length === 0 && (
                    <span className="txt-preset-10 text-gray-400">none yet</span>
                )}
            </div>
            <div className="txt-preset-10 text-gray-500 mt-2">Candidate sources</div>
            <div className="flex flex-wrap gap-1">
                {remaining.map((id) => {
                    const isCurrent = source !== null && id === source
                    return (
                        <span
                            key={id}
                            className={`rounded-full px-2 py-0.5 txt-preset-10 border ${
                                isCurrent
                                    ? 'bg-yellow-50 text-yellow-800 border-yellow-300'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                        >
              {nameMap.get(id) ?? id}
                            {isCurrent && <span className="ml-1 text-[10px]">(chosen)</span>}
            </span>
                    )
                })}
                {remaining.length === 0 && (
                    <span className="txt-preset-10 text-gray-400">none</span>
                )}
            </div>
        </div>
    )
}

/* ---------- Ranking panel ---------- */

type RankingPanelProps = {
    nodes: PositionedNode[]
    sourceSelection: SourceSelection
    source: number | null
}

function RankingPanel({
                          nodes,
                          sourceSelection,
                          source,
                      }: RankingPanelProps) {
    const nameMap = useMemo(() => {
        const m = new Map<number, string>()
        nodes.forEach((n) => m.set(n.id, n.name))
        return m
    }, [nodes])

    const items = sourceSelection.ranking

    return (
        <div className="flex flex-col gap-1">
            <div className="txt-preset-10 text-gray-500">
                Source selection scores (smaller is more source-like)
            </div>
            <div className="border border-gray-100 rounded-md bg-white px-2 py-1.5 max-h-40 overflow-auto">
                {items.map((r) => {
                    const label = nameMap.get(r.node) ?? r.node
                    const val =
                        r.best_delta === null || Number.isNaN(r.best_delta)
                            ? '—'
                            : r.best_delta.toFixed(2)
                    const isSource = source !== null && r.node === source

                    return (
                        <div
                            key={r.node}
                            className={`flex items-center justify-between txt-preset-10 py-0.5 ${
                                isSource ? 'text-blue-700 font-medium' : 'text-gray-700'
                            }`}
                        >
                            <span>{label}</span>
                            <span className="tabular-nums text-gray-500">{val}</span>
                        </div>
                    )
                })}
                {items.length === 0 && (
                    <div className="txt-preset-10 text-gray-400">no scores</div>
                )}
            </div>
        </div>
    )
}

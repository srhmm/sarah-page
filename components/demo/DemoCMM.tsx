import { useEffect, useMemo, useState } from 'react'
import {ActiveButton} from "@/components/ui/button";

type DemoCMMProps = {
    title: string
    subtitle: string
    dataUrl: string
}

type Point = {
    x: number
    y: number
    component: number
    soft?: number[]
}

type CmmData = {
    points: Point[]
    components: number
    bic?: {
        X_to_Y: number
        Y_to_X: number
    }
    meta?: {
        dataset?: string
        variable_pair?: string
    }
}

export default function DemoCMM({ title, subtitle, dataUrl }: DemoCMMProps) {
    const [data, setData] = useState<CmmData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isColored, setIsColored] = useState(false)

    useEffect(() => {
        setError(null)
        setData(null)
        setIsColored(false)

        fetch(dataUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`)
                }
                return res.json()
            })
            .then((json: CmmData) => {
                setData(json)
            })
            .catch((err) => {
                console.error(err)
                setError('Could not load demo data.')
            })
    }, [dataUrl])

    const plot = useScatterLayout(data)

    if (error) {
        return (
            <div className="txt-preset-9 text-red-600">
                {error}
            </div>
        )
    }

    if (!data || !plot) {
        return (
            <div className="txt-preset-9 text-gray-500">
                Loading interactive demo…
            </div>
        )
    }

    const { width, height, padding, xScale, yScale, colors } = plot

    const handleToggleColor = () => {
        setIsColored((prev) => !prev)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <div className="txt-preset-9 text-gray-700">
                    {title}
                        <span className="text-gray-500"> ·  {subtitle} </span>
                    {/*{data.meta?.variable_pair && (
                        <span className="text-gray-500"> · {data.meta.variable_pair}</span>
                    )} */}
                </div>
                <ActiveButton active={isColored} onClick={handleToggleColor}>
                    {isColored ? 'Hide components' : 'Reveal components'}
                </ActiveButton>
            </div>

            <div className="flex justify-center">
                <svg
                    width={width}
                    height={height}
                    className="cursor-pointer"
                    onClick={handleToggleColor}
                >
                    {/* Axes */}
                    <line
                        x1={padding.left}
                        y1={height - padding.bottom}
                        x2={width - padding.right}
                        y2={height - padding.bottom}
                        stroke="#d1d5db"
                        strokeWidth={1}
                    />
                    <line
                        x1={padding.left}
                        y1={padding.top}
                        x2={padding.left}
                        y2={height - padding.bottom}
                        stroke="#d1d5db"
                        strokeWidth={1}
                    />

                    {/* Points */}
                    {data.points.map((p, i) => {
                        const cx = xScale(p.x)
                        const cy = yScale(p.y)
                        const fill = isColored
                            ? colors[p.component % colors.length]
                            : '#9ca3af'
                        const opacity = isColored ? 0.9 : 0.8

                        return (
                            <circle
                                key={i}
                                cx={cx}
                                cy={cy}
                                r={3}
                                fill={fill}
                                fillOpacity={opacity}
                            />
                        )
                    })}
                </svg>
            </div>
            {/*{isColored && (
                <div className="txt-preset-10 text-gray-400">
                    Components
                </div>
            )}*/}
        </div>
    )
}

function useScatterLayout(data: CmmData | null) {
    return useMemo(() => {
        if (!data || !data.points.length) return null

        const width = 360
        const height = 260
        const padding = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 35,
        }

        const xs = data.points.map((p) => p.x)
        const ys = data.points.map((p) => p.y)

        const xMin = Math.min(...xs)
        const xMax = Math.max(...xs)
        const yMin = Math.min(...ys)
        const yMax = Math.max(...ys)

        const expand = (min: number, max: number, factor = 0.05) => {
            const range = max - min || 1
            const pad = range * factor
            return [min - pad, max + pad]
        }

        const [x0, x1] = expand(xMin, xMax)
        const [y0, y1] = expand(yMin, yMax)

        const xScale = (x: number) =>
            padding.left +
            ((x - x0) / (x1 - x0)) * (width - padding.left - padding.right)

        const yScale = (y: number) =>
            height -
            padding.bottom -
            ((y - y0) / (y1 - y0)) * (height - padding.top - padding.bottom)

        const colors = ['#4fa2e1', '#E2A432']

        return {
            width,
            height,
            padding,
            xScale,
            yScale,
            colors,
        }
    }, [data])
}

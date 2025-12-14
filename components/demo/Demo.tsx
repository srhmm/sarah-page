import { DemoKey } from '@/types/main'
import DemoCMM from './DemoCMM'
import DemoTopic from './DemoTopic'
import DemoPrettyPgfPlots from "@/components/demo/DemoPrettyPgfPlots"
import DemoCausalChange from "@/components/demo/DemoCausalChange"
export type { DemoKey }

const DEMO_META: Record<
    DemoKey,
    { title: string; subtitle: string; dataUrl: string }
> = {
    'causal-mixture-models': {
        title: 'CMM',
        subtitle: 'bivariate example',
        dataUrl: '/demos/cmm_tcga_colon_x3_y3.json',
    },
    'topic-ordering': {
        title: 'TOPIC',
        subtitle: 'step by step',
        dataUrl: '/demos/topic_history_synthetic_n5.json',
    },
    'prettypgfplots-line': {
        title: 'prettypgfplots',
        subtitle: 'line plot',
        dataUrl: '',
    },
    'causal-change': {
        title: 'causalchange',
        subtitle: 'causal discovery',
        dataUrl: '',
    },
}

type DemoProps = {
    demoId: DemoKey
}

export default function Demo({ demoId }: DemoProps) {
    const config = DEMO_META[demoId]

    if (demoId === 'causal-mixture-models') {
        return <DemoCMM title={config.title} subtitle={config.subtitle} dataUrl={config.dataUrl} />
    }
    if (demoId === 'topic-ordering') {
        return <DemoTopic title={config.title} subtitle={config.subtitle} dataUrl={config.dataUrl} />
    }
    if (demoId === 'prettypgfplots-line') {
        return <DemoPrettyPgfPlots title={config.title} subtitle={config.subtitle} />
    }
    if (demoId === 'causal-change') {
        return <DemoCausalChange title={config.title} subtitle={config.subtitle} />
    }
    return null
}




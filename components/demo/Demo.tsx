import { DemoKey } from './types'
import CmmDemo from './DemoCMM'
import TopicDemo from './DemoTopic'

export type { DemoKey }  // re-export if convenient

const DEMO_META: Record<
    DemoKey,
    { title: string; dataUrl: string }
> = {
    'causal-mixture-models': {
        title: 'Causal Mixture Models: bivariate example',
        dataUrl: '/demos/cmm_tcga_colon_x3_y3.json',
    },
    'topic-ordering': {
        title: 'TOPIC: topological ordering demo',
        dataUrl: '/demos/topic_history_synthetic_n5.json',
    },
}

type DemoProps = {
    demoId: DemoKey
}

export default function Demo({ demoId }: DemoProps) {
    const config = DEMO_META[demoId]

    if (demoId === 'causal-mixture-models') {
        return <CmmDemo title={config.title} dataUrl={config.dataUrl} />
    }
    if (demoId === 'topic-ordering') {
        return <TopicDemo title={config.title} dataUrl={config.dataUrl} />
    }

    return null
}

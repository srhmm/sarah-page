import {useState} from "react";
import {Button} from "@/components/ui/button";
import {LucideCheck, LucideClipboard} from "lucide-react";

type CopyCodeBoxProps = {
    code: string
    highlightedHtml?: string
    langClass?: string
}

export function CopyCodeBox({
                                code,
                                highlightedHtml,
                                langClass,
                            }: CopyCodeBoxProps) {
    const [copyState, setCopyState] = useState<'default' | 'copied'>('default')

    async function onCopy() {
        if (copyState === 'copied') return
        await navigator.clipboard.writeText(code)
        setCopyState('copied')
        setTimeout(() => setCopyState('default'), 2000)
    }

    return (
        <div className="relative w-full rounded-lg border border-gray-100 bg-white p-3">
      <pre className="w-full overflow-x-auto whitespace-pre text-[12px] leading-[1.45]">
        <code
            className={`${langClass ?? ''} txt-preset-mono text-gray-800`}
            dangerouslySetInnerHTML={{
                __html: highlightedHtml ?? code,
            }}
        />
      </pre>

            <Button
                className="absolute top-2 right-2 rounded-md bg-white hover:bg-gray-200"
                variant="ghost"
                size="sm"
                onClick={onCopy}
                disabled={!code}
            >
                {copyState === 'default' ? (
                    <LucideClipboard className="text-gray-600/90" />
                ) : (
                    <LucideCheck className="text-gray-600/90" />
                )}
            </Button>
        </div>
    )
}

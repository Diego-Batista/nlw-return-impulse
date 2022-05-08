import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bungImageUrl from "../../assets/bug.svg";
import ideiaImageUrl from "../../assets/ideia.svg";
import outroImageUrl from "../../assets/outro.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";


export const feedbackTypes = {
    BUG:{
        title: "Problema",
        image: {
            source: bungImageUrl,
            alt: "Imagem de um inseto",
        }
    },
    IDEA:{
        title: "Ideia",
        image: {
            source: ideiaImageUrl,
            alt: "Imagem de uma lâmpada",
        }
    },
    OTHER:{
        title: "Outro",
        image: {
            source: outroImageUrl,
            alt: "Imagem um balão de pensamento",
        }
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function hendleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ? (
                <FeedbackSucessStep
                    onFeedbackRestartRequested={hendleRestartFeedback}
                />
            ):(
                <>
                    {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={hendleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="">Rocketseat</a>
            </footer>
        </div>
    );
}
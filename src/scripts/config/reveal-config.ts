import type { PresentationConfig, RevealOptions } from './types';

export function createRevealConfig(config: PresentationConfig): RevealOptions {
    return {
        ...config.reveal
    };
}



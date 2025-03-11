import React from 'react';

import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { Cover } from '@/components/ui/cover';
import ProtocolBlock from './ProtocolBlock';

const HeadSection = () => {
  return (
    <main className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-background to-accent/10" />
        <GridPattern 
          className="absolute inset-0 opacity-40" 
          width={24} 
          height={24} 
          strokeDasharray="2 2" 
          strokeWidth={1}
          stroke="currentColor"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/80 to-background p-2 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-2 px-4 py-2">
                  <span className="text-xl">⚡️</span>
                  <AnimatedShinyText shimmerWidth={200} className="text-primary font-medium">
                    USB-C of LLM tools 
                  </AnimatedShinyText>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="relative">
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 blur-2xl opacity-30" />
                  <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    model-context-protocol.com
                  </span>
                </span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <InteractiveHoverButton 
                className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
              >
                Start Exploring
              </InteractiveHoverButton>
              <InteractiveHoverButton 
                className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary/90"
              >
                Add Your Server
              </InteractiveHoverButton>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-2xl opacity-50" />
            <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
              <ProtocolBlock />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeadSection;

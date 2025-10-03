import Navbar from "@/components/Navbar";
import DevHeader from "@/components/DevHeader";
import Footer from "@/components/Footer";
import AIGeneratorForm from "@/components/AIGeneratorForm";
import { Card } from "@/components/ui/card";
import { Lightbulb, Zap, Clock } from "lucide-react";

export default function AIGenerator() {
  const tips = [
    {
      icon: Lightbulb,
      title: "Be Specific",
      description: "Provide clear topics for better AI-generated content",
    },
    {
      icon: Zap,
      title: "Quick Results",
      description: "Generate multiple blogs in seconds",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Focus on editing rather than writing from scratch",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <DevHeader />
      
      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Blog Generator</h1>
            <p className="text-muted-foreground text-lg">
              Let AI create engaging blog content for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <AIGeneratorForm />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Tips for Better Results</h2>
              
              {tips.map((tip, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <tip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

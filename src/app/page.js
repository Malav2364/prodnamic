"use client"

import React, { useState } from 'react'
import { ModeToggle } from '@/components/toggle-button'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Sparkles, Hash } from "lucide-react"
import { toast } from "sonner" // Using sonner instead of the deprecated toast component
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [generatedContent, setGeneratedContent] = useState({
    description: "",
    hashtags: []
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContent = async () => {
    if (!productName.trim() || !productDescription.trim()) {
      toast.error("Missing information", {
        description: "Please provide both a product name and description.",
      })
      return
    }

    setIsGenerating(true)

    // Simulating API call
    setTimeout(() => {
      // This would be replaced with your actual API call
      const mockDescription = `Introducing the ${productName}: the perfect solution for modern consumers looking for quality and innovation. This premium product combines elegant design with cutting-edge technology, making it an essential addition to your lifestyle. Expertly crafted with high-quality materials, the ${productName} offers unmatched durability and performance that will exceed your expectations.`
      
      const mockHashtags = [
        `#${productName.replace(/\s+/g, '')}`,
        '#QualityProduct',
        '#MustHave',
        '#PremiumQuality',
        '#InnovativeDesign',
        '#CustomerFavorite',
        '#BestSeller',
        '#EssentialProduct'
      ]

      setGeneratedContent({
        description: mockDescription,
        hashtags: mockHashtags
      })
      setIsGenerating(false)
      toast.success("Content generated successfully!", {
        description: "Your product description and hashtags are ready."
      })
    }, 1500)
  }

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard", {
      description: "Content has been copied to your clipboard"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="container mx-auto p-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Prodnamic</h1>
          <p className="text-muted-foreground">Product content generator for small businesses</p>
        </div>
        <ModeToggle />
      </header>

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <Card className="shadow-xl border-primary/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-bold text-primary">Product Content Generator</CardTitle>
            <CardDescription className="text-lg">
              Generate professional product descriptions and SEO-optimized hashtags in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name" className="flex items-center gap-1">
                  Product Name <span className="text-xs text-muted-foreground">(max 100 words)</span>
                </Label>
                <Input
                  id="product-name"
                  placeholder="Enter your product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  maxLength={100}
                  className="border-primary/20 focus-visible:ring-primary/30 shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-description" className="flex items-center gap-1">
                  Short Description <span className="text-xs text-muted-foreground">(max 250 words)</span>
                </Label>
                <Textarea
                  id="product-description"
                  placeholder="Briefly describe your product's key features and benefits"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  maxLength={250}
                  className="min-h-[120px] border-primary/20 focus-visible:ring-primary/30 shadow-sm"
                />
              </div>
            </div>
            
            <Button 
              onClick={generateContent} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Generating magic...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
            
            {generatedContent.description && (
              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 shadow-md">
                  <TabsTrigger value="description" className="data-[state=active]:bg-primary/10">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Product Description
                  </TabsTrigger>
                  <TabsTrigger value="hashtags" className="data-[state=active]:bg-primary/10">
                    <Hash className="h-4 w-4 mr-2" />
                    SEO Hashtags
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <Card className="shadow-md border-primary/5">
                    <CardContent className="pt-6">
                      <div className="bg-card p-4 rounded-md border border-primary/10 min-h-[200px] relative shadow-inner">
                        <p className="text-card-foreground leading-relaxed">{generatedContent.description}</p>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute top-2 right-2 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => copyToClipboard(generatedContent.description)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="hashtags" className="mt-4">
                  <Card className="shadow-md border-primary/5">
                    <CardContent className="pt-6">
                      <div className="bg-card p-4 rounded-md border border-primary/10 min-h-[200px] relative shadow-inner">
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.hashtags.map((tag, index) => (
                            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute top-2 right-2 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => copyToClipboard(generatedContent.hashtags.join(" "))}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t px-6 py-4 relative z-10">
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for small businesses | © 2025 Prodnamic
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

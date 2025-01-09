import React, { useState } from 'react';
import { Wand2, Loader2, Image, Shield, Clock, Star, Users, Check, Globe, Database, Lock, Sparkles } from 'lucide-react';

const CompleteLanding = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, negative_prompt: negativePrompt })
      });

      if (!response.ok) throw new Error('Failed to generate image');
      const data = await response.json();
      if (data.image) setGeneratedImage(data.image);
    } catch (err) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Wand2,
      title: 'AI Generation',
      desc: 'State-of-the-art AI models'
    },
    {
      icon: Clock,
      title: 'Fast Results',
      desc: 'Get images in seconds'
    },
    {
      icon: Shield,
      title: 'Secure',
      desc: 'Enterprise-grade security'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      features: ['5 images/day', 'Basic resolution']
    },
    {
      name: 'Pro',
      price: '29',
      features: ['100 images/day', 'HD resolution', 'API access'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited images', '4K resolution', 'Custom features']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl">AI Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600">Features</a>
            <a href="#pricing" className="text-gray-600">Pricing</a>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Amazing Images with AI
          </h1>
          <p className="text-xl mb-8">
            Transform your ideas into stunning visuals instantly
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold">
            Try It Now
          </button>
        </div>
      </header>

      {/* Generator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Create Your Image</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Describe your image
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border-gray-300"
                    placeholder="Describe what you want to create..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Negative prompt (optional)
                  </label>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border-gray-300"
                    placeholder="What to avoid..."
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt}
                  className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium disabled:bg-gray-400"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Generating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Wand2 className="h-5 w-5" />
                      Generate
                    </div>
                  )}
                </button>
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Preview</h2>
              <div className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center">
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated artwork"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Your image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <feature.icon className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow ${
                  plan.popular ? 'ring-2 ring-purple-600' : ''
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">
                  ${plan.price}
                  {plan.price !== 'Custom' && <span className="text-lg">/mo</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 px-4 rounded-lg font-medium bg-purple-600 text-white">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 AI Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CompleteLanding;

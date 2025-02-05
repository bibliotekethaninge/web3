import React, { useState } from 'react';
import { 
  Book, 
  Code2, 
  Terminal, 
  Search, 
  ChevronRight, 
  Copy, 
  Check,
  Cpu,
  Wallet,
  BarChart3,
  Shield,
  Blocks,
  Wrench,
  Network,
  Lightbulb,
  Zap
} from 'lucide-react';

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language, id }: { code: string, language: string, id: string }) => (
    <div className="relative group">
      <div className="absolute right-4 top-4">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {copiedCode === id ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <code className="text-gray-100 text-sm font-mono">{code}</code>
      </pre>
    </div>
  );

  const sections = [
    {
      title: 'Getting Started',
      icon: Lightbulb,
      items: ['Quick Start', 'Installation', 'Basic Usage']
    },
    {
      title: 'Core Concepts',
      icon: Cpu,
      items: ['Architecture', 'Data Flow', 'Security Model']
    },
    {
      title: 'Wallet Integration',
      icon: Wallet,
      items: ['Connect Wallet', 'Transaction Handling', 'Account Management']
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      items: ['Dashboard Setup', 'Metrics', 'Custom Reports']
    },
    {
      title: 'Security',
      icon: Shield,
      items: ['Best Practices', 'Error Handling', 'Rate Limiting']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-10 h-10 text-indigo-400" />
              <Code2 className="w-10 h-10 text-purple-400" />
              <Terminal className="w-10 h-10 text-pink-400" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive guides and API references for Web3 Analytics integration.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 sticky top-20">
              {sections.map((section) => (
                <div key={section.title} className="mb-6">
                  <div className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                    <section.icon className="w-5 h-5" />
                    {section.title}
                  </div>
                  <ul className="space-y-1 border-l border-gray-200 ml-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 pl-4 py-1 -ml-px border-l border-transparent hover:border-gray-900 transition-colors"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Documentation Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Quick Start Section */}
            <section id="quick-start">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-900">Quick Start</h2>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                  Get started with Web3 Analytics in minutes. Follow these simple steps to integrate our SDK into your application.
                </p>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Install the SDK</h3>
                    <CodeBlock
                      id="install"
                      language="bash"
                      code="npm install @web3analytics/sdk"
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Initialize the Client</h3>
                    <CodeBlock
                      id="init"
                      language="typescript"
                      code={`import { Web3Analytics } from '@web3analytics/sdk';

const analytics = new Web3Analytics({
  apiKey: 'your-api-key',
  network: 'ethereum'
});`}
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Track Transactions</h3>
                    <CodeBlock
                      id="track"
                      language="typescript"
                      code={`// Monitor transaction status
analytics.trackTransaction({
  hash: '0x123...', 
  type: 'transfer',
  metadata: {
    amount: '1.5',
    token: 'ETH'
  }
});`}
                    />
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <Blocks className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Monitoring</h4>
                    <p className="text-gray-600">Track transactions and smart contract interactions in real-time with detailed analytics.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                    <Network className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Multi-chain Support</h4>
                    <p className="text-gray-600">Support for all major EVM-compatible networks including testnets.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
                    <Shield className="w-8 h-8 text-pink-600 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h4>
                    <p className="text-gray-600">Bank-grade security with encrypted data transmission and storage.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl">
                    <Wrench className="w-8 h-8 text-rose-600 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Customizable</h4>
                    <p className="text-gray-600">Flexible API allowing deep customization of tracking and analytics.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation Section */}
            <section id="installation" className="pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Installation</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600">
                  Choose your preferred package manager to install the Web3 Analytics SDK:
                </p>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">NPM</h3>
                  <CodeBlock
                    id="npm-install"
                    language="bash"
                    code="npm install @web3analytics/sdk @web3analytics/react"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">Yarn</h3>
                  <CodeBlock
                    id="yarn-install"
                    language="bash"
                    code="yarn add @web3analytics/sdk @web3analytics/react"
                  />
                </div>
              </div>
            </section>

            {/* Basic Usage Section */}
            <section id="basic-usage" className="pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Basic Usage</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600">
                  Learn how to implement basic analytics tracking in your application:
                </p>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">React Integration</h3>
                  <CodeBlock
                    id="react-usage"
                    language="typescript"
                    code={`import { Web3AnalyticsProvider, useWeb3Analytics } from '@web3analytics/react';

function App() {
  return (
    <Web3AnalyticsProvider apiKey="your-api-key">
      <YourApp />
    </Web3AnalyticsProvider>
  );
}

function TransactionButton() {
  const analytics = useWeb3Analytics();
  
  const handleTransaction = async () => {
    const tx = await sendTransaction();
    analytics.trackTransaction({
      hash: tx.hash,
      type: 'swap',
      metadata: {
        tokenIn: 'ETH',
        tokenOut: 'USDC',
        amount: '1.0'
      }
    });
  };

  return <button onClick={handleTransaction}>Swap Tokens</button>;
}`}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
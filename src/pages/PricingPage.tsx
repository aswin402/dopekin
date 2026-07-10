import { useAppStore } from '../store/useAppStore';
import { Tag, Check, X } from 'lucide-react';

export function PricingPage() {
  const isPro = useAppStore((state) => state.isPro);
  const isElite = useAppStore((state) => state.isElite);
  const setPro = useAppStore((state) => state.setPro);
  const setElite = useAppStore((state) => state.setElite);
  const userTokens = useAppStore((state) => state.userTokens);
  const addTokens = useAppStore((state) => state.addTokens);

  const plans = [
    {
      name: 'Free Starter',
      price: '$0.00',
      period: 'lifetime',
      desc: 'Test the waters and chat with default free seeds.',
      features: [
        { name: '50 messages per day', status: true },
        { name: 'Access to free default twins', status: true },
        { name: 'Create up to 1 custom twin', status: true },
        { name: 'FaceTime video calling', status: false },
        { name: 'HD voice synthesis quality', status: false },
        { name: 'Twin livestream monetization', status: false },
      ],
      buttonText: 'Current Plan',
      isPopular: false,
      isDisabled: true,
      action: () => {}
    },
    {
      name: 'Pro Member',
      price: '$9.99',
      period: 'month',
      desc: 'Unlock voice synthesis FaceTime calling and more twins.',
      features: [
        { name: 'Unlimited text messages', status: true },
        { name: 'Access to all default twins', status: true },
        { name: 'Create up to 5 custom twins', status: true },
        { name: '30 mins FaceTime call / day', status: true },
        { name: 'HD voice synthesis quality', status: true },
        { name: 'Twin livestream monetization', status: false },
      ],
      buttonText: isPro ? 'Active Membership' : 'Upgrade to Pro',
      isPopular: true,
      isDisabled: isPro || isElite,
      action: () => {
        setPro(true);
        alert("Mock payment successful! You are now a PRO member.");
      }
    },
    {
      name: 'Elite Executive',
      price: '$24.99',
      period: 'month',
      desc: 'Uncompromised digital twin pipeline deployment.',
      features: [
        { name: 'Unlimited text messages', status: true },
        { name: 'Access to all default twins', status: true },
        { name: 'Create unlimited twins', status: true },
        { name: 'Unlimited FaceTime calling', status: true },
        { name: 'Ultra-realistic voice synthesis', status: true },
        { name: 'Twin livestream monetization', status: true },
      ],
      buttonText: isElite ? 'Active Membership' : 'Go Elite',
      isPopular: false,
      isDisabled: isElite,
      action: () => {
        setElite(true);
        setPro(true); // elite covers pro
        alert("Mock payment successful! You are now an ELITE member.");
      }
    }
  ];

  const tokenPacks = [
    { name: 'Starter Pack', tokens: 100, price: '$2.99', popular: false },
    { name: 'Popular Pack', tokens: 500, price: '$9.99', popular: true },
    { name: 'Whale Pack', tokens: 1500, price: '$24.99', popular: false },
  ];

  const handleBuyTokens = (packName: string, amount: number) => {
    addTokens(amount);
    alert(`Mock checkout successful for ${packName}! Added ${amount} tokens to your wallet.`);
  };

  return (
    <div className="flex flex-col gap-12 animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight flex items-center justify-center gap-2">
          <Tag className="w-8 h-8 text-[var(--y)]" />
          <span>Membership Tiers</span>
        </h1>
        <p className="text-sm text-[#f5f5f5]/60">Select a subscription plan or top up your token balance to call premium clones.</p>
      </div>

      {/* Plans Section */}
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div 
            key={idx}
            className={`p-6 bg-black border rounded-2xl flex flex-col justify-between relative group ${
              plan.isPopular 
                ? 'border-[var(--y)] shadow-[var(--glow-y)] scale-[1.03] z-10' 
                : 'border-[var(--border)] hover:border-[var(--border2)]'
            }`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--y)] text-[var(--blk)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--blk)]">
                Most Popular
              </span>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-heading font-black uppercase text-[#f5f5f5]">{plan.name}</h3>
                <p className="text-xs text-[#f5f5f5]/60 mt-1 leading-snug">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-heading font-black text-[#f5f5f5]">{plan.price}</span>
                <span className="text-xs text-[#f5f5f5]/40 font-mono font-semibold">/ {plan.period.toUpperCase()}</span>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#f5f5f5]/80">
                    {feature.status ? (
                      <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-[var(--error)] shrink-0" />
                    )}
                    <span className={feature.status ? '' : 'text-[#f5f5f5]/45 line-through'}>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={plan.isDisabled}
              onClick={plan.action}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest border transition-all mt-8 cursor-pointer ${
                plan.isDisabled
                  ? 'bg-transparent border-white/5 text-white/30 cursor-not-allowed'
                  : plan.isPopular
                    ? 'bg-[var(--y)] text-[var(--blk)] border-[var(--blk)] shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[0]'
                    : 'bg-black border-white/10 hover:border-white/20 text-white hover:bg-white/5'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Tokens Store Section */}
      <div className="flex flex-col gap-6 mt-4">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-[#f5f5f5]">
            Token Wallet
          </h2>
          <p className="text-sm text-[#f5f5f5]/60 mt-1">
            Current balance: <strong className="text-[var(--y)] font-mono">{userTokens} Tokens</strong>
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto w-full">
          {tokenPacks.map((pack, idx) => (
            <div 
              key={idx}
              className={`p-5 bg-black border rounded-xl flex flex-col justify-between gap-4 text-center relative ${
                pack.popular ? 'border-[var(--y)]' : 'border-[var(--border)]'
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[var(--y)] text-[var(--blk)] text-[8px] font-black uppercase rounded-full">
                  Best Value
                </span>
              )}
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/35 font-mono uppercase tracking-wider">{pack.name}</span>
                <h4 className="text-2xl font-heading font-black text-[var(--y)] mt-1">{pack.tokens} Tokens</h4>
              </div>

              <button
                onClick={() => handleBuyTokens(pack.name, pack.tokens)}
                className="py-2.5 px-4 bg-transparent border border-white/10 hover:bg-white/5 text-xs font-bold uppercase rounded-lg cursor-pointer transition-colors"
              >
                Buy for {pack.price}
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
export default PricingPage;

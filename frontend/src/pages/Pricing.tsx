import React from 'react';
import Button from '../components/ui/Buttons/Button';
import { Card, CardContent } from '../components/ui/Card';
import {
  Check,
  Star,
  Zap,
  Shield,
  CreditCard,
  BarChart3,
  Users,
  Crown,
} from 'lucide-react';

export const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with personal finance tracking',
      icon: <CreditCard className='w-8 h-8' />,
      features: [
        'Up to 2 bank accounts',
        'Basic transaction tracking',
        'Monthly spending overview',
        'Email support',
        'Mobile app access',
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'secondary',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      description: 'Advanced features for serious money management',
      icon: <Star className='w-8 h-8' />,
      features: [
        'Unlimited bank accounts',
        'Advanced budgeting tools',
        'Investment tracking',
        'Bill reminders & alerts',
        'Priority support',
        'Data export (CSV, PDF)',
        'Advanced analytics & reports',
        'Multi-currency support',
      ],
      buttonText: 'Upgrade to Premium',
      buttonVariant: 'primary',
      popular: true,
    },
    {
      name: 'Business',
      price: '$29.99',
      period: 'per month',
      description: 'Complete financial management for businesses',
      icon: <Users className='w-8 h-8' />,
      features: [
        'Everything in Premium',
        'Multi-user access (up to 10 users)',
        'Business expense tracking',
        'Tax preparation tools',
        'Advanced reporting suite',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
      ],
      buttonText: 'Start Business Plan',
      buttonVariant: 'primary',
      popular: false,
    },
  ];

  const additionalFeatures = [
    {
      icon: <Shield className='w-6 h-6' />,
      title: 'Bank-Level Security',
      description:
        'Your financial data is protected with 256-bit encryption and SOC 2 compliance.',
    },
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Real-Time Sync',
      description:
        'Automatically sync your accounts and transactions in real-time.',
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: 'Smart Analytics',
      description:
        'Get personalized insights and recommendations based on your spending patterns.',
    },
  ];

  return (
    <div className='min-h-screen bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))] py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-[color:rgb(var(--color-theme-text-primary))]'>
            Choose Your Plan
          </h1>
          <p className='text-xl text-[color:rgb(var(--color-theme-text-secondary))] max-w-3xl mx-auto mb-8'>
            Start managing your finances smarter with our flexible pricing
            plans. Upgrade or downgrade at any time.
          </p>
          <div className='flex items-center justify-center gap-4 text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
            <div className='flex items-center gap-2'>
              <Check className='w-4 h-4 text-green-500' />
              <span>No setup fees</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='w-4 h-4 text-green-500' />
              <span>Cancel anytime</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='w-4 h-4 text-green-500' />
              <span>30-day money back</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${
                tier.popular
                  ? 'ring-2 ring-[rgb(var(--color-theme-accent))] scale-105'
                  : ''
              }`}
            >
              {tier.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <div className='bg-[rgb(var(--color-theme-accent))] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1'>
                    <Crown className='w-4 h-4' />
                    Most Popular
                  </div>
                </div>
              )}
              <CardContent className='text-center p-8'>
                <div className='mb-6'>
                  <div className='flex justify-center mb-4 text-[rgb(var(--color-theme-accent))]'>
                    {tier.icon}
                  </div>
                  <h3 className='text-2xl font-bold mb-2'>{tier.name}</h3>
                  <div className='mb-4'>
                    <span className='text-4xl font-bold'>{tier.price}</span>
                    <span className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                      /{tier.period}
                    </span>
                  </div>
                  <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                    {tier.description}
                  </p>
                </div>

                <ul className='space-y-3 mb-8 text-left'>
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className='flex items-start gap-3'
                    >
                      <Check className='w-5 h-5 text-green-500 mt-0.5 flex-shrink-0' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.buttonVariant}
                  size='lg'
                  className='w-full'
                  onClick={() => {
                    // Handle plan selection
                    console.log(`Selected ${tier.name} plan`);
                  }}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-12'>Why Choose Revolve?</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className='text-center'
              >
                <div className='flex justify-center mb-4 text-[rgb(var(--color-theme-accent))]'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-6'>
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold mb-3'>
                  Can I change my plan at any time?
                </h3>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                  Yes! You can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold mb-3'>
                  Is my financial data secure?
                </h3>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                  Absolutely. We use bank-level encryption and never store your
                  banking credentials. Your data is protected with 256-bit SSL
                  encryption.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold mb-3'>
                  Do you offer a free trial?
                </h3>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                  Yes! All paid plans come with a 30-day free trial. You can
                  cancel anytime during the trial period without being charged.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mt-16'>
          <h2 className='text-3xl font-bold mb-6'>
            Ready to Take Control of Your Finances?
          </h2>
          <p className='text-xl text-[color:rgb(var(--color-theme-text-secondary))] mb-8'>
            Join thousands of users who are already managing their money smarter
            with Revolve.
          </p>
          <Button
            variant='primary'
            className='mx-auto w-auto'
            size='xl'
            onClick={() => {
              // Handle sign up
              console.log('Start free trial');
            }}
          >
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

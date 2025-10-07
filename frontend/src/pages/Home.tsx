import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Buttons/Button';
import {
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  CreditCard,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Globe,
  Lock,
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <TrendingUp className='w-8 h-8' />,
      title: 'Smart Analytics',
      description:
        'Get insights into your spending patterns with AI-powered analytics and personalized recommendations.',
    },
    {
      icon: <Shield className='w-8 h-8' />,
      title: 'Bank-Level Security',
      description:
        'Your financial data is protected with enterprise-grade encryption and security protocols.',
    },
    {
      icon: <Smartphone className='w-8 h-8' />,
      title: 'Mobile First',
      description:
        'Manage your finances on-the-go with our intuitive mobile app available on all platforms.',
    },
    {
      icon: <BarChart3 className='w-8 h-8' />,
      title: 'Budget Tracking',
      description:
        'Set and track budgets effortlessly with real-time notifications and spending alerts.',
    },
    {
      icon: <CreditCard className='w-8 h-8' />,
      title: 'Multi-Account',
      description:
        'Connect all your bank accounts, credit cards, and investment portfolios in one place.',
    },
    {
      icon: <Zap className='w-8 h-8' />,
      title: 'Instant Sync',
      description:
        'Real-time synchronization with your financial institutions for up-to-date information.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '$2.5B+', label: 'Transactions Processed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9/5', label: 'User Rating' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Financial Advisor',
      content:
        "Revolve Bank has transformed how I manage my clients' portfolios. The analytics are incredibly detailed and the interface is intuitive.",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      content:
        'Finally, a banking app that actually understands my business needs. The budgeting features have saved me hours every week.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelancer',
      content:
        'As someone with multiple income streams, Revolve Bank helps me track everything seamlessly. The mobile app is fantastic!',
      rating: 5,
    },
  ];

  return (
    <div className='min-h-screen bg-[rgb(var(--color-theme-background))]'>
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-theme-primary)/0.1)] via-transparent to-[rgb(var(--color-theme-accent)/0.1)]'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
          <div className='text-center'>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-[rgb(var(--color-theme-primary)/0.1)] text-[rgb(var(--color-theme-primary))] text-sm font-medium mb-8'>
              <Zap className='w-4 h-4 mr-2' />
              New: Personalised Budgeting
            </div>

            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-[color:rgb(var(--color-theme-text-primary))] mb-6 leading-tight'>
              Revolutionize Your
              <span className='block bg-gradient-to-r from-[rgb(var(--color-theme-primary))] to-[rgb(var(--color-theme-accent))] bg-clip-text text-transparent'>
                Finances
              </span>
            </h1>

            <p className='text-xl sm:text-2xl text-[color:rgb(var(--color-theme-text-secondary))] mb-8 max-w-3xl mx-auto leading-relaxed'>
              Take complete control of your finances with our intelligent
              banking platform. Connect, analyze, and optimize your financial
              life like never before.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
              <Button
                variant='primary'
                size='xl'
                className='px-8 py-4 text-lg font-semibold shadow-lg transform transition-all duration-200'
                onClick={() => navigate('/main')}
              >
                Get Started Free
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
              <Button
                variant='secondary'
                size='xl'
                className='px-8 py-4 text-lg font-semibold'
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='text-2xl sm:text-3xl font-bold text-[rgb(var(--color-theme-primary))] mb-1'>
                    {stat.number}
                  </div>
                  <div className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-[rgb(var(--color-theme-surface))]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-[color:rgb(var(--color-theme-text-primary))] mb-4'>
              Everything You Need to Succeed
            </h2>
            <p className='text-xl text-[color:rgb(var(--color-theme-text-secondary))] max-w-2xl mx-auto'>
              Powerful features designed to give you complete control over your
              financial journey
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='group p-8 rounded-2xl bg-[rgb(var(--color-theme-background))] border border-[rgb(var(--color-theme-border))] hover:border-[rgb(var(--color-theme-primary))] transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--color-theme-primary)/0.1)]'
              >
                <div className='text-[rgb(var(--color-theme-primary))] mb-4 transition-transform duration-300'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold text-[color:rgb(var(--color-theme-text-primary))] mb-3 group-hover:text-[rgb(var(--color-theme-primary))] transition-all duration-300'>
                  {feature.title}
                </h3>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))] leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-[color:rgb(var(--color-theme-text-primary))] mb-4'>
              Trusted by Thousands
            </h2>
            <p className='text-xl text-[color:rgb(var(--color-theme-text-secondary))]'>
              See what our users are saying about their experience
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='p-8 rounded-2xl bg-[rgb(var(--color-theme-surface))] border border-[rgb(var(--color-theme-border))] hover:shadow-lg transition-all duration-300'
              >
                <div className='flex mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 text-yellow-400 fill-current'
                    />
                  ))}
                </div>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))] mb-6 leading-relaxed'>
                  "{testimonial.content}"
                </p>
                <div>
                  <div className='font-semibold text-[color:rgb(var(--color-theme-text-primary))]'>
                    {testimonial.name}
                  </div>
                  <div className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className='py-20 bg-[rgb(var(--color-theme-surface))]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-[rgb(var(--color-theme-success)/0.1)] text-[rgb(var(--color-theme-success))] text-sm font-medium mb-6'>
                <Shield className='w-4 h-4 mr-2' />
                Bank-Level Security
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold text-[color:rgb(var(--color-theme-text-primary))] mb-6'>
                Your Data is Protected
              </h2>
              <p className='text-xl text-[color:rgb(var(--color-theme-text-secondary))] mb-8'>
                We use the same security standards as major banks to keep your
                financial information safe and secure.
              </p>

              <div className='space-y-4'>
                {[
                  '256-bit SSL encryption',
                  'Multi-factor authentication',
                  'Regular security audits',
                  'SOC 2 Type II compliant',
                ].map((item, index) => (
                  <div key={index} className='flex items-center'>
                    <CheckCircle className='w-5 h-5 text-[rgb(var(--color-theme-success))] mr-3' />
                    <span className='text-[color:rgb(var(--color-theme-text-primary))]'>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-theme-primary)/0.2)] to-[rgb(var(--color-theme-accent)/0.2)] rounded-3xl blur-3xl'></div>
              <div className='relative bg-[rgb(var(--color-theme-background))] p-8 rounded-3xl border border-[rgb(var(--color-theme-border))] shadow-2xl'>
                <div className='flex items-center justify-center mb-6'>
                  <div className='w-16 h-16 bg-[rgb(var(--color-theme-primary))] rounded-full flex items-center justify-center'>
                    <Lock className='w-8 h-8 text-white' />
                  </div>
                </div>
                <h3 className='text-2xl font-bold text-[color:rgb(var(--color-theme-text-primary))] text-center mb-4'>
                  Enterprise Security
                </h3>
                <p className='text-[color:rgb(var(--color-theme-text-secondary))] text-center'>
                  Your financial data is encrypted and stored securely using
                  industry-leading security protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[color:rgb(var(--color-theme-text-primary))] mb-6'>
            Ready to Transform Your Finances?
          </h2>
          <p className='text-xl text-[color:rgb(var(--color-theme-text-secondary))] mb-8'>
            Join thousands of users who have already revolutionized their
            financial management with Revolve Bank.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button
              variant='primary'
              size='xl'
              className='px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
              onClick={() => navigate('/main')}
            >
              Start Your Free Trial
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
            <Button
              variant='secondary'
              size='xl'
              className='px-8 py-4 text-lg font-semibold'
              onClick={() => navigate('/pricing')}
            >
              View Pricing Plans
            </Button>
          </div>

          <div className='mt-8 flex items-center justify-center space-x-6 text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
            <div className='flex items-center'>
              <CheckCircle className='w-4 h-4 text-[rgb(var(--color-theme-success))] mr-2' />
              No credit card required
            </div>
            <div className='flex items-center'>
              <CheckCircle className='w-4 h-4 text-[rgb(var(--color-theme-success))] mr-2' />
              14-day free trial
            </div>
            <div className='flex items-center'>
              <CheckCircle className='w-4 h-4 text-[rgb(var(--color-theme-success))] mr-2' />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

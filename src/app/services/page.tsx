import ServicesHero from '@/components/sections/ServicesHero'
import ServicesList from '@/components/sections/ServicesList'
import Integration from '@/components/sections/Integration'
import WhyChoose from '@/components/sections/WhyChoose'

export default function Services() {
  return (
    <div className="pt-16">
      <ServicesHero />
      <ServicesList />
      <Integration />
      <WhyChoose />
    </div>
  )
}

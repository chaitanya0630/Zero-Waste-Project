import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, BarChart2, Globe, Utensils } from 'lucide-react';

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us - ZeroWaste";
  }, []);

  return (
    <Layout>
      <section className="relative py-20 bg-zerowaste-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-20" 
            src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80" 
            alt="Food background" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
              Reducing food waste and hunger through innovative technology and community connections.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-6 fade-in">
            <p>
              At ZeroWaste, we're dedicated to creating a world where no food goes to waste while people go hungry. 
              Our platform connects those with surplus food to those who need it most, using cutting-edge technology 
              to make the process efficient, safe, and accessible to all.
            </p>
            <p>
              Founded in 2023, ZeroWaste emerged from a simple observation: restaurants, grocery stores, and households 
              discard tons of perfectly good food while food insecurity affects millions worldwide. We set out to 
              bridge this gap with a smart, user-friendly solution.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center fade-in">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover fade-in">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="rounded-full bg-red-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-gray-600">
                  We believe in caring for our communities and ensuring everyone has access to nutritious food.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover fade-in">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="rounded-full bg-green-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-7 w-7 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Every action we take aims to reduce environmental impact and promote a healthier planet.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover fade-in">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <BarChart2 className="h-7 w-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We leverage technology to create efficient, scalable solutions to complex social problems.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover fade-in">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="rounded-full bg-yellow-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-7 w-7 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  We strive to make our platform accessible to all, regardless of technical expertise or resources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-zerowaste-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center fade-in">Our Team</h2>
          
          <div className="max-w-3xl mx-auto text-lg text-gray-700 text-center mb-12 fade-in">
            <p>
              ZeroWaste brings together experts in technology, logistics, food safety, and community development. 
              Our diverse team is united by a passion for sustainability and a belief that innovative solutions 
              can address both food waste and hunger simultaneously.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Chaitanya Gowri" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Chaitanya Gowri</h3>
              <p className="text-zerowaste-primary font-medium">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg" 
                  alt="Tharun" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Tharun</h3>
              <p className="text-zerowaste-primary font-medium">CTO</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Madhurima" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Madhurima</h3>
              <p className="text-zerowaste-primary font-medium">Community Director</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Thanu Sree" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Thanu Sree</h3>
              <p className="text-zerowaste-primary font-medium">Operations Director</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 fade-in">Join Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700 mb-8 fade-in">
            Whether you're a restaurant owner with surplus food, a community organization serving those in need,
            or an individual passionate about reducing waste, we invite you to join the ZeroWaste movement.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
